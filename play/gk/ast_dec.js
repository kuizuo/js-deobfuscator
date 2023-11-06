const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const fs = require('fs')

function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

let totalObj = []
let fs_i = 0
class AstDec {
  constructor(setting) {
    if (!setting.jscode) throw new Error('请载入js代码')
    console.time('useTime')
    let { jscode, encryptFunc } = setting
    this.jscode = jscode
    this.ast = parser.parse(jscode)
    this.opts = setting.opts || {}
    this.isWriteFile = setting.isWriteFile ?? false
    this.bigArr = []
    this.shuffleNum = setting.shuffleNum || 10
    this.encryptFunc = encryptFunc
    this.identifierArr = setting.identifierArr
    this.decFunctionArr = []
  }

  get code() {
    let code = generator(this.ast, this.opts).code
    return code
  }

  getCode() {
    let code = generator(this.ast, this.opts).code
    console.timeEnd('useTime')
    return code
  }

  // 重解析
  reParse() {
    let jscode = generator(this.ast, this.opts).code
    // 记录解析后生成的代码 方便调试查看
    if (this.isWriteFile) {
      fs.writeFile(__dirname + `/newCode${++fs_i}.js`, jscode, (err) => {})
    }
    this.ast = parser.parse(jscode)
  }

  /**
   * 根据函数调用次数寻找到解密函数
   */
  findDecFunction() {
    let decFunctionArr = []
    let index = 0 // 定义解密函数所在语句下标

    // 先遍历所有函数(作用域在Program)，并根据引用次数来判断是否为解密函数
    traverse(this.ast, {
      Program(p) {
        p.traverse({
          'FunctionDeclaration|VariableDeclarator'(path) {
            if (!(t.isFunctionDeclaration(path.node) || t.isFunctionExpression(path.node.init))) {
              return
            }

            let name = path.node.id.name
            let binding = path.scope.getBinding(name)
            if (!binding) return

            // 调用超过100次多半就是解密函数,具体可根据实际情况来判断
            if (binding.referencePaths.length > 100) {
              decFunctionArr.push(name)

              // 根据最后一个解密函数来定义解密函数所在语句下标
              let binding = p.scope.getBinding(name)
              if (!binding) return

              let parent = binding.path.findParent((_p) => _p.isFunctionDeclaration() || _p.isVariableDeclaration())
              if (!parent) return
              let body = p.scope.block.body
              for (let i = 0; i < body.length; i++) {
                const node = body[i]
                if (node.start == parent.node.start) {
                  index = i + 1
                  break
                }
              }
              // 遍历完当前节点,就不再往子节点遍历
              path.skip()
            }
          },
        })
      },
    })

    let newAst = parser.parse('')
    // 插入解密函数前的几条语句
    newAst.program.body = this.ast.program.body.slice(0, index)
    // 把这部分的代码转为字符串，由于可能存在格式化检测，需要指定选项，来压缩代码
    let code = generator(newAst, { compact: true }).code
    // 将字符串形式的代码执行，这样就可以在 nodejs 中运行解密函数了
    global.eval(code)

    this.decFunctionArr = decFunctionArr
  }

  /**
   * 执行数组乱序 与解密函数代码 将混淆字符串数值还原
   *
   * _0x4698(_0x13ee81 - -674, _0x3dfa50) => 调用解密函数得到原字符串
   */
  decStringArr() {
    let decFunctionArr = this.decFunctionArr

    traverse(this.ast, {
      VariableDeclarator(path) {
        if (decFunctionArr.includes(path.node.id.name)) {
          let decryptFuncName = decFunctionArr.find((f) => f === path.node.id.name)
          let binding = path.scope.getBinding(decryptFuncName)
          binding &&
            binding.referencePaths.map((p) => {
              if (!(p.parentPath.isCallExpression() && p.parentPath.node.arguments.length === 2)) return

              try {
                // 如果解密函数中有变量参数 则不替换
                let argumentList = p.parentPath.node.arguments
                // 实参中如果有变量则直接跳出不替换
                let hasIdentifier = argumentList.some((a) => t.isIdentifier(a))
                if (hasIdentifier) return

                let callCode = p.parentPath.toString()
                let decStr = eval(callCode)
                // console.log(callCode, decStr);
                p.parentPath.replaceWith(t.stringLiteral(decStr))
              } catch (error) {
                // 解密失败 则添加注释  失败原因可能是该函数未调用

                p.addComment('leading', '解密失败' + error.message, true)
              }
            })
        }
      },
    })

    // 将源代码中的解密代码给移除
    // this.ast.program.body.shift();
    // this.ast.program.body.shift();
    // this.ast.program.body.shift();
  }

  /**
	 * 处理解密函数嵌套函数花指令
	 * 	_0x4698 为解密函数
	 *  var _0x49afe4 = function (_0x254ae1, _0x559602, _0x3dfa50, _0x21855f, _0x13ee81) {
					return _0x4698(_0x13ee81 - -674, _0x3dfa50);
			}; 

			_0x49afe4(-57, 1080, 828, 1138, 469)  => _0x4698(_0x13ee81 - -674, _0x3dfa50) 
			=> _0x4698('469' - -674, '828') => 调用解密函数得到原字符串
	 */
  doDecStringFuncFlower() {
    let decFunctionArr = this.decFunctionArr
    if (decFunctionArr.length === 0) return
    traverse(this.ast, {
      VariableDeclarator(path) {
        if (decFunctionArr.includes(path.node.id.name)) {
          let decryptFuncName = decFunctionArr.find((f) => f === path.node.id.name)
          let binding_decFunc = path.scope.getBinding(decryptFuncName)
          binding_decFunc &&
            binding_decFunc.referencePaths.map((p_dec) => {
              if (!(p_dec.parentPath.isCallExpression() && p_dec.parentPath.node.arguments.length === 2)) return
              // 寻找嵌套函数 剔除多次调用无用的花指令
              // var _0x1b0063 = function(_0x3b85ee, _0x422ba8, _0x399819, _0x41dc9e, _0x14fe2f) {
              //    return _0x4698(_0x41dc9e - -0x2d1, _0x422ba8);
              // };
              // 不是return语句,则判断不是解密函数花指令
              if (!p_dec.parentPath.parentPath.isReturnStatement()) return
              let callFuncVarPath = p_dec.findParent((p) => p.node.type === 'VariableDeclarator')

              let callFuncName = callFuncVarPath.node.id.name
              let orgcallFuncInit = deepClone(callFuncVarPath.node.init) // 用于后续重命名还原原始函数

              // 获取嵌套函数的binding 在根据嵌套函数的作用域referencePaths 遍历调用嵌套函数的地方
              let binding_callFunc = p_dec.scope.getBinding(callFuncName)
              binding_callFunc &&
                binding_callFunc.referencePaths.map((p_call) => {
                  // 获取实参
                  let argumentList = p_call.parentPath.node.arguments
                  let orgArgumentList = deepClone(argumentList)
                  let params = callFuncVarPath.node.init.params
                  let orgParams = deepClone(params)
                  // 实参中如果有变量则直接跳出不替换
                  let hasIdentifier = orgArgumentList.some((a) => t.isIdentifier(a))
                  if (hasIdentifier) return

                  let nameMap = {}
                  // 实参有可能小于形参 所以遍历实参
                  for (let i = 0; i < orgArgumentList.length; i++) {
                    let paramName = orgParams[i].name
                    let argumentName

                    if (orgArgumentList[i].type === 'UnaryExpression') {
                      argumentName = orgArgumentList[i].operator + orgArgumentList[i].argument.value
                    } else {
                      argumentName = orgArgumentList[i].value
                    }
                    argumentName = `'${argumentName}'`
                    // 将形参变为传入的实参 并指定作用域为嵌套函数内
                    p_dec.parentPath.scope.rename(paramName, argumentName)
                    nameMap[paramName] = argumentName
                  }
                  // if (callFuncName === '_0x262585') {
                  //   console.log(orgParams.map((p) => p.name));
                  //   console.log(orgArgumentList.map((p) => p.value));

                  //   console.log(p_call.parentPath.toString());
                  //   console.log(p_dec.parentPath.toString());
                  // }

                  // 将形参都转为实参后 然后生成对应解密后的代码 直接替换原本调用嵌套函数的地方 后面解密函数要处理
                  let code = p_dec.parentPath.toString()
                  p_call.parentPath.replaceWithSourceString(code)

                  // 然后重命名回来
                  Object.entries(nameMap).map((o) => {
                    let paramName = o[0]
                    let argumentName = o[1]
                    p_dec.parentPath.scope.rename(argumentName, paramName)
                  })

                  /* 重命名后此时内嵌函数将会变成
                    _0x49afe4 = function ('-57', '1080', '828', '1138', '469') {
                      return _0x4698('469' - -674, '828');
                    }' 
                  但形参不能为字面量,所以就需要转化成原先的参数
                  */
                  callFuncVarPath.node.init = orgcallFuncInit

                  // p_call.parentPath.toString()
                  // '_0x49afe4(-57, 1080, 828, 1138, 469)'
                  // p_dec.parentPath.toString()
                  // '_0x4698(_0x13ee81 - -674, _0x3dfa50)'
                  // funcVarPath.toString()
                  // _0x49afe4 = function ('-57', '1080', '828', '1138', '469') {
                  //   return _0x4698('469' - -0x2a2, '828');
                  // }
                })
            })
        }
      },
    })
  }

  /**
   * 保存所有对象用于替换
   */
  saveAllObj() {
    this.reParse()
    this.removeUnusedValue() // 移除无用对象
    totalObj = []
    traverse(this.ast, {
      VariableDeclarator(path) {
        // init 节点为 ObjectExpression 的时候，就是需要处理的对象
        if (t.isObjectExpression(path.node.init)) {
          let objName = path.node.id.name
          //以对象名作为属性名在 totalObj 中创建对象
          objName && (totalObj[objName] = totalObj[objName] || {})
          // 解析对象中的每一个属性，加入到新建的对象中去，注意属性值依然是 Node 类型
          totalObj[objName] &&
            path.node.init.properties.map((p) => {
              totalObj[objName][p.key.value] = p.value
            })
        }
      },
    })
  }

  /**
   * 处理对象字符串花指令  
    var _0x52627b = {
      'QqaUY': "attribute",
    }

    _0x52627b["QqaUY"] => "attribute"
   */
  stringflowerCode() {
    let findRealValue = (node) => {
      if (t.isMemberExpression(node)) {
        let objName = node.object.name
        let propName = node.property.value
        if (totalObj[objName][propName]) {
          return findRealValue(totalObj[objName][propName])
        } else {
          return false
        }
      } else {
        return node
      }
    }

    traverse(this.ast, {
      VariableDeclarator(path) {
        if (t.isObjectExpression(path.node.init)) {
          path.node.init.properties.map((p) => {
            let realNode = findRealValue(p.value)
            realNode && (p.value = realNode)
          })
        }
      },
      MemberExpression(path) {
        // let objName = path.node.object.name
        // let propName = path.node.property.value
        // totalObj[objName] && t.isLiteral(totalObj[objName][propName]) && path.replaceWith(totalObj[objName][propName])
      },
    })
  }

  /**
   * 处理对象函数花指令'
    var _0x52627b = {
      'nWchU': function (_0x4cf812, _0x337d52) {
        return _0x4cf812 == _0x337d52;
      },
      'WkmYD': function (_0x31935d, _0x5079d8, _0x448f41) {
        return _0x31935d(_0x5079d8, _0x448f41);
      }
    }

    _0x52627b["nWchU"](_0x2efae8["length"], 8) => _0x2efae8["length"] == 8
    _0x52627b["WkmYD"](define, [], _0x23bf86) => define([], _0x23bf86)
   */
  funcFlowerCode() {
    function findRealFunc(node) {
      if (t.isFunctionExpression(node) && node.body.body.length == 1) {
        let expr = node.body.body[0].argument.callee
        if (t.isMemberExpression(expr)) {
          let objName = expr.object.name
          let propName = expr.property.value
          if (totalObj[objName]) {
            return findRealFunc(totalObj[objName][propName])
          } else {
            return false
          }
        }
        return node
      } else {
        return node
      }
    }
    traverse(this.ast, {
      VariableDeclarator(path) {
        if (t.isObjectExpression(path.node.init)) {
          path.node.init.properties.map(function (p) {
            let realNode = findRealFunc(p.value)
            realNode && (p.value = realNode)
          })
        }
      },
      CallExpression(path) {
        //callee 不为 MemberExpression 的节点，不做处理
        if (!t.isMemberExpression(path.node.callee)) return

        let objName = path.node.callee.object.name
        let propertyName = path.node.callee.property.value

        if (!(totalObj[objName] && totalObj[objName][propertyName])) return

        let orgFunc = totalObj[objName][propertyName]
        //在原代码中，函数体其实就一行 return 语句，如果是 取出其中的 argument 属性与调用节点替换,反之不替换
        if (!orgFunc.body.body?.[0].type === 'ReturnStatement') return

        let returnExpr = orgFunc.body.body[0].argument
        if (t.isBinaryExpression(returnExpr)) {
          let binExpr = t.binaryExpression(returnExpr.operator, path.node.arguments[0], path.node.arguments[1])
          path.replaceWith(binExpr)
        } else if (t.isLogicalExpression(returnExpr)) {
          let logicalExpr = t.logicalExpression(returnExpr.operator, path.node.arguments[0], path.node.arguments[1])
          path.replaceWith(logicalExpr)
        } else if (t.isCallExpression(returnExpr)) {
          // 取出是哪个参数作为函数名来调用  tips: 不一定是第一个参数
          // 调用函数名必须是标识符才替换 如_0x2f2486["DFdpm"](_0x2e0ccc, _0x5a692b); 则不替换
          if (returnExpr.callee.type !== 'Identifier') return

          let callFuncName = returnExpr.callee.name // 形参的函数
          let callIndex = orgFunc.params.findIndex((a) => a.name === callFuncName)
          // 获取传入实参的函数名
          let argFunc = path.node.arguments.splice(callIndex, 1)[0]
          let callExpr = t.callExpression(argFunc, path.node.arguments)
          path.replaceWith(callExpr)
        }
      },
    })
  }

  /**
   * 处理switch混淆 针对"3|2|4|1|0"["split"]('|');
   */
  switchFlat() {
    for (let i = 0; i < 5; i++) {
      traverse(this.ast, {
        SwitchStatement(path) {
          let forOrWhileStatementPath = path.findParent((p) => p.isForStatement() || p.isWhileStatement())
          if (!forOrWhileStatementPath) {
            return
          }
          let blockStatementPath = forOrWhileStatementPath.findParent((p) => p.isBlockStatement())

          let shufferString = ''
          let shufferArr = []

          forOrWhileStatementPath.traverse({
            MemberExpression(path) {
              if (t.isStringLiteral(path.node.property, { value: 'split' })) {
                // path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'

                if (t.isStringLiteral(path.node.object)) {
                  // path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'
                  shufferString = path.node.object.value
                }

                shufferArr = shufferString.split('|')
              }
            },
          })

          if (shufferArr.length === 0) return

          let myArr = []
          path.node.cases.map((p) => {
            if (p.test) {
              myArr[p.test.value] = p.consequent[0]
            } else {
              debugger
            }
          })

          shufferArr.map((v) => {
            blockStatementPath.node.body.push(myArr[v])
          })

          // switch  BlockStatement  For or While
          path.parentPath.parentPath.remove()
          path.skip()
        },
      })
    }
  }

  /**
   * 将形参中所包含的对象的改为实参形式
   */
  convParam() {
    traverse(this.ast, {
      ExpressionStatement(path) {
        var node = path.node
        if (!t.isCallExpression(node.expression)) return
        if (node.expression.arguments == undefined || node.expression.callee.params == undefined || node.expression.arguments.length > node.expression.callee.params.length) return

        // 获取形参和实参
        var argumentList = node.expression.arguments
        var paramList = node.expression.callee.params
        // 实参可能会比形参少，所以我们对实参进行遍历， 查看当前作用域内是否有该实参的引用
        for (var i = 0; i < argumentList.length; i++) {
          var argumentName = argumentList[i].name
          var paramName = paramList[i].name
          path.traverse({
            MemberExpression(_path) {
              var _node = _path.node
              if (!t.isIdentifier(_node.object) || _node.object.name !== paramName) return
              // 有对实参的引用则 将形参的名字改为实参的名字
              _node.object.name = argumentName
            },
          })
        }
        // 删除实参和形参的列表。
        // node.expression.arguments.length = 0
        // node.expression.callee.params.length = 0
      },
    })
  }

  /**
   * 将对象['属性'] 改为对象.属性
   */
  changeObjectAccessMode() {
    traverse(this.ast, {
      MemberExpression(path) {
        if (t.isStringLiteral(path.node.property)) {
          let name = path.node.property.value
          path.node.property = t.identifier(name)
          path.node.computed = false
        }
      },
    })
  }

  /**
   * 将字符串和数值常量直接替换对应的变量引用地方
   */
  replaceLiteral() {
    traverse(this.ast, {
      'AssignmentExpression|VariableDeclarator'(path) {
        let name, initValue
        if (path.isAssignmentExpression()) {
          name = path.node.left.name
          initValue = path.node.right
        } else {
          name = path.node.id.name
          initValue = path.node.init
        }

        if (t.isStringLiteral(initValue) || t.isNumericLiteral(initValue)) {
          let binding = path.scope.getBinding(name)
          if (binding && binding.constant && binding.constantViolations.length == 0) {
            for (let i = 0; i < binding.referencePaths.length; i++) {
              binding.referencePaths[i].replaceWith(initValue)
            }
            path.remove()
          }
        }
      },
    })
  }

  /**
   * 计算二项式字面量
   */

  transformBinary() {
    traverse(this.ast, {
      BinaryExpression(path) {
        let { left, right } = path.node
        let hasIdentifier = [left, right].some((a) => t.isIdentifier(a))
        if (hasIdentifier) return
        // 判断左右两边是否为字面量
        if (t.isLiteral(left) && t.isLiteral(right)) {
          let { confident, value } = path.evaluate() // 计算二项式的值
          confident && path.replaceWith(t.valueToNode(value))
          path.skip()
        }
      },
    })
  }

  /**
   *  将!![] 转化为true  ![] 转为false
   */
  transformBoolean() {
    traverse(this.ast, {
      UnaryExpression(path) {
        if (path.node.operator !== '!') return // 避免判断成 void

        // 判断第二个符号是不是!
        if (t.isUnaryExpression(path.node.argument)) {
          if (t.isArrayExpression(path.node.argument.argument)) {
            // !![]
            if (path.node.argument.argument.elements.length == 0) {
              path.replaceWith(t.booleanLiteral(true))
              path.skip()
            }
          }
        } else if (t.isArrayExpression(path.node.argument)) {
          // ![]
          if (path.node.argument.elements.length == 0) {
            path.replaceWith(t.booleanLiteral(false))
            path.skip()
          }
        } else if (t.isNumericLiteral(path.node.argument)) {
          // !0 or !1
          if (path.node.argument.value === 0) {
            path.replaceWith(t.booleanLiteral(true))
          } else if (path.node.argument.value === 1) {
            path.replaceWith(t.booleanLiteral(false))
          }
        } else {
        }
      },
    })
  }

  /**
   * 	删除未调用变量
   */
  removeUnusedValue() {
    traverse(this.ast, {
      VariableDeclarator(path) {
        const { id, init } = path.node
        if (!(t.isLiteral(init) || t.isObjectExpression(init) || t.isFunctionExpression(init))) return
        const binding = path.scope.getBinding(id.name)
        if (!binding || binding.constantViolations.length > 0) return

        if (binding.referencePaths.length > 0) return
        path.remove()
      },
      FunctionDeclaration(path) {
        const binding = path.scope.getBinding(path.node.id.name)
        if (!binding || binding.constantViolations.length > 0) return

        if (binding.referencePaths.length > 0) return
        path.remove()
      },
    })
  }

  /**
   * 剔除始终不会执行的代码块
   */
  removeUnusedBlock() {
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
    })
  }

  /**
   * 将所有十六进制编码与Unicode编码转为正常字符 以及将0x123转化为291
   */
  hexUnicodeToString() {
    traverse(this.ast, {
      StringLiteral(path) {
        var curNode = path.node
        delete curNode.extra
      },
      NumericLiteral(path) {
        var curNode = path.node
        delete curNode.extra
      },
    })
  }

  /**
   * 给关键函数 标识符 设置注释  TOLOOK
   */
  addComments() {
    traverse(this.ast, {
      DebuggerStatement(path) {
        path.addComment('leading', ' TOLOOK', true)
      },
      CallExpression(path) {
        if (!['setTimeout', 'setInterval'].includes(path.node.callee.name)) return
        path.addComment('leading', ' TOLOOK', true)
      },
      StringLiteral(path) {
        if (['debugger'].includes(path.node.value)) {
          path.addComment('leading', ' TOLOOK', true)
        }
      },
    })
  }

  renameIdentifier() {
    let code = this.code
    let newAst = parser.parse(code)
    traverse(newAst, {
      'Program|FunctionExpression|FunctionDeclaration'(path) {
        path.traverse({
          Identifier(p) {
            path.scope.rename(p.node.name, path.scope.generateUidIdentifier('_0xabc').name)
          },
        })
      },
    })
    this.ast = newAst
  }
}

;(function () {
  let jscode = fs.readFileSync(__dirname + '/demo.js', { encoding: 'utf-8' })

  let astDec = new AstDec({
    jscode: jscode,
    opts: { minified: false, jsescOption: { minimal: true }, compact: false, comments: true },
    isWriteFile: true,
  })

  astDec.findDecFunction()

  astDec.doDecStringFuncFlower()
  astDec.reParse()
  astDec.decStringArr()

  astDec.saveAllObj()
  astDec.stringflowerCode()
  astDec.funcFlowerCode()

  // // 将所有对象引用都改为直接引用 就可以将对象删除(删除无用变量方法中将会删除)
  // // 有的对象引用其他对象属性, 替换后还存在花指令,故可再执行一遍
  // // 主要是这个还原的手法是将所有对象属性存入,然后遍历成员表达式来进行替换,而未用到作用域替换
  astDec.saveAllObj()
  astDec.stringflowerCode()
  astDec.funcFlowerCode()

  astDec.reParse()
  astDec.switchFlat()
  astDec.transformBoolean()
  astDec.transformBinary()
  astDec.replaceLiteral()
  astDec.removeUnusedValue()
  astDec.removeUnusedBlock()
  astDec.changeObjectAccessMode()
  astDec.hexUnicodeToString()
  astDec.addComments()

  let code = astDec.getCode()
  fs.writeFile(__dirname + '/newCode.js', code, (err) => {})
})()
