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
		//逐行提取语句，按原先的语句顺序建立索引，包装成对象
		let Statements = blockStatement.body.map(function (v, i) {
			return { index: i, value: v };
		});
		//洗牌，打乱语句顺序
		let i = Statements.length;
		while (i) {
			let j = Math.floor(Math.random() * i--);
			[Statements[j], Statements[i]] = [Statements[i], Statements[j]];
		}
		//构建分发器，创建switchCase数组
		let dispenserArr = [];
		let cases = [];
		Statements.map(function (v, i) {
			dispenserArr[v.index] = i;
			let switchCase = t.switchCase(t.numericLiteral(i), [v.value, t.continueStatement()]);
			cases.push(switchCase);
		});
		let dispenserStr = dispenserArr.join('|');
		//生成_array和_index标识符，利用BabelAPI保证不重名
		let array = path.scope.generateUidIdentifier('array');
		let index = path.scope.generateUidIdentifier('index');
		//生成 '...'.split 这是一个成员表达式
		let callee = t.memberExpression(t.stringLiteral(dispenserStr), t.identifier('split'));
		//生成 split('|')
		let arrayInit = t.callExpression(callee, [t.stringLiteral('|')]);
		//_array和_index放入声明语句中，_index初始化为0
		let varArray = t.variableDeclarator(array, arrayInit);
		let varIndex = t.variableDeclarator(index, t.numericLiteral(0));
		let dispenser = t.variableDeclaration('let', [varArray, varIndex]);
		//生成switch中的表达式 +_array[_index++] 
		let updExp = t.updateExpression('++', index);
		let memExp = t.memberExpression(array, updExp, true);
		let discriminant = t.unaryExpression("+", memExp);
		//构建整个switch语句
		let switchSta = t.switchStatement(discriminant, cases);
		//生成while循环中的条件 !![]
		let unaExp = t.unaryExpression("!", t.arrayExpression());
		unaExp = t.unaryExpression("!", unaExp);
		//生成整个while循环
		let whileSta = t.whileStatement(unaExp, t.blockStatement([switchSta, t.breakStatement()]));
		//用分发器和while循环来构建blockStatement，替换原有节点
		path.get('body').replaceWith(t.blockStatement([dispenser, whileSta]));

	}
});

let code = generator(ast).code;
fs.writeFile(__dirname + '/demoNew.js', code, (err) => { });
