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

traverse(ast, {
	VariableDeclarator(path) {
		var node = path.node;
		if (!t.isObjectExpression(node.init)) return;
		var objPropertiesList = node.init.properties;
		if (objPropertiesList.length == 0) return;
		var objName = node.id.name;
		// 对定义的各个 方法 或 字符串 依次在作用域内查找是否有调用
		objPropertiesList.forEach(prop => {
			var key = prop.key.value;
			if (!t.isStringLiteral(prop.value)) {
				// 对方法属性的遍历
				if (!prop.value.body) return
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
						} else if (t.isLogicalExpression(retStmt.argument) && args.length == 2) {// 逻辑运算  
							_path.replaceWith(t.logicalExpression(retStmt.argument.operator, args[0], args[1]));
						} else if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee)) {// 函数调用 
							_path.replaceWith(t.callExpression(args[0], args.slice(1)))
						}
					}
				})
			} else {         // 对字符串属性的遍历         
				var retStmt = prop.value.value;               // 该path的最近父节点  
				var fnPath = path.getFunctionParent();
				fnPath.traverse({
					MemberExpression: function (_path) {
						var _node = _path.node;
						if (!t.isIdentifier(_node.object) || _node.object.name !== objName) return;
						if (!t.isStringLiteral(_node.property) || _node.property.value != key) return;
						_path.replaceWith(t.stringLiteral(retStmt))
					}
				})
			}
		});
		path.remove();// 遍历过的对象无用了，直接删除。    
	}
})


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
