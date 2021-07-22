
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const fs = require('fs')

//Base64编码
function encrypt(str) {
  return Buffer.from(str).toString('base64')
}

function decrypt(base64Str) {
  return new Buffer(base64Str, 'base64').toString();
}

function AstUtil(ast, encryptFunc) {
  this.ast = ast
  this.bigArr = []
  this.encryptFunc = encryptFunc
}

/**
 * 改变对象访问方式 console.log 改为 console['log']
 */
AstUtil.prototype.changeAccess = function () {
  traverse(this.ast, {
    MemberExpression(path) {
      if (t.isIdentifier(path.node.property)) {
        let name = path.node.property.name
        path.node.property = t.stringLiteral(name)
      }
      path.node.computed = true
    }
  })
}

/**
 * 将内置对象更改为windows调用
 */
AstUtil.prototype.changeBuiltinObjects = function () {
  traverse(this.ast, {
    Identifier(path) {
      let name = path.node.name
      if (['eval', 'parseInt', 'encodeURI', 'encodeURIComponent', 'Object', 'Function', 'Boolean', 'Number', 'Math', 'Date', 'String', 'RegExp', 'Array'].includes(name)) {
        path.replaceWith(t.memberExpression(t.identifier('window'), t.stringLiteral(name), true))
        path.replace
      }
    }
  })
}

/**
 * 数值常量加密
 */
AstUtil.prototype.numericEncrypt = function () {
  traverse(this.ast, {
    NumericLiteral(path) {
      let value = path.node.value
      let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10)
      let cipher = value ^ key
      path.replaceWith(t.binaryExpression('^', t.numericLiteral(cipher), t.numericLiteral(key)))
      path.skip() // 因为内部也有numericLiteral 就会导致死循环
    }
  })
}

/**
 * 字符加密
 */
AstUtil.prototype.stringEncrypt = function () {
  let bigArr = [];
  let encryptFunc = this.encryptFunc
  traverse(this.ast, {
    StringLiteral(path) {
      /*       let decryptName = decrypt.name
            let encStr = t.callExpression(t.identifier(encrypt.name), [t.stringLiteral(decryptName(path.node.value))]) // 直接替换文本
            path.replaceWith(encStr);
            path.skip() */

      let cipherText = encryptFunc(path.node.value)
      let bigArrIndex = bigArr.indexOf(cipherText)
      let index = bigArrIndex
      if (bigArrIndex == -1) {
        let length = bigArr.push(cipherText)
        index = length - 1
      }

      let encStr = t.callExpression(t.identifier('atob'), [t.memberExpression(t.identifier('arr'), t.numericLiteral(index), true)])
      // encrypt(arr[0]) 
      path.replaceWith(encStr);
    }
  })

  // 将混淆后的字符串添加至数组内并在开头生成对应的语句
  bigArr = bigArr.map((v) => {
    return t.stringLiteral(v) // 遍历生成AST的node String节点
  })
  this.bigArr = bigArr
}

/**
 * 数组混淆和乱序
 */
AstUtil.prototype.arrayShuffle = function () {
  (function (myArr, num) {
    let shuffle = function (nums) {
      while (--nums) {
        myArr.unshift(myArr.pop())
      }
    }
    shuffle(++num)
  }(this.bigArr, 0x10))
}

/**
 * 构建数组声明语句，加入到ast最前面
 */
AstUtil.prototype.unshiftArrayDeclaration = function () {
  this.bigArr = t.variableDeclarator(t.identifier('arr'), t.arrayExpression(this.bigArr));
  this.bigArr = t.variableDeclaration('var', [this.bigArr]);
  this.ast.program.body.unshift(this.bigArr);

  /*   let a = t.Identifier('a')
    let decryptFunc = t.functionDeclaration(
      t.identifier(decrypt.name),
      [a],
      t.blockStatement([t.returnStatement(
        t.callExpression(t.identifier('new Buffer'), [a, t.stringLiteral('base64')]).callee.property = t.identifier("new Buffer(a,'base64').toString")
      )]));
  
    this.ast.program.body.unshift(decryptFunc) // 添加解密函数 */
}

/**
 * 十六进制字符串
 */
AstUtil.prototype.stringToHex = function () {
  function hexEnc(code) {
    for (var hexStr = [], i = 0, s; i < code.length; i++) {
      s = code.charCodeAt(i).toString(16);
      hexStr += "\\x" + s;
    }
    return hexStr
  }
  traverse(this.ast, {
    MemberExpression(path) {
      if (t.isIdentifier(path.node.property)) {
        let name = path.node.property.name;
        path.node.property = t.stringLiteral(hexEnc(name));
      }
      path.node.computed = true;
    }
  });
}

/**
 * 二项式转函数花指令
 */
AstUtil.prototype.binaryToFunc = function () {
  traverse(this.ast, {
    BinaryExpression(path) {
      let operator = path.node.operator;
      let left = path.node.left;
      let right = path.node.right;
      let a = t.identifier('a');
      let b = t.identifier('b');
      let funcNameIdentifier = path.scope.generateUidIdentifier('xxx');
      let func = t.functionDeclaration(
        funcNameIdentifier,
        [a, b],
        t.blockStatement([t.returnStatement(
          t.binaryExpression(operator, a, b)
        )]));
      let BlockStatement = path.findParent(
        function (p) { return p.isBlockStatement() });
      BlockStatement.node.body.unshift(func);
      path.replaceWith(t.callExpression(
        funcNameIdentifier, [left, right]));
    }
  });
}

/**
 * 标识符混淆
 */
AstUtil.prototype.renameIdentifier = function () {
  // 标识符混淆之前先转成代码再解析，才能确保新生成的一些节点也被解析到
  let code = generator(this.ast).code;
  let newAst = parser.parse(code);
  // 生成标识符
  function generatorIdentifier(decNum) {
    let arr = ['O', 'o', '0'];
    let retval = [];
    while (decNum > 0) {
      retval.push(decNum % 3);
      decNum = parseInt(decNum / 3);
    }
    let Identifier = retval.reverse().map(function (v) {
      return arr[v]
    }).join('');
    Identifier.length < 6 ? (Identifier = ('OOOOOO' + Identifier).substr(-6)) :
      Identifier[0] == '0' && (Identifier = 'O' + Identifier);
    return Identifier;
  }
  function renameOwnBinding(path) {
    let OwnBindingObj = {}, globalBindingObj = {}, i = 0;
    path.traverse({
      Identifier(p) {
        let name = p.node.name;
        let binding = p.scope.getOwnBinding(name);
        binding && generator(binding.scope.block).code == path + '' ?
          (OwnBindingObj[name] = binding) : (globalBindingObj[name] = 1);
      }
    });
    for (let oldName in OwnBindingObj) {
      do {
        var newName = generatorIdentifier(i++);
      } while (globalBindingObj[newName]);
      OwnBindingObj[oldName].scope.rename(oldName, newName);
    }
  }
  traverse(newAst, {
    'Program|FunctionExpression|FunctionDeclaration'(path) {
      renameOwnBinding(path);
    }
  });
  this.ast = newAst;
}

/**
 *  指定代码行ASCII码混淆 根据注释ASCIIEncrypt
 */
AstUtil.prototype.appointedCodeLineAscii = function () {
  traverse(this.ast, {
    FunctionExpression(path) {
      let blockStatement = path.node.body;
      let Statements = blockStatement.body.map(function (v) {
        if (t.isReturnStatement(v)) return v;
        if (!(v.trailingComments && v.trailingComments[0].value == 'ASCIIEncrypt')) return v;
        delete v.trailingComments;
        let code = generator(v).code;
        let codeAscii = [].map.call(code, function (v) {
          return t.numericLiteral(v.charCodeAt(0));
        })
        let decryptFuncName = t.memberExpression(
          t.identifier('String'), t.identifier('fromCharCode'));
        let decryptFunc = t.callExpression(decryptFuncName, codeAscii);
        return t.expressionStatement(
          t.callExpression(t.identifier('eval'), [decryptFunc]));
      });
      path.get('body').replaceWith(t.blockStatement(Statements));
    }
  });
}

/**
 * 指定代码行加密
 */
AstUtil.prototype.appointedCodeLineEncrypt = function () {
  traverse(this.ast, {
    FunctionExpression(path) {
      let blockStatement = path.node.body;
      let Statements = blockStatement.body.map(function (v) {
        if (t.isReturnStatement(v)) return v;
        if (!(v.trailingComments && v.trailingComments[0].value == 'Base64Encrypt')) return v;
        delete v.trailingComments;
        let code = generator(v).code;
        let cipherText = encrypt(code);
        let decryptFunc = t.callExpression(t.identifier(decrypt.name), [t.stringLiteral(cipherText)]);
        return t.expressionStatement(
          t.callExpression(t.identifier('eval'), [decryptFunc]));
      });
      path.get('body').replaceWith(t.blockStatement(Statements));
    }
  });
}

function main() {

  let jscode = fs.readFileSync('./src/demo.js', {
    encoding: 'utf-8'
  })
  let ast = parser.parse(jscode)

  let util = new AstUtil(ast, encrypt)
  util.changeAccess() // 改变对象属性访问方式
  // util.changeBuiltinObjects() // 标准内置对象的处理

  util.binaryToFunc()     //二项式转函数花指令
  util.stringEncrypt() // 字符串加密并添加至数组
  // util.stringToHex();// 字符串十六进制加密
  util.arrayShuffle() // 数组乱序
  util.unshiftArrayDeclaration();// 生成数组声明语句，并加入到被混淆代码的最开始处

  // util.renameIdentifier() // 标识符重命名

  // util.appointedCodeLineEncrypt() // 指定行加密
  // util.appointedCodeLineAscii() // 指定行混淆
  // util.numericEncrypt() // 数值常量混淆
  ast = util.ast
  let code = generator(ast).code
  fs.writeFileSync('src/newCode.js', code, { flag: 'w' })
}

main()



