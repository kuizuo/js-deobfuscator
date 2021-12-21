const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const fs = require('fs')

const Base64 = {
  encode(str) {
    return Buffer.from(str).toString('base64')
  },
  decode(str, type) {
    if (!type) type = "utf8"
    return Buffer.from(str, 'base64').toString(type)
  }
}

// Base64编码
function encrypt(str) {
  return Base64.encode(str)
}

function decrypt(str) {
  return Base64.decode(str)
}

class AstUtil {
  constructor(option) {
    if (!option.jscode) throw new Error('请载入js代码')

    let { jscode, encryptFunc, decryptFunc } = option
    this.jscode = jscode
    this.ast = AstUtil.parse(jscode)
    this.bigArr = []
    this.shuffleNum = option.shuffleNum || 10
    this.encryptFunc = encryptFunc
    this.decryptFunc = decryptFunc
    this.identifierArr = option.identifierArr
  }

  get code() {
    let code = generator(this.ast).code
    return code
  }

  static parse(jscode) {
    return parser.parse(jscode)
  }

  /**
   * 改变对象访问方式 console.log 改为 console['log']
   */
  changePropertyAccess() {
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
   * 改变类属性与方法访问方式
   */
  changeClassPropertyAccess() {
    traverse(this.ast, {
      'ClassProperty|ClassMethod'(path) {
        if (t.isIdentifier(path.node.key)) {
          let name = path.node.key.name
          if (name === 'constructor') return
          path.node.key = t.stringLiteral(name)
        }
        path.node.computed = true
      }
    })
  }

  /**
   * 将标准内置对象更改为windows调用  
   */
  changeBuiltinObjects() {
    traverse(this.ast, {
      Identifier(path) {
        let name = path.node.name
        if (['eval', 'parseInt', 'encodeURI', 'encodeURIComponent', 'Object', 'Function', 'Boolean', 'Number', 'Math', 'Date', 'String', 'RegExp', 'Array'].includes(name)) {
          path.replaceWith(t.memberExpression(t.identifier('window'), t.stringLiteral(name), true))
        }
      }
    })
  }

  /**
  * 数值常量加密
  */
  numericEncrypt() {
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
  * 字符串加密并添加至数组
  */
  stringEncrypt() {
    let bigArr = [];
    let encryptFunc = this.encryptFunc
    traverse(this.ast, {
      StringLiteral(path) {
        let cipherText = encryptFunc(path.node.value)
        let bigArrIndex = bigArr.indexOf(cipherText)
        let index = bigArrIndex
        if (bigArrIndex == -1) {
          let length = bigArr.push(cipherText)
          index = length - 1
        }

        let encryptIdentifier = t.identifier('atob')
        let encStr = t.callExpression(encryptIdentifier, [t.memberExpression(t.identifier('kz_arr'), t.numericLiteral(index), true)])
        path.replaceWith(encStr);
      }
    })

    // 将混淆后的字符串添加至数组内并在开头生成对应的语句
    bigArr = bigArr.map((v) => t.stringLiteral(v)) // 遍历生成AST的node String节点
    this.bigArr = bigArr
  }

  /**
  * 模板字符串混淆
  */
  TemplateEncrypt() {
    traverse(this.ast, {
      TemplateLiteral(path) {
        let { expressions, quasis } = path.node

        for (const i in expressions) {
          let e = expressions[i]
          quasis.splice(i * 2 + 1, 0, e)
        }
        let newExpressions = quasis

        let binary
        for (let i = 0; i < newExpressions.length; i++) {
          let left = binary
          let right = newExpressions[i]
          if (i === 0) {
            left = t.valueToNode(right.value.raw)
            binary = left
            continue
          }

          if (t.isTemplateElement(right)) {
            // if (right.value.raw === '') continue
            right = t.valueToNode(right.value.raw)
          }
          binary = t.binaryExpression('+', left, right)
        }
        path.replaceWith(binary)
      }
    })
  }

  /**
   * 数组混淆和乱序
   */
  arrayShuffle() {
    (function (myArr, num) {
      let shuffle = function (nums) {
        while (--nums) {
          myArr.unshift(myArr.pop())
        }
      }
      shuffle(++num)
    }(this.bigArr, this.shuffleNum))
  }

  /**
   * 拼接两个ast的body部分
   */
  astConcatArrayUnshift(ast) {
    const shuffleCode = `(function (myArr, num) {
      var kuizuo = function (nums) {
        while (--nums) {
          myArr.push(myArr.shift());
        }
      };
      kuizuo(++num);
    }(kz_arr, ${this.shuffleNum}));`

    // 把还原数组顺序的代码，加入到被混淆代码的ast前面
    let shuffleAstUtil = new AstUtil({ jscode: shuffleCode })
    // shuffleAstUtil.stringToHex();
    this.ast.program.body.unshift(shuffleAstUtil.ast.program.body[0]);
  }


  /**
   * 构建数组声明语句，并加入到ast最开始处
   */
  unshiftArrayDeclaration() {
    let varDeclarator = t.variableDeclarator(t.identifier('kz_arr'), t.arrayExpression(this.bigArr));
    this.bigArr = t.variableDeclaration('const', [varDeclarator]);
    this.ast.program.body.unshift(this.bigArr);

    // 调用浏览器的atob base64解码函数 就需要添加自定义解密函数

    // let a = t.Identifier('a')
    // let decryptFunc = t.functionDeclaration(
    //   t.identifier(decrypt.name),
    //   [a],
    //   t.blockStatement([t.returnStatement(
    //     t.callExpression(
    //       t.identifier(decrypt),
    //       [a])
    //   )]));
    // this.ast.program.body.unshift(decryptFunc) // 添加解密函数 
  }

  /**
   * 字符串十六进制加密
   */
  stringToHex() {
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
  binaryToFunc() {
    let operatorFuncNameArr = []

    traverse(this.ast, {
      BinaryExpression(path) {
        let operator = path.node.operator;
        let left = path.node.left;
        let right = path.node.right;

        let funcNameIdentifier
        let operatorFunc = operatorFuncNameArr.find(o => o.operator === operator)
        if (operatorFunc) {
          funcNameIdentifier = operatorFunc.funcNameIdentifier
        } else {
          funcNameIdentifier = path.scope.generateUidIdentifier('xxx');
          operatorFuncNameArr.push({
            operator,
            funcNameIdentifier
          })

          let a = t.identifier('a');
          let b = t.identifier('b');
          let func = t.functionDeclaration(
            funcNameIdentifier,
            [a, b],
            t.blockStatement([t.returnStatement(t.binaryExpression(operator, a, b))]))

          let BlockStatement = path.findParent(p => p.isBlockStatement())
          if (!BlockStatement) return
          BlockStatement.node.body.unshift(func);
        }

        path.replaceWith(t.callExpression(
          funcNameIdentifier,
          [left, right]
        ));
      }
    });
  }

  /**
   * 标识符重命名
   */
  renameIdentifier() {
    // 标识符混淆之前先转成代码再解析，才能确保新生成的一些节点也被解析到
    let code = this.code
    let newAst = AstUtil.parse(code);
    // 生成标识符
    let identifierArr = this.identifierArr

    function generatorIdentifier(decNum) {
      let arr = identifierArr || ['O', 'o', '0'];
      let retval = [];
      while (decNum > 0) {
        retval.push(decNum % arr.length);
        decNum = parseInt(decNum / arr.length);
      }

      let Identifier = retval.reverse().map(v => arr[v]).join('')
      if (Identifier.length < 6) {
        Identifier = Identifier.padStart(6, 'OOOOOO')
      } else {
        Identifier[0] == '0' && (Identifier = 'O' + Identifier)
      }

      return Identifier;
    }

    function renameOwnBinding(path) {
      let OwnBindingObj = {}, globalBindingObj = {}, i = 0;
      path.traverse({
        Identifier(p) {
          let name = p.node.name;
          let binding = p.scope.getOwnBinding(name);
          binding && generator(binding.scope.block).code == path.toString() ?
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
      'Program|FunctionExpression|FunctionDeclaration|ClassDeclaration|ClassProperty|ClassMethod'(path) {
        renameOwnBinding(path);
      }
    });
    this.ast = newAst;
  }

  /**
   *  指定代码行ASCII码混淆 根据注释ASCIIEncrypt
   *  不推荐使用eval进行混淆
   */
  appointedCodeLineAscii() {
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
   * 不推荐使用eval进行混淆
   */
  appointedCodeLineEncrypt() {
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
}

function main() {
  let jscode = fs.readFileSync(__dirname + '/code.js', { encoding: 'utf-8' })

  let astUtil = new AstUtil({
    jscode: jscode,
    encryptFunc: encrypt,
    decryptFunc: decrypt,
    shuffleNum: 20,
    identifierArr: ['O', '0', 'o']
  })

  // 改变对象属性访问方式
  astUtil.changePropertyAccess()
  astUtil.changeClassPropertyAccess()
  astUtil.changeBuiltinObjects()
  astUtil.stringToHex()

  astUtil.binaryToFunc()
  astUtil.TemplateEncrypt()
  astUtil.stringEncrypt()

  // //读取还原数组乱序的代码
  astUtil.arrayShuffle()
  astUtil.astConcatArrayUnshift()
  astUtil.unshiftArrayDeclaration()

  astUtil.renameIdentifier()
  astUtil.appointedCodeLineEncrypt()
  astUtil.appointedCodeLineAscii()
  astUtil.numericEncrypt()

  let code = astUtil.code
  code = code.replace(/\\\\x/g, '\\x');
  fs.writeFileSync(__dirname + '/newCode.js', code, { flag: 'w' })
}

main()



