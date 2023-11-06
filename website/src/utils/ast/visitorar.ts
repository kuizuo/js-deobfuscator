import generator, { GeneratorOptions } from '@babel/generator'
import { NodePath, Visitor } from '@babel/traverse'
import * as t from '@babel/types'

type BNSLiteral = t.BooleanLiteral | t.NumericLiteral | t.StringLiteral

// 通用的访问器
export const visitorar = {
  /**
   * 更改对象成员表达式1
   * object['prop'] --> object.prop
   */
  changeMemberExpression1(): Visitor {
    console.log('更改对象成员表达式1')
    return {
      MemberExpression(path) {
        if (t.isStringLiteral(path.node.property)) {
          let name = path.node.property.value
          path.node.property = t.identifier(name)
          path.node.computed = false
        }
      },
      ObjectProperty(path) {
        if (t.isStringLiteral(path.node.key)) {
          let name = path.node.key.value
          path.node.key = t.identifier(name)
        }
        path.node.computed = false
      },
    }
  },

  /**
   * 更改对象成员表达式2
   * object.prop --> object['prop']
   */
  changeMemberExpression2(): Visitor {
    console.log('更改对象成员表达式2')
    return {
      MemberExpression(path) {
        if (t.isIdentifier(path.node.property)) {
          const name = path.node.property.name
          path.node.property = t.stringLiteral(name)
        } else if (t.isNumericLiteral(path.node.property)) {
          const name = path.node.property.value
          path.node.property = t.stringLiteral(String(name))
        }
        path.node.computed = true
      },
      ObjectProperty(path) {
        if (t.isIdentifier(path.node.key)) {
          const name = path.node.key.name
          path.node.key = t.stringLiteral(name)
          path.node.computed = true
        } else if (t.isNumericLiteral(path.node.key)) {
          const name = path.node.key.value
          path.node.key = t.stringLiteral(String(name))
        }
      },
    }
  },

  /**
   * 移除逗号赋值表达式
   * var a = 1,b = ddd()
   * |
   * |
   * V
   * var a = 1;
   * var b = ddd();
   */
  removeVariableDeclaration(): Visitor {
    console.log('移除逗号赋值表达式')
    return {
      VariableDeclaration(path) {
        let { kind, declarations } = path.node
        if (declarations.length > 1) {
          const newVariableDeclarations = declarations.map((d) => t.variableDeclaration(kind, [d]))
          path.replaceWithMultiple(newVariableDeclarations)
        }
      },
    }
  },

  /**
   * 移除逗号表达式
   * a = 1, b = ddd();
   * |
   * |
   * V
   * a = 1;
   * b = ddd();
   */
  removeSequenceExpression(): Visitor {
    console.log('移除逗号表达式')
    return {
      ExpressionStatement(path) {
        const { expression } = path.node
        if (!t.isSequenceExpression(expression)) return
        const body = expression.expressions.map((express) => t.expressionStatement(express))
        path.replaceInline(body)
      },
    }
  },

  /**
   * 计算二项式字面量
   * 1 + 2    "debu" + "gger"
   * |
   * |
   * V
   * 3        "debugger"
   */
  calcBinary(): Visitor {
    console.log('计算二项式字面量')
    return {
      BinaryExpression(path) {
        const { left, right } = path.node
        const hasIdentifier = [left, right].some((a) => t.isIdentifier(a))
        if (hasIdentifier) return
        if (t.isLiteral(left) && t.isLiteral(right)) {
          const { confident, value } = path.evaluate()
          confident && path.replaceWith(t.valueToNode(value))
          path.skip()
        }
      },
    }
  },

  /**
   * 计算布尔值
   * !![]     ![]
   * |
   * |
   * V
   * true     false
   */
  calcBoolean(): Visitor {
    console.log('计算布尔值')
    return {
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
    }
  },

  // /**
  //  * 替换变量赋值
  //  * var _0x272eba = _0x415777;
  //  * var a = _0x272eba["UYCgc"]
  //  * |
  //  * |
  //  * V
  //  * var a = _0x415777["UYCgc"]
  //  */
  // variableReplace(): Visitor {
  //   return {
  //     VariableDeclarator(path) {
  //       // 如果左右两边都是标识符,就只在当前作用域下替换
  //       if (t.isIdentifier(path.node.id) && t.isIdentifier(path.node.init)) {
  //         path.scope.rename(path.node.id.name, path.node.init.name)
  //       }
  //     },
  //   }
  // },

  /**
   * 平坦化代码
   * 针对"3|2|4|1|0"["split"]('|');
   */
  codeFlat(): Visitor {
    console.log('平坦化代码')
    return {
      SwitchStatement(path) {
        let forOrWhileStatementPath = path.findParent((p) => p.isForStatement() || p.isWhileStatement())
        if (!forOrWhileStatementPath) return

        let blockStatementPath = forOrWhileStatementPath.findParent((p) => p.isBlockStatement()) as NodePath<t.BlockStatement>
        if (!blockStatementPath) return

        let shufferString: string
        let shufferArr: string[] = []

        forOrWhileStatementPath.traverse({
          MemberExpression(path) {
            if (t.isStringLiteral(path.node.property, { value: 'split' })) {
              // path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'

              if (t.isStringLiteral(path.node.object)) {
                // path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'
                shufferString = path.node.object.value
                shufferArr = shufferString.split('|')
              }
            }
          },
        })

        if (shufferArr.length === 0) return

        let myArr: any
        path.node.cases.map((p) => {
          const val = (p.test as t.StringLiteral).value
          myArr[val] = p.consequent[0]
        })

        shufferArr.map((v) => {
          blockStatementPath.node.body.push(myArr[v])
        })

        // switch  BlockStatement  For or While
        path.parentPath.parentPath.remove()
        path.skip()
      },
    }
  },

  /**
   * 平坦化代码
   * 清除while循环
   */
  // replaceWhile() {
  //   return {
  //     WhileStatement: {
  //       exit: [
  //         function (path: NodePath<t.WhileStatement>) {
  //           var node = path.node
  //           if (!(t.isBooleanLiteral(node.test) || t.isUnaryExpression(node.test))) return
  //           if (!(node.test.prefix || node.test.value)) return
  //           if (!t.isBlockStatement(node.body)) return
  //           var body = node.body.body
  //           if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return
  //           var swithStm = body[0]
  //           var arrName = swithStm.discriminant.object.name
  //           var argName = swithStm.discriminant.property.argument.name
  //           let arr = []
  //           let all_presibling = path.getAllPrevSiblings()
  //           all_presibling.forEach((pre_path) => {
  //             const { declarations } = pre_path.node
  //             let { id, init } = declarations[0]
  //             if (arrName == id.name) {
  //               arr = init.callee.object.value.split('|')
  //               pre_path.remove()
  //             }
  //             if (argName == id.name) {
  //               pre_path.remove()
  //             }
  //           })
  //           var caseList = swithStm.cases
  //           var resultBody = []
  //           arr.map((targetIdx) => {
  //             var targetBody = caseList[targetIdx].consequent
  //             if (t.isContinueStatement(targetBody[targetBody.length - 1])) targetBody.pop()
  //             resultBody = resultBody.concat(targetBody)
  //           })
  //           path.replaceInline(resultBody)
  //         },
  //       ],
  //     },
  //   }
  // },

  /**
   * 字面量替换 将字符串和数值常量直接替换对应的变量引用地方
   * let a = '1'
   * let b = a
   * |
   * |
   * V
   * let b = '1'
   */
  replaceLiteral(): Visitor {
    console.log('字面量替换')
    return {
      // @ts-ignore
      'AssignmentExpression|VariableDeclarator'(path: NodePath<t.AssignmentExpression> | NodePath<t.VariableDeclarator>) {
        let name, initValue
        if (path.isAssignmentExpression()) {
          name = (path.node.left as t.Identifier).name
          initValue = path.node.right
        } else {
          name = (path.node.id as t.Identifier).name
          initValue = path.node.init
        }

        if (t.isStringLiteral(initValue) || t.isNumericLiteral(initValue)) {
          const binding = path.scope.getBinding(name)
          if (binding && binding.constant && binding.constantViolations.length == 0) {
            for (let i = 0; i < binding.referencePaths.length; i++) {
              binding.referencePaths[i].replaceWith(initValue)
            }
          }
        }
      },
    }
  },

  /**
   * 	清理无用变量与函数
   */
  removeUnusedValue(): Visitor {
    console.log('清理无用变量与函数')
    return {
      VariableDeclarator(path) {
        const { id, init } = path.node
        if (!(t.isLiteral(init) || t.isObjectExpression(init) || t.isFunctionExpression(init))) return
        const binding = path.scope.getBinding((id as t.Identifier).name)
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
    }
  },

  /**
   * 清理死代码
   * if(false){
   *  ...
   * }
   */
  clearDeadCode(): Visitor {
    console.log('清理死代码')
    return {
      IfStatement(path) {
        function clear(path: NodePath<t.IfStatement>, toggle: any) {
          if (toggle) {
            if (t.isBlockStatement(path.node.consequent)) {
              path.replaceWithMultiple(path.node.consequent.body)
            } else {
              path.replaceWith(path.node.consequent)
            }
          } else {
            if (path.node.alternate) {
              if (t.isBlockStatement(path.node.alternate)) {
                path.replaceWithMultiple(path.node.alternate.body)
              } else {
                path.replaceWith(path.node.alternate)
              }
            } else {
              path.remove()
            }
          }
        }

        if (t.isBinaryExpression(path.node.test)) {
          const { left, right, operator } = path.node.test
          if (t.isLiteral(left) && t.isLiteral(right)) {
            const leftVal = JSON.stringify((left as BNSLiteral).value)
            const rightVal = JSON.stringify((right as BNSLiteral).value)
            clear(path, eval(leftVal + operator + rightVal))
          }
        } else if (t.isLiteral(path.node.test)) {
          clear(path, eval(JSON.stringify((path.node.test as BNSLiteral).value)))
        }
      },
    }
  },

  /**
   * a = m?11:22;
   *  |
   *  |
   *  V
   * m ? a = 11 : a = 22;
   */
  transCondition(): Visitor {
    return {
      ConditionalExpression(path) {
        let { test, consequent, alternate } = path.node
        const ParentPath = path.parentPath
        if (ParentPath.isAssignmentExpression()) {
          let { operator, left } = ParentPath.node
          if (operator === '=') {
            consequent = t.assignmentExpression('=', left, consequent)
            alternate = t.assignmentExpression('=', left, alternate)
            ParentPath.replaceWith(t.conditionalExpression(test, consequent, alternate))
          }
        }
      },
    }
  },

  /**
   *  赋值三元表达式转换成if
   *  var a = m ? 11 : 22;;
   *  |
   *  |
   *  V
   * if (m) {
   *   a = 11;
   * } else {
   *   a = 22;
   * }
   */
  conditionVarToIf(): Visitor {
    console.log('赋值三元表达式转换成if')
    return {
      VariableDeclaration(path) {
        if (t.isForStatement(path.parentPath)) return
        var declarations = path.node.declarations
        var rpls = []
        var togg = false
        for (const declaration of declarations) {
          if (t.isConditionalExpression(declaration.init)) {
            togg = true
            let { test, consequent, alternate } = declaration.init
            rpls.push(
              t.ifStatement(
                test,
                t.blockStatement([t.variableDeclaration(path.node.kind, [t.variableDeclarator(declaration.id, consequent)])]),
                t.blockStatement([t.variableDeclaration(path.node.kind, [t.variableDeclarator(declaration.id, alternate)])]),
              ),
            )
          } else {
            rpls.push(t.variableDeclaration(path.node.kind, [declaration]))
          }
        }
        if (togg) {
          path.replaceWithMultiple(rpls)
          path.stop()
        }
      },
    }
  },

  /**
   * 清理十六进制编码
   * ['\x49\x63\x4b\x72\x77\x70\x2f\x44\x6c\x67\x3d\x3d',0x123];
   * |
   * |
   * V
   * ["IcKrwp/Dlg==", 291];
   */
  deleteExtra(): Visitor {
    console.log('清理十六进制编码')
    return {
      StringLiteral(path) {
        delete path.node.extra
      },
      NumericLiteral(path) {
        delete path.node.extra
      },
    }
  },

  /**
   * 给关键代码|标识符 添加注释 TOLOOK
   */
  addComments(keyWords: string[] = []): Visitor {
    keyWords = keyWords.map((k) => k.toLowerCase())
    console.log(`添加关键字注释:${keyWords}`)

    return {
      DebuggerStatement(path) {
        path.addComment('leading', ' TOLOOK', true)
      },
      CallExpression(path) {
        if (!['setTimeout', 'setInterval'].includes((path.node.callee as t.Identifier).name)) return
        path.addComment('leading', ' TOLOOK', true)
      },
      StringLiteral(path) {
        if (keyWords.includes(path.node.value.toLowerCase())) {
          let statementPath = path.findParent((p) => p.isStatement())
          if (statementPath) {
            statementPath.addComment('leading', ' TOLOOK', true)
          } else {
            path.addComment('leading', ' TOLOOK', true)
          }
        }
      },
      Identifier(path) {
        let name = path.node.name
        if (keyWords.includes(name.toLowerCase())) {
          let statementPath = path.findParent((p) => p.isStatement())
          if (statementPath) {
            statementPath.addComment('leading', ' TOLOOK', true)
          } else {
            path.addComment('leading', ' TOLOOK', true)
          }
        }
      },
    }
  },

  addCatchLog(): Visitor {
    console.log('添加移除捕获输出')
    return {
      CatchClause(path) {
        const err_name = (path.node.param as t.Identifier).name
        path.node.body.body.unshift({
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'console',
              },
              property: {
                type: 'Identifier',
                name: 'log',
              },
            },
            arguments: [
              {
                type: 'StringLiteral',
                value: 'CatchClause',
              },
              {
                type: 'Identifier',
                name: err_name,
              },
            ],
          },
        })
      },
    }
  },
}

export type Visitorar = typeof visitorar
