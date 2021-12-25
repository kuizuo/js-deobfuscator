const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generator = require('@babel/generator').default;
const fs = require('fs');

class AstDec {
	constructor(option) {
		if (!option.jscode) throw new Error('请载入js代码');

		let { jscode, encryptFunc } = option;
		this.jscode = jscode;
		this.ast = AstDec.parse(jscode);
		this.bigArr = [];
		this.shuffleNum = option.shuffleNum || 10;
		this.encryptFunc = encryptFunc;
		this.identifierArr = option.identifierArr;
	}

	get code() {
		let code = generator(this.ast).code;
		return code;
	}

	static parse(jscode) {
		return parser.parse(jscode);
	}

	getCode(option) {
		return generator(this.ast, option).code;
	}

	/**
	 * 执行数组乱序 与解密函数代码 将混淆字符串数值还原
	 */
	decStringArr() {
		// 拿到解密函数所在节点
		let stringDecryptFuncAst = this.ast.program.body[2];
		// 拿到解密函数的名字  也就是_0x3028
		let DecryptFuncName = stringDecryptFuncAst.declarations[0].id.name;

		let newAst = parser.parse('');
		newAst.program.body.push(this.ast.program.body[0]);
		newAst.program.body.push(this.ast.program.body[1]);
		newAst.program.body.push(stringDecryptFuncAst);
		// 把这三部分的代码转为字符串，由于存在格式化检测，需要指定选项，来压缩代码
		let stringDecryptFunc = generator(newAst, { compact: true }).code;
		// 将字符串形式的代码执行，这样就可以在 nodejs 中运行解密函数了
		global.eval(stringDecryptFunc);

		traverse(this.ast, {
			VariableDeclarator(path) {
				// 当变量名与解密函数名相同
				if (path.node.id.name == DecryptFuncName) {
					let binding = path.scope.getBinding(DecryptFuncName);
					// 通过referencePaths可以获取所有引用的地方
					binding &&
						binding.referencePaths.map((p) => {
							// 判断父节点是调用表达式，且参数为两个
							if (p.parentPath.isCallExpression() && p.parentPath.node.arguments.length === 2) {
								// 输出参数与解密后的结果
								// let args = p.parentPath.node.arguments.map(a => a.value).join(' ')
								let str = eval(p.parentPath.toString());
								// console.log(args, str)
								p.parentPath.replaceWith(t.stringLiteral(str));
							}
						});
				}
			},
		});

		// 将源代码中的解密代码给移除
		// this.ast.program.body.shift();
		// this.ast.program.body.shift();
		// this.ast.program.body.shift();
	}

	/**
	 * 处理函数花指令1
	 */
	removeObjectAccess() {
		traverse(this.ast, {
			VariableDeclarator(path) {
				var node = path.node;
				if (!t.isObjectExpression(node.init)) return;
				var objPropertiesList = node.init.properties;
				if (objPropertiesList.length == 0) return;
				var objName = node.id.name;
				// 对定义的各个 方法 或 字符串 依次在作用域内查找是否有调用
				objPropertiesList.forEach((prop) => {
					var key = prop.key.value;
					if (!t.isStringLiteral(prop.value)) {
						// 对方法属性的遍历
						if (!prop.value.body) {
							return;
						}
						var retStmt = prop.value.body.body[0];

						// 该path的最近父节点
						var fnPath = path.getFunctionParent();

						fnPath.traverse({
							CallExpression: function (_path) {
								if (!t.isMemberExpression(_path.node.callee)) return;
								// 判断是否符合条件
								var _node = _path.node.callee;
								if (!t.isIdentifier(_node.object) || _node.object.name !== objName) return;
								if (!t.isStringLiteral(_node.property) || _node.property.value != key) return;
								var args = _path.node.arguments;
								// 二元运算

								if (t.isBinaryExpression(retStmt.argument) && args.length === 2) {
									_path.replaceWith(t.binaryExpression(retStmt.argument.operator, args[0], args[1]));
								} else if (t.isLogicalExpression(retStmt.argument) && args.length == 2) {
									// 逻辑运算
									_path.replaceWith(t.logicalExpression(retStmt.argument.operator, args[0], args[1]));
								} else if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee)) {
									// 函数调用
									_path.replaceWith(t.callExpression(args[0], args.slice(1)));
								}
							},
						});
					} else {
						// 对字符串属性的遍历
						var retStmt = prop.value.value; // 该path的最近父节点
						var fnPath = path.getFunctionParent();
						fnPath.traverse({
							MemberExpression: function (_path) {
								var _node = _path.node;
								if (!t.isIdentifier(_node.object) || _node.object.name !== objName) return;
								if (!t.isStringLiteral(_node.property) || _node.property.value != key) return;
								_path.replaceWith(t.stringLiteral(retStmt));
							},
						});
					}
				});
				path.remove(); // 遍历过的对象无用了，直接删除。
			},
		});
	}

	/**
	 * 处理switch混淆 一般循环处理10次就行了
	 */
	traverseSwitch() {
		for (let i = 0; i < 10; i++) {
			traverse(this.ast, {
				MemberExpression(path) {
					if (t.isStringLiteral(path.node.object) && t.isStringLiteral(path.node.property, { value: 'split' })) {
						//找到类型为 VariableDeclaration 的父节点
						let varPath = path.findParent(function (p) {
							return t.isVariableDeclaration(p);
						});
						//获取下一个同级节点
						let whilePath = varPath.getSibling(varPath.key + 1);
						//解析整个 switch
						let myArr = [];
						whilePath.node.body.body[0].cases.map(function (p) {
							myArr[p.test.value] = p.consequent[0];
						});

						varPath.remove();
						whilePath.remove();

						let parentPath = whilePath.parent;
						// path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'
						let shufferArr = path.node.object.value.split('|');
						shufferArr.map(function (v) {
							parentPath.body.push(myArr[v]);
						});
						path.stop();
					}
				},
			});
		}
	}

	/**
	 * 将形参改为实参
	 */
	convParam() {
		traverse(this.ast, {
			ExpressionStatement(path) {
				var node = path.node;
				if (!t.isCallExpression(node.expression)) return;
				if (node.expression.arguments == undefined || node.expression.callee.params == undefined || node.expression.arguments.length > node.expression.callee.params.length) return;

				// 获取形参和实参
				var argumentList = node.expression.arguments;
				var paramList = node.expression.callee.params;
				// 实参可能会比形参少，所以我们对实参进行遍历， 查看当前作用域内是否有该实参的引用
				for (var i = 0; i < argumentList.length; i++) {
					var argumentName = argumentList[i].name;
					var paramName = paramList[i].name;
					path.traverse({
						MemberExpression(_path) {
							var _node = _path.node;
							if (!t.isIdentifier(_node.object) || _node.object.name !== paramName) return;
							// 有对实参的引用则 将形参的名字改为实参的名字
							_node.object.name = argumentName;
						},
					});
				}
				// 删除实参和形参的列表。
				node.expression.arguments = [];
				node.expression.callee.params = [];
			},
		});
	}

	/**
	 * 将字符串和数值常量直接替换对应的变量引用地方
	 */
	traverseStrNumValue() {
		traverse(this.ast, {
			'AssignmentExpression|VariableDeclarator'(path) {
				let name, initValue
				if (path.isAssignmentExpression()) {
					name = path.node.left.name;
					initValue = path.node.right;
				} else {
					name = path.node.id.name;
					initValue = path.node.init;
				}

				if (t.isStringLiteral(initValue) || t.isNumericLiteral(initValue)) {
					let binding = path.scope.getBinding(name);
					if (binding && binding.constant && binding.constantViolations.length == 0) {
						for (let i = 0; i < binding.referencePaths.length; i++) {
							binding.referencePaths[i].replaceWith(initValue);
						}
						path.remove()
					}
				}
			},
		});
	}

	/**
	 * 将对象['属性'] 改为对象.属性
	 */
	changeObjectAccessMode() {
		traverse(this.ast, {
			MemberExpression(path) {
				if (t.isStringLiteral(path.node.property)) {
					let name = path.node.property.value;
					path.node.property = t.identifier(name);
					path.node.computed = false;
				}
			},
		});
	}

	/**
	 * 计算二项式字面量
	 */

	traverseLiteral() {
		traverse(this.ast, {
			BinaryExpression(path) {
				let { left, right } = path.node;
				// 判断左右两边是否为字面量
				if (t.isLiteral(left) && t.isLiteral(right)) {
					let { confident, value } = path.evaluate(); // 计算二项式的值
					confident && path.replaceWith(t.valueToNode(value));
					path.skip();
				}
			},
		});
	}

	/**
	 *  将!![] 转化为true  ![] 转为false
	 */
	traverseUnaryExpression() {
		traverse(this.ast, {
			UnaryExpression(path) {
				if (path.node.operator !== '!') return; // 避免判断成 void

				// 判断第二个符号是不是!
				if (t.isUnaryExpression(path.node.argument)) {
					if (t.isArrayExpression(path.node.argument.argument)) {
						// !![]
						if (path.node.argument.argument.elements.length == 0) {
							path.replaceWith(t.booleanLiteral(true));
							path.skip();
						}
					}
				} else if (t.isArrayExpression(path.node.argument)) {
					// ![]
					if (path.node.argument.elements.length == 0) {
						path.replaceWith(t.booleanLiteral(false));
						path.skip();
					}
				} else if (t.isNumericLiteral(path.node.argument)) {
					// !0 or !1
					if (path.node.argument.value === 0) {
						path.replaceWith(t.booleanLiteral(true));
					} else if (path.node.argument.value === 1) {
						path.replaceWith(t.booleanLiteral(false));
					}
				} else {
				}
			},
		});
	}

	/**
	 * 处理eval加密
	 */
	dealEvalEnc() {
		this.ast = AstDec.parse(this.code);

		traverse(this.ast, {
			CallExpression(path) {
				if (path.node.callee.name !== 'eval') return;

				let args = path.node.arguments;
				let code = generator(args[0]).code;

				if (t.isStringLiteral(args)) {
					path.replaceWith(t.identifier(code));
				} else {
					path.replaceWith(t.identifier(eval(code)));
				}
			},
		});
	}

	/**
	 * 剔除始终不会执行的代码块
	 */
	removeUnusedBlockStatement() {
		traverse(this.ast, {
			IfStatement(path) {
				if (t.isBooleanLiteral(path.node.test)) {
					let testValue = path.node.test.value
					if (testValue === true) {
						path.replaceInline(path.node.consequent)
					} else if (testValue === false) {
						path.replaceInline(path.node.alternate)
					}
				}
			},
		});
	}

	/**
	 * 	删除未调用变量
	 */
	removeUnusedValue() {
		traverse(this.ast, {
			VariableDeclarator(path) {
				const { id, init } = path.node;
				if (!(t.isLiteral(init) || t.isObjectExpression(init))) return; //只处理字面量
				const binding = path.scope.getBinding(id.name);
				if (!binding || binding.constantViolations.length > 0) return

				if (binding.referencePaths.length > 0) return
				path.remove();
			},
			FunctionDeclaration(path) {
				const binding = path.scope.getBinding(path.node.id.name);
				if (!binding || binding.constantViolations.length > 0) return

				if (binding.referencePaths.length > 0) return
				path.remove();
			}
		});
	}

	/**
	 * 将所有十六进制编码与Unicode编码转为正常字符
	 */
	hexUnicodeToString() {
		traverse(this.ast, {
			StringLiteral(path) {
				var curNode = path.node;
				delete curNode.extra;
			},
			NumericLiteral(path) {
				var curNode = path.node;
				delete curNode.extra;
			},
		});
	}

	/**
	 * 给关键函数 标识符 设置注释  TOLOOK
	 */
	addComments() {
		traverse(this.ast, {
			DebuggerStatement(path) {
				path.addComment('leading', ' TOLOOK', true);
			},
			CallExpression(path) {
				if (!['setTimeout', 'setInterval'].includes(path.node.callee.name)) return;
				path.addComment('leading', ' TOLOOK', true);
			},
			StringLiteral(path) {
				if (['debugger'].includes(path.node.value)) {
					path.addComment('leading', ' TOLOOK', true);
				}
			},
		});
	}

	renameIdentifier() {
		let code = this.code
		let newAst = parser.parse(code);
		traverse(newAst, {
			'Program|FunctionExpression|FunctionDeclaration'(path) {
				path.traverse({
					Identifier(p) {
						path.scope.rename(p.node.name, path.scope.generateUidIdentifier('_0xabc').name);
					}
				})
			}
		});
		this.ast = newAst;
	}
}

(function () {
	let jscode = fs.readFileSync(__dirname + '/demo.js', {
		encoding: 'utf-8',
	});

	let astDec = new AstDec({ jscode: jscode });

	astDec.decStringArr();
	// astDec.removeObjectAccess()
	// astDec.traverseSwitch()
	// astDec.convParam()
	// astDec.dealEvalEnc();
	astDec.traverseUnaryExpression();
	astDec.traverseLiteral();
	astDec.traverseStrNumValue();
	astDec.removeUnusedValue();
	astDec.removeUnusedBlockStatement();
	astDec.changeObjectAccessMode();
	astDec.hexUnicodeToString();
	astDec.addComments();
	// astDec.renameIdentifier()

	let code = astDec.getCode({ minified: false, jsescOption: { minimal: true }, compact: false, comments: true });
	fs.writeFile(__dirname + '/newCode.js', code, (err) => { });
})();
