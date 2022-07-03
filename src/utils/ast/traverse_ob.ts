import generator from '@babel/generator'
import { ParseResult } from '@babel/parser'
import traverse, { NodePath, Visitor } from '@babel/traverse'
import * as t from '@babel/types'
import _ from 'lodash'

export class Traverse_ob {
  public decFunction: { list: string[]; index: number } = {
    list: [],
    index: 0,
  }
  public totalObj: any[] = []

  /**
   * 根据大数组作用域寻找解密函数
   */
  findDecFuncByBigArr(ast: ParseResult<t.File>, isRemoveArr: boolean = false) {
    let decFuncCode: string = ''
    let decFuncList: string[] = []
    let bigArrReferencePaths: NodePath<t.Node | any>[] = []
    let bigArrName: string = ''

    {
      // 寻找大数组 var _0x34ba = ['1','2', ...]
      const visitor_findBigArr: Visitor = {
        ArrayExpression(path) {
          const node = path.node as t.ArrayExpression
          if (node.elements.length > 100) {
            // 大数组长度超过100，则认为是解密函数存放的字符串
            const parentPath = path.findParent((p) => p.isVariableDeclaration() || p.isExpressionStatement()) as NodePath<t.VariableDeclaration | t.ExpressionStatement>

            if (t.isVariableDeclaration(parentPath.node)) {
              bigArrName = (parentPath.node.declarations[0].id as t.Identifier).name
            } else if (t.isExpressionStatement(parentPath.node)) {
              bigArrName = ((parentPath.node.expression as t.AssignmentExpression).left as t.Identifier).name
            } else {
              path.skip()
              return
            }
            decFuncCode += generator(parentPath.node, { minified: true }).code
            bigArrReferencePaths.push(parentPath)
            path.skip()
          }
        },
      }
      // 寻找大数组名的作用域
      const visitor_findBigArrBinding: Visitor = {
        Program(path) {
          let binding = path.scope.getBinding(bigArrName)

          let lastPath: NodePath<t.Node> = null
          binding?.referencePaths.map((p) => {
            let groundParent: NodePath<t.Node>
            let decFuncName: string = ''

            if (p.parentPath.isCallExpression()) {
              groundParent = p.getStatementParent()
            } else {
              groundParent =
                p.findParent((p) => p.isFunctionDeclaration()) || (p.findParent((p) => p.isFunctionExpression())?.findParent((p) => p.isVariableDeclaration()) as NodePath<t.VariableDeclaration>)
              // 一般就为解密函数位置
              if (groundParent.isFunctionDeclaration()) {
                decFuncName = (groundParent.node.id as t.Identifier).name
              } else if (groundParent.isVariableDeclaration()) {
                decFuncName = (groundParent.node.declarations[0].id as t.Identifier).name
              }
            }
            const hasSameLocation = lastPath && lastPath.node.loc.start.line === groundParent.node.loc.start.line
            if (groundParent && !hasSameLocation) {
              lastPath = groundParent
              decFuncCode += generator(groundParent.node, { minified: true }).code
              bigArrReferencePaths.push(groundParent)
            }

            if (decFuncName) {
              decFuncList.push(decFuncName)
            }
          })
          path.skip()
        },
      }

      traverse(ast, visitor_findBigArr) // 寻找大数组
      traverse(ast, visitor_findBigArrBinding) // 寻找大数组的作用域代码(包括解密函数),并添加到decFuncCode
    }

    if (!decFuncCode) return

    // 执行解密函数的代码，这样就可以在 nodejs 中运行解密函数来还原数据
    try {
      console.log(`大数组名为: ${bigArrName} `)
      console.log(`解密函数为: ${decFuncList.join(',')}`)
      console.log(`解密函数代码为: ${decFuncCode}`)
      global.eval(decFuncCode)
    } catch (e) {
      console.log(e)
    }

    /**
     * 执行数组乱序与解密函数代码并将混淆字符串数值还原
     * _0x4698(_0x13ee81 - -674, _0x3dfa50)
     * |
     * |
     * V
     * 原始字符串
     */
    const visitor_decString: Visitor = {
      VariableDeclarator(path) {
        if (decFuncList.includes((path.node.id as t.Identifier).name)) {
          // 有可能存在多个解密函数，所以需要遍历
          let decFuncName = decFuncList.find((f) => f === (path.node.id as t.Identifier).name)
          let binding = path.scope.getBinding(decFuncName)

          binding?.referencePaths.map((p) => {
            if (!p.parentPath.isCallExpression()) return

            try {
              // 如果调用解密函数中有变量参数则不替换
              let hasIdentifier = p.parentPath.node.arguments.some((a) => t.isIdentifier(a))
              if (hasIdentifier) return

              let callCode = p.parentPath.toString()
              let decStr = eval(callCode)
              console.log(callCode, decStr) // 输出解密函数的调用代码和解密后的字符串
              p.parentPath.replaceWith(t.stringLiteral(decStr))
            } catch (error: any) {
              // 解密失败 则添加注释  失败原因可能是该函数未调用
              p.addComment('leading', '解密失败' + error.message, true)
            }
          })
        }
      },
    }

    traverse(ast, visitor_decString) // 遇到解密函数则执行解密函数,并替换为解密后的字符串

    if (isRemoveArr) {
      bigArrReferencePaths.map((p) => {
        p.remove()
      })
    }
  }

  /**
   *  函数花指令去除
   *  var _0x2c9199 = function(a, b, c, d, f) {
   *        return _0x4698(b - 2, a); // 其中_0x4698通常为解密函数
   *  };
   *  var _0x349504 = _0x5bd094[_0x2c9199(1, 2, 3, 4, 5)];
   *  |
   *  |
   *  V
   *  var _0x349504 = _0x5bd094[_0x4698(0, 1)];
   */
  flowerCodeFunc(ast: ParseResult<t.File>) {
    const visitor_flowerCodeFunc: Visitor = {
      VariableDeclarator(path) {
        if (!t.isFunctionExpression(path.node.init)) return

        const retStmt = path.node.init.body.body?.[0]
        if (!(retStmt?.type === 'ReturnStatement')) return

        const funcExpr = path.node.init
        const orginalFuncExpr = _.cloneDeep(funcExpr)
        const funcExprPath = path.get('init')
        const retStmtArgs1Path = (path.get('init.body.body') as NodePath<t.Node>[])?.[0].get('argument') as NodePath<t.Node>
        const funcName = (path.node.id as t.Identifier).name

        // 找到父函数
        var fnPath = path.getFunctionParent() || path.scope.path
        fnPath.traverse({
          CallExpression(_path) {
            if (!t.isIdentifier(_path.node.callee)) return

            const callFuncName = _path.node.callee.name
            const args = _path.node.arguments
            const params = funcExpr.params

            if (callFuncName !== funcName) return

            // 实参有变量则不替换
            let hasIdentifier = args.some((a) => t.isIdentifier(a))
            if (hasIdentifier) return

            // 实参有可能小于形参 所以遍历实参
            for (let i = 0; i < args.length; i++) {
              let paramName = (params[i] as t.Identifier).name
              let argumentName

              if (t.isUnaryExpression(args[i])) {
                argumentName = (args[i] as t.UnaryExpression).operator + ((args[i] as t.UnaryExpression).argument as t.NumericLiteral).value
              } else {
                argumentName = (args[i] as t.NumericLiteral).value
              }
              argumentName = `'${argumentName}'` // 重命名只能是字符串

              // 将形参变为传入的实参并指定作用域内(作用域非常重要,不然无法rename)
              funcExprPath.scope.rename(paramName, argumentName)
              // var _0x2c9199 = function ('1', '2', '3', '4', '5') {
              //   return _0x4698('2' - 2, '1');
              // };
            }

            if (retStmtArgs1Path) {
              let code = retStmtArgs1Path.toString()
              _path.replaceWithSourceString(code)
            }

            // 一定要将混淆函数还原成原始状态 因为后续有可能还有用到该函数
            path.node.init = orginalFuncExpr
          },
        })
      },
    }

    traverse(ast, visitor_flowerCodeFunc)
    console.log('函数花指令去除完成')
  }

  /**
   *  合并对象
   *  var _0xb28de8 = {};
   *  _0xb28de8["abcd"] = function(_0x22293f, _0x5a165e) {
   *      return _0x22293f == _0x5a165e;
   *  };
   *  _0xb28de8["bbb"] = "eee";
   *  |
   *  |
   *  V
   *  var _0xb28de8 = {
   *    "abcd": function (_0x22293f, _0x5a165e) {
   *      return _0x22293f == _0x5a165e;
   *    },
   *    "bbb": "eee"
   *  }
   */
  mergeObj(ast: ParseResult<t.File>) {
    const visitor_mergeObj: Visitor = {
      VariableDeclarator: {
        exit: function (path) {
          const { id, init } = path.node
          if (!t.isObjectExpression(init)) return

          let name = (id as t.Identifier).name
          let properties = init.properties
          let scope = path.scope
          let binding = scope.getBinding(name)
          if (!binding || binding.constantViolations.length > 0) return

          scope.traverse(scope.block, {
            AssignmentExpression: function (_path) {
              const left = _path.get('left')
              const right = _path.get('right')
              if (!left.isMemberExpression()) return
              const object = left.get('object')
              const property = left.get('property')
              function replaceFunc(_path: NodePath<t.Node>, left: NodePath<t.Expression>) {
                if (t.isVariableDeclarator(_path.parentPath.node) || t.isAssignmentExpression(_path.parentPath.node)) {
                  _path.replaceWith(left)
                } else {
                  _path.remove()
                }
              }
              if (object.isIdentifier({ name: name }) && property.isStringLiteral() && _path.scope == scope) {
                properties.push(t.objectProperty(t.valueToNode(property.node.value), right.node))
                replaceFunc(_path, left)
              }
              if (object.isIdentifier({ name: name }) && property.isIdentifier() && _path.scope == scope) {
                properties.push(t.objectProperty(t.valueToNode(property.node.name), right.node))
                replaceFunc(_path, left)
              }
            },
          })

          binding.referencePaths.map(function (refer_path) {
            try {
              let bindpath = refer_path.parentPath
              if (!t.isVariableDeclarator(bindpath.node)) return
              let bindname = (bindpath.node.id as t.Identifier).name
              bindpath.scope.rename(bindname, name, bindpath.scope.block)
              // bindpath.remove()
            } catch (e) {}
          })
        },
      },
    }

    traverse(ast, visitor_mergeObj)
    console.log('对象合并完成')
  }

  /**
   *  对象花指令去除
   *  var _0xb28de8 = {
   *      "abcd": function(_0x22293f, _0x5a165e) {
   *          return _0x22293f == _0x5a165e;
   *      },
   *      "dbca": function(_0xfbac1e, _0x23462f, _0x556555) {
   *          return _0xfbac1e(_0x23462f, _0x556555);
   *      },
   *      "aaa": function(_0x57e640) {
   *          return _0x57e640();
   *      },
   *      "bbb": "eee"
   *  };
   *  var aa = _0xb28de8["abcd"](123, 456);
   *  var bb = _0xb28de8["dbca"](bcd, 11, 22);
   *  var cc = _0xb28de8["aaa"](dcb);
   *  var dd = _0xb28de8["bbb"];
   *  |
   *  |
   *  V
   *  var aa = 123 == 456;
   *  var bb = bcd(11, 22);
   *  var cc = dcb();
   *  var dd = "eee";
   */
  flowerCodeObj(ast: ParseResult<t.File>) {
    const visitor_flowerCodeObj: Visitor = {
      VariableDeclarator: {
        exit: function (path) {
          if (!t.isObjectExpression(path.node.init)) return

          const properties = path.node.init.properties
          if (properties.length === 0) return

          const totalObj: any = {}
          const objName = (path.node.id as t.Identifier).name

          // 遍历所有属性,添加到totalObj对象中
          properties.map(function (prop) {
            // 如果是扩展运算符...({}) 则跳过
            if (t.isSpreadElement(prop)) return

            if (t.isObjectProperty(prop)) {
              // 保证key为字符串
              if (!t.isStringLiteral(prop.key)) return

              const key = prop.key.value
              if (t.isFunctionExpression(prop.value)) {
                // value为函数的情况
                const retStmt = prop.value.body.body?.[0]
                if (!(retStmt.type === 'ReturnStatement')) return

                let repfunc: (...args: any) => void = () => {}
                if (t.isBinaryExpression(retStmt.argument)) {
                  repfunc = function (_path: NodePath<t.Node>, args: t.Literal[]) {
                    if (args.length == 2) {
                      const binExpr = t.binaryExpression((retStmt.argument as t.BinaryExpression).operator, args[0], args[1])
                      _path.replaceWith(binExpr)
                    }
                  }
                } else if (t.isLogicalExpression(retStmt.argument)) {
                  repfunc = function (_path: NodePath<t.Node>, args: t.Literal[]) {
                    if (args.length == 2) {
                      const logicExpr = t.logicalExpression((retStmt.argument as t.LogicalExpression).operator, args[0], args[1])
                      _path.replaceWith(logicExpr)
                    }
                  }
                } else if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee)) {
                  repfunc = function (_path: NodePath<t.Node>, args: t.Literal[]) {
                    const callFuncName = ((retStmt.argument as t.CallExpression).callee as t.Identifier).name
                    const callIndex = (prop.value as t.FunctionExpression).params.findIndex((a) => (a as t.Identifier).name === callFuncName)
                    const argFunc = args.splice(callIndex, 1)[0]
                    const callExpr = t.callExpression(argFunc, args)
                    _path.replaceWith(callExpr)
                  }
                } else {
                  return
                }
                totalObj[key] = repfunc
              } else if (t.isStringLiteral(prop.value)) {
                // value为String字面量的情况
                const value = prop.value.value
                totalObj[key] = function (_path: NodePath<t.Node>) {
                  _path.replaceWith(t.stringLiteral(value))
                }
              }
            }
          })
          // 找到父函数
          var fnPath = path.getFunctionParent() || path.scope.path
          fnPath.traverse({
            MemberExpression(_path) {
              const { object, property } = _path.node

              if (!t.isIdentifier(object) || object.name !== objName) return

              let replaceFunc = null
              if (t.isStringLiteral(property)) {
                replaceFunc = totalObj[property.value]
              } else if (t.isIdentifier(property)) {
                replaceFunc = totalObj[property.name]
              } else {
                return
              }

              replaceFunc?.(_path)
            },
            CallExpression(_path) {
              if (!t.isMemberExpression(_path.node.callee)) return

              const { object, property } = _path.node.callee

              if (!t.isIdentifier(object) || object.name !== objName) return
              if (!(t.isStringLiteral(property) || t.isIdentifier(property))) return

              let replaceFunc = null
              if (t.isStringLiteral(property)) {
                replaceFunc = totalObj[property.value]
              } else if (t.isIdentifier(property)) {
                replaceFunc = totalObj[property.name]
              } else {
                return
              }

              const args = _path.node.arguments
              replaceFunc?.(_path, args)
            },
          })
        },
      },
    }

    traverse(ast, visitor_flowerCodeObj)
    console.log('对象花指令去除完毕')
  }

  /**
   * 并根据函数调用次数来判断是否为解密函数
   */
  findDecFuncByCount(ast: ParseResult<t.File>, decFuncCallCount: number) {
    let decFuncCode: string = ''
    let decFuncList: string[] = []
    let bigArrName: string = ''

    const visitor_findDecFunc: Visitor = {
      Program(p) {
        p.traverse({
          // @ts-ignore
          'FunctionDeclaration|VariableDeclarator'(path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclarator>) {
            if (!(t.isFunctionDeclaration(path.node) || t.isFunctionExpression(path.node.init))) return

            let name = (path.node.id as t.Identifier).name
            // 如果是浏览器系统的函数,如atob,则找不到定义的地方
            if (['atob'].includes(name)) {
              return
            }

            let binding = path.scope.getBinding(name)
            if (!binding) return

            // 根据调用次数判断解密函数,具体可根据实际情况来判断
            if (binding.referencePaths.length > decFuncCallCount) {
              let binding = p.scope.getBinding(name)
              if (!binding) return

              // 找到上级函数
              let parent = binding.path.findParent((_p) => _p.isFunctionDeclaration() || _p.isVariableDeclaration())
              if (!parent) return
              let body = (p.scope.block as t.Program).body
              for (let i = 0; i < body.length; i++) {
                const node = body[i]
                if (node.start == parent.node.start) {
                  decFuncList.push(name)
                  decFuncCode += generator(node, { minified: true }).code
                  break
                }
              }
              // 遍历完当前节点,就不再往子节点遍历
              path.skip()
            }
          },
        })
      },
    }

    traverse(ast, visitor_findDecFunc)
    // console.log("找到解密函数!")
  }
}
