const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync(__dirname + "/wangyicookie.js", {
	encoding: "utf-8"
});
let ast = parser.parse(jscode);

function e() {
	var e = "bi1euljfv3Yg4RyX".split("");
	this.d = function (t) {
		if (null == t || void 0 == t)
			return t;
		if (0 != t.length % 2)
			throw Error("1100");
		for (var n = [], i = 0; i < t.length; i++) {
			0 == i % 2 && n.push("%");
			for (var r = e, o = 0; o < r.length; o++)
				if (t.charAt(i) == r[o]) {
					n.push(o.toString(16));
					break
				}
		}
		return decodeURIComponent(n.join(""))
	}
}
var t = (new e).d
	, i = (new e).d
	, r = (new e).d
	, o = (new e).d
	, a = (new e).d;

// 处理解密函数
traverse(ast, {
	CallExpression(path) {
		let _arguments = path.node.arguments;
		if (_arguments && types.isStringLiteral(_arguments[0]) && path.parentPath.isArrayExpression()) {
			let retval = eval(path + '');
			//console.log(retval);
			path.replaceWith(types.stringLiteral(retval));
		}

	}
});

traverse(ast, {
	VariableDeclarator(path) {
		if (!types.isArrayExpression(path.node.init)) return;
		if (path.node.init.elements.length == 0) return;
		if ("|e|s|l|u|t|".indexOf(path.node.id.name) == -1) return;
		if (path.node.id.name == 'e') {
			path.node.id.name = 'eeee';
		} else if (path.node.id.name == 't') {
			path.node.id.name = 'tttt';
		}
		eval(path + '');
		//console.log('=======================================');
		//console.log(path + '');
	}
});

traverse(ast, {
	MemberExpression(path) {
		// let binding = types.isNumberLiteral(path.node.property) && 
		// 			  types.isIdentifier(path.node.object) && 
		// 			  path.scope.getBinding(path.node.object.name);
		// binding && binding.scope.traverse(binding.scope.block, {

		// });
		if (types.isNumericLiteral(path.node.property) && types.isIdentifier(path.node.object)) {
			if ("|e|s|l|u|t|".indexOf(path.node.object.name) == -1) return;
			let _name = path.node.object.name;
			let retval = null;
			if (_name == "e") {
				retval = types.stringLiteral(eeee[path.node.property.value]);
			} else if (_name == "t") {
				retval = types.numericLiteral(tttt[path.node.property.value]);
			} else {
				retval = types.stringLiteral(eval(path + ''));
			}
			//console.log(path + '');
			path.replaceWith(retval);
		}
	}
});

traverse(ast, {
	"AssignmentExpression|VariableDeclarator"(path) {
		let _name = null;
		let _initValue = null;
		if (path.isAssignmentExpression()) {
			_name = path.node.left.name;
			_initValue = path.node.right;
		} else {
			_name = path.node.id.name;
			_initValue = path.node.init;
		}
		if (types.isStringLiteral(_initValue) || types.isNumericLiteral(_initValue)) {
			let binding = path.scope.getBinding(_name);
			if (binding && binding.constant && binding.constantViolations.length == 0) {
				for (let i = 0; i < binding.referencePaths.length; i++) {
					binding.referencePaths[i].replaceWith(_initValue);
				}
			}
		}
	}
});

code = generator(ast).code;
ast = parser.parse(code);

traverse(ast, {
	"AssignmentExpression|VariableDeclarator"(path) {
		let _name = null;
		let _initValue = null;
		if (path.isAssignmentExpression()) {
			_name = path.node.left.name;
			_initValue = path.node.right;
		} else {
			_name = path.node.id.name;
			_initValue = path.node.init;
		}

		if (types.isFunctionDeclaration(_initValue) || types.isFunctionExpression(_initValue)) return;
		let binding = path.scope.getBinding(_name);
		if (binding && binding.referenced == false) {
			path.remove();
		}
	}
});

code = generator(ast, { jsescOption: { minimal: true } }).code;
fs.writeFile(__dirname + '/demoNew.js', code, (err) => { });
