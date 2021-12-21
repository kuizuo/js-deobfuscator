const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync(__dirname + "/demo.js", {
	encoding: "utf-8"
});
let ast = parser.parse(jscode);

traverse(ast, {
	FunctionExpression(path) {
		let blockStatement = path.node.body;
		let blockStatementLength = blockStatement.body.length;
		if (blockStatementLength < 2) return;
		//把所有声明的变量提取到参数列表中
		path.traverse({
			VariableDeclaration(p) {
				declarations = p.node.declarations;
				let statements = [];
				declarations.map(function (v) {
					path.node.params.push(v.id);
					v.init && statements.push(t.assignmentExpression('=', v.id, v.init));
				});
				p.replaceInline(statements);
			}
		});
		//处理赋值语句 返回语句 函数调用语句
		let firstSta = blockStatement.body[0],
			i = 1;
		while (i < blockStatementLength) {
			let tempSta = blockStatement.body[i++];
			t.isExpressionStatement(tempSta) ? secondSta = tempSta.expression : secondSta = tempSta;
			//处理返回语句
			if (t.isReturnStatement(secondSta)) {
				firstSta = t.returnStatement(t.toSequenceExpression([firstSta, secondSta.argument]));
				//处理赋值语句
			} else if (t.isAssignmentExpression(secondSta)) {
				if (t.isCallExpression(secondSta.right)) {
					let callee = secondSta.right.callee;
					callee.object = t.toSequenceExpression([firstSta, callee.object]);
					firstSta = secondSta;
				} else {
					secondSta.right = t.toSequenceExpression([firstSta, secondSta.right]);
					firstSta = secondSta;
				}
			} else {
				firstSta = t.toSequenceExpression([firstSta, secondSta]);
			}
		}
		path.get('body').replaceWith(t.blockStatement([firstSta]));
	}
});

let code = generator(ast).code;
fs.writeFile(__dirname + '/demoNew.js', code, (err) => { });
