import fs from 'fs'
import * as parser from "@babel/parser";
import traverse from '@babel/traverse';
import t from '@babel/types';
import generator from '@babel/generator'


const encrypt = function () {
  return 'atob'
}
const decrypt = function () {
  return 'btoa'
}


let jscode = fs.readFileSync('./src/demo.js', {
  encoding: 'utf-8'
})
let ast = parser.parse(jscode)
console.log(jscode)

let ConfigUtils = {}

// 改变对象访问方式 console.log 改为 console['log']
ConfigUtils.prototype.changeAccess = function () {
  traverse(this.ast, {
    MemberExpression(path) {
      if (t.isIdentifier(path.node.property)) {
        let name = path.node.name
        path.node.property = t.stringLiteral(name)
      }
      path.node.computed = true
    }
  })
}

// 将内置对象更改为windows调用
ConfigUtils.prototype.changeBuiltinObjects = function () {
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

// 数值常量加密
ConfigUtils.prototype.numericEncrypt = function () {
  traverse(this.ast, {
    NumberLiteral(path) {
      let value = path.node.value
      let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10)
      let cipher = value ^ key
      path.replaceWith(t.binaryExpression('^', t.numberLiteral(cipher), t.numberLiteral(key)))
      path.skip() // 因为内部也有NumberLiteral 就会导致死循环
    }
  })
}

// 字符加密
ConfigUtils.prototype.stringEncrypt = function () {
  let bigArr = [];
  let encryptFunc = this.encryptFunc
  traverse(this.ast, {
    StringLiteral(path) {
      // let decryptName = decrypt.name
      // let encStr = t.callExpression(t.identifier(encrypt.name), [t.stringLiteral(decryptName(path.node.value))]) 直接替换文本
      // path.replaceWith(encStr);
      // path.skip()

      let cipherText = encrypt(path.node.value)
      let bigArrIndex = bigArr.indexOf(cipherText)
      let index = bigArrIndex
      if (bigArrIndex == -1) {
        let length = bigArr.push(cipherText)
        index = length - 1
      }
      let encStr = t.callExpression(t.identifier(encrypt.name), [t.memberExpression(t.identifier('arr'), t.numberLiteral(index), true)])
      path.replaceWith(encStr);
    }
  })

  bigArr = bigArr.map((v) => {
    return t.stringLiteral(v) // 遍历生成AST的node String节点
  })
  this.bigArr = bigArr
  bigArr = t.variableDeclaration(t.identifier('arr'), t.arrayExpression(bigArr))
  bigArr = t.variableDeclaration('var', [bigArr])
  ast.program.body.unshift(bigArr)
}

// 数组乱序 
ConfigUtils.prototype.arrayShuffle = function () {
  (function (myArr, num) {
    let shuffle = function (nums) {
      while (--nums) {
        myArr.unshift(myArr.pop())
      }
    }
    shuffle(++num)
  }(this.bigArr, 0x10))

  traverse(this.ast, {
    NumberLiteral(path) {
      let value = path.node.value
      let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10)
      let cipher = value ^ key
      path.replaceWith(t.binaryExpression('^', t.numberLiteral(cipher), t.numberLiteral(key)))
      path.skip() // 因为内部也有NumberLiteral 就会导致死循环
    }
  })
}



// 标识符重命名
ConfigUtils.prototype.renameIdentifier = function () {
  let code = generator(this.ast).code;
  let newAst = parser.parse(code)

  function generatorIdentifier(num) {
    let arr = ['O', 'o', 'Q', '0',]
    let retval = [];
    while (num > 0) {
      retval.push(num % arr.length)
      num = parseInt(num / arr.length)
    }
    let Identifier = retval.reverse().map(v => {
      return arr[v]
    }).join

    Identifier.length < 6 ? (Identifier = ('OOOOOO' + Identifier).substr(-6)) : Identifier[0] == '0' && (Identifier = 'O' + Identifier)
    return Identifier
  }



  traverse(this.ast, {
    'Program|FunctionExpression|FunctionDeclaration'(path) {
      let value = path.node.value
      let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10)
      let cipher = value ^ key
      path.replaceWith(t.binaryExpression('^', t.numberLiteral(cipher), t.numberLiteral(key)))
      path.skip() // 因为内部也有NumberLiteral 就会导致死循环
    }
  })
}

// 标识符重命名1 
ConfigUtils.prototype.renameIdentifier = function () {
  let code = generator(this.ast).code;
  let newAst = parser.parse(code)


  traverse(this.ast, {
    Program(path) {

      //完全也可以用 
      path.scope.getAllBindings()
      path.scope.bindings



      let value = path.node.value
      let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10)
      let cipher = value ^ key
      path.replaceWith(t.binaryExpression('^', t.numberLiteral(cipher), t.numberLiteral(key)))
      path.skip() // 因为内部也有NumberLiteral 就会导致死循环
    }
  })
}



