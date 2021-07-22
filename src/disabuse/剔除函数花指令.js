const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync(__dirname + "/demo.js", {
	encoding: "utf-8"
});

let ast = parser.parse(jscode);

//拿到解密函数所在节点
let stringDecryptFuncAst = ast.program.body[2];
//拿到解密函数的名字
let DecryptFuncName = stringDecryptFuncAst.declarations[0].id.name;
//新建一个 AST，把原代码中的前三部分，加入到 body 节点中
let newAst = parser.parse('');
newAst.program.body.push(ast.program.body[0]);
newAst.program.body.push(ast.program.body[1]);
newAst.program.body.push(stringDecryptFuncAst);
//把这三部分的代码转为字符串，由于存在格式化检测，需要指定选项，来压缩代码
let stringDecryptFunc = generator(newAst, { compact: true }).code;
//将字符串形式的代码执行，这样就可以在 nodejs 中运行解密函数了
eval(stringDecryptFunc);

traverse(ast, {
	//遍历所有变量
	VariableDeclarator(path) {
		//当变量名与解密函数名相同时，就执行相应操作
		if (path.node.id.name == DecryptFuncName) {
			let binding = path.scope.getBinding(DecryptFuncName);
			binding && binding.referencePaths.map(function (v) {
				v.parentPath.isCallExpression() &&
					v.parentPath.replaceWith(t.stringLiteral(eval(v.parentPath + '')));
			});
		}
	}
});

ast.program.body.shift();
ast.program.body.shift();
ast.program.body.shift();


var totalObj = {};
function generatorObj(ast) {
	traverse(ast, {
		VariableDeclarator(path) {
			//init 节点为 ObjectExpression 的时候，就是需要处理的对象
			if (t.isObjectExpression(path.node.init)) {
				//取出对象名
				let objName = path.node.id.name;
				//以对象名作为属性名在 totalObj 中创建对象
				objName && (totalObj[objName] = totalObj[objName] || {});
				//解析对象中的每一个属性，加入到新建的对象中去，注意属性值依然是 Node 类型
				totalObj[objName] && path.node.init.properties.map(function (p) {
					totalObj[objName][p.key.value] = p.value;
				});
			};
		}
	});
	return ast;
}

ast = generatorObj(ast);

function findRealValue(node) {
	if (t.isMemberExpression(node)) {
		let objName = node.object.name;
		let propName = node.property.value;
		if (totalObj[objName][propName]) {
			return findRealValue(totalObj[objName][propName]);
		} else {
			return false;
		}
	} else {
		return node;
	}
}
function findRealFunc(node) {
	if (t.isFunctionExpression(node) && node.body.body.length == 1) {
		let expr = node.body.body[0].argument.callee;
		if (t.isMemberExpression(expr)) {
			let objName = expr.object.name;
			let propName = expr.property.value;
			if (totalObj[objName]) {
				return findRealFunc(totalObj[objName][propName]);
			} else {
				return false;
			}
		}
		return node;
	} else {
		return node;
	}
}

// 遍历所有对象 获取对象表达式
traverse(ast, {
	VariableDeclarator(path) {
		if (t.isObjectExpression(path.node.init)) {
			path.node.init.properties.map(function (p) {
				let realNode = findRealValue(p.value);
				realNode && (p.value = realNode);
			});
		};
	}
});

ast = generatorObj(ast);

traverse(ast, {
	MemberExpression(path) {
		let objName = path.node.object.name;
		let propName = path.node.property.value;
		totalObj[objName] && t.isStringLiteral(totalObj[objName][propName]) &&
			path.replaceWith(totalObj[objName][propName]);
	}
});

traverse(ast, {
	VariableDeclarator(path) {
		if (t.isObjectExpression(path.node.init)) {
			path.node.init.properties.map(function (p) {
				let realNode = findRealFunc(p.value);
				realNode && (p.value = realNode);
			});
		};
	}
});

//去除函数花指令以后，更新一下 totalObj 对象
ast = generatorObj(ast);

traverse(ast, {
	CallExpression(path) {
		//callee 不为 MemberExpression 的节点，不做处理
		if (!t.isMemberExpression(path.node.callee))
			return;
		//取出对象名和属性名
		let objName = path.node.callee.object.name;
		let propertyName = path.node.callee.property.value;
		//如果在 totalObj 中有相应节点，就是需要进行替换的
		if (totalObj[objName] && totalObj[objName][propertyName]) {
			//totalObj 中存放的是函数节点
			let myFunc = totalObj[objName][propertyName];
			//在原代码中，函数体其实就一行 return 语句，取出其中的 argument 节点
			let returnExpr = myFunc.body.body[0].argument;
			//判断 argument 节点类型，并且用相应的实参来构建二项式或者调用表达式
			//然后替换当前遍历到的整个 CallExpression 节点即可
			if (t.isBinaryExpression(returnExpr)) {
				let binExpr = t.binaryExpression(returnExpr.operator,
					path.node.arguments[0], path.node.arguments[1]);
				path.replaceWith(binExpr);
			} else if (t.isCallExpression(returnExpr)) {
				//把 arguments 数组中的下标为 1 和以后的成员，放入 newArray 中
				let newArray = path.node.arguments.slice(1);
				let callExpr = t.callExpression(path.node.arguments[0],
					newArray);
				path.replaceWith(callExpr);
			}
		}
	}
})

// 去除所有对象表达式  
traverse(ast, {
	VariableDeclarator(path) {
		if (t.isObjectExpression(path.node.init)) {
			path.remove();
		};
	}
});


for (let i = 0; i < 10; i++) {
	traverse(ast, {
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
				let shufferArr = path.node.object.value.split("|");
				shufferArr.map(function (v) {
					parentPath.body.push(myArr[v]);
				});
				path.stop();
			}
		}
	});
}


let code = generator(ast).code;
fs.writeFile(__dirname + "/demoNew.js", code, (err) => { });
