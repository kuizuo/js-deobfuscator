import type { Transform } from '../ast-utils'
import type { Objects } from './save-objects'
// @ts-nocheck
import generate from '@babel/generator'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import { getPropName } from '../ast-utils'

/**
 * 对象属性替换 需要先执行 saveAllObject 用于保存所有变量
 * @example
 * var r = {
 *   "PzXHf": "0|2|4|3|1",
 *   "LeQrV": function (n, t) {
 *     return n(t);
 *   }
 * }
 *
 * var u = r["PzXHf"]["split"]("|");
 * r["LeQrV"](_0x3028, "foo");
 * ⬇️
 * var u = "0|2|4|3|1"["split"]("|");
 * _0x3028("foo")
 */
export default {
  name: 'inline-object-properties',
  tags: ['safe'],
  run(ast, state, objects) {
    if (!objects) return

    const usedMap = new Map()
    const usedObjects: Record<any, any> = {}

    /**
     * 字面量花指令还原
     * r["PzXHf"] ---> "0|2|4|3|1"
     */
    traverse(ast, {
      MemberExpression(path) {
        // 父级表达式不能是赋值语句
        const asignment = path.parentPath
        if (!asignment || asignment?.type === 'AssignmentExpression')
          return

        const { object, property } = path.node
        if (object.type === 'Identifier' && (property.type === 'StringLiteral' || property.type === 'Identifier')) {
          const objectName = object.name

          // 找到 objectName 的定义位置
          const binding = path.scope.getBinding(objectName)
          if (!binding)
            return

          const start = binding.identifier.start

          const propertyName = getPropName(property)

          if (objects[`${start}_${objectName}`]) {
            const objectInit = objects[`${start}_${objectName}`]

            const properties = objectInit.properties
            for (const prop of properties) {
              if (prop.type === 'ObjectProperty') {
                const keyName = getPropName(prop.key)
                if (
                  (prop.key.type === 'StringLiteral'
                    || prop.key.type === 'Identifier')
                  && keyName === propertyName
                  && t.isLiteral(prop.value)
                ) {
                  // 还需要判断 objectName[propertyName] 是否被修改过
                  const binding = path.scope.getBinding(objectName)
                  if (binding && binding.constant && binding.constantViolations.length === 0) {
                    // 针对一些特殊代码不进行处理 如 _0x52627b["QqaUY"]++
                    if (path.parent.type === 'UpdateExpression')
                      return

                    usedMap.set(`${objectName}.${propertyName}`, generate(prop.value))

                    usedObjects[objectName] = usedObjects[objectName] || new Set()
                    usedObjects[objectName].add(propertyName)

                    path.replaceWith(prop.value)
                  }
                }
              }
            }
          }
        }
      },
    })

    /**
     * 函数花指令还原
     * r["LeQrV"](_0x3028, "foo");  --->  _0x3028("foo");
     */
    traverse(ast, {
      CallExpression(path) {
        const { callee } = path.node
        if (callee.type === 'MemberExpression' && callee.object.type === 'Identifier') {
          const objectName = callee.object.name
          const propertyName = getPropName(callee.property)

          // 找到 objectName 的定义位置
          const binding = path.scope.getBinding(objectName)
          if (!binding)
            return

          const start = binding.identifier.start

          if (objects[`${start}_${objectName}`]) {
            const objectInit = objects[`${start}_${objectName}`]

            const properties = objectInit.properties

            // 实际传递参数
            const argumentList = path.node.arguments

            for (const prop of properties) {
              if (prop.type !== 'ObjectProperty')
                continue

              const keyName = getPropName(prop.key)

              if (
                (prop.key.type === 'StringLiteral'
                  || prop.key.type === 'Identifier')
                && prop.value.type === 'FunctionExpression'
                && keyName === propertyName
              ) {
                // 拿到定义函数
                const orgFn = prop.value

                // 在原代码中，函数体就一行 return 语句，取出其中的 argument 属性与调用节点替换
                const firstStatement = orgFn.body.body?.[0]
                if (firstStatement?.type !== 'ReturnStatement') return

                // 返回参数
                const returnArgument = firstStatement.argument

                let isReplace = false
                if (t.isBinaryExpression(returnArgument)) {
                  // _0x5a2810 + _0x2b32f4
                  if (t.isExpression(argumentList[0]) && t.isExpression(argumentList[1])) {
                    const binaryExpression = t.binaryExpression(
                      returnArgument.operator,
                      argumentList[0],
                      argumentList[1],
                    )
                    path.replaceWith(binaryExpression)
                    isReplace = true
                  }
                }
                else if (t.isLogicalExpression(returnArgument)) {
                  // _0x5a2810 || _0x2b32f4
                  if (t.isExpression(argumentList[0]) && t.isExpression(argumentList[1])) {
                    const logicalExpression = t.logicalExpression(
                      returnArgument.operator,
                      argumentList[0],
                      argumentList[1],
                    )
                    path.replaceWith(logicalExpression)
                    isReplace = true
                  }
                }
                else if (t.isUnaryExpression(returnArgument)) {
                  // !_0x5a2810
                  if (t.isExpression(argumentList[0])) {
                    const unaryExpression = t.unaryExpression(
                      returnArgument.operator,
                      argumentList[0],
                    )
                    path.replaceWith(unaryExpression)
                    isReplace = true
                  }
                }
                else if (t.isCallExpression(returnArgument)) {
                  // function (_0x1d0a4d, _0x1df411) {
                  //   return _0x1d0a4d();
                  // }

                  // 取出是哪个参数作为函数名来调用 因为可能会传递多个参数，取其中一个或几个
                  // 确保调用函数名必须是标识符才替换
                  if (returnArgument.callee.type !== 'Identifier')
                    return

                  const callFnName = returnArgument.callee.name // 形参的函数名

                  // 找到从传递的多个参数中 定位索引
                  const callIndex = orgFn.params.findIndex(
                    a => t.isIdentifier(a) && a.name === callFnName,
                  )

                  // 再从实际参数(实参)中找到真正函数名
                  const realFnName = argumentList.splice(callIndex, 1)[0]
                  if (t.isExpression(realFnName) || t.isV8IntrinsicIdentifier(realFnName)) {
                    const callExpression = t.callExpression(
                      realFnName,
                      argumentList,
                    )
                    path.replaceWith(callExpression)
                    isReplace = true
                  }
                }

                if (isReplace) {
                  usedMap.set(`${objectName}.${propertyName}`, generate(orgFn))

                  usedObjects[objectName] = usedObjects[objectName] || new Set()
                  usedObjects[objectName].add(propertyName)
                }
              }
            }
          }
        }
      },
    })

    const removeSet = new Set()

    /**
     * 移除已使用过的 property(key)
     * var _0x52627b = {
     *  'QqaUY': "attribute",
     *  SDgrw: "123"
     * }
     * _0x52627b["QqaUY"]
     * 🔽
     * var _0x52627b = {
     *  SDgrw: "123"
     * }
     * "attribute"
     */
    if (Object.keys(usedObjects).length > 0) {
      traverse(ast, {
        ObjectProperty(path) {
          let objectName = ''

          const parentPath = path.parentPath.parentPath

          if (!parentPath) return

          if (parentPath?.isAssignmentExpression())
            objectName = (parentPath.node.left as t.Identifier).name

          else if (parentPath.isVariableDeclarator())
            objectName = (parentPath.node.id as t.Identifier).name

          if (!objectName) return

          const propertyName = getPropName(path.node.key)

          if (usedObjects[objectName]?.has(propertyName)) {
            path.remove()
            removeSet.add(`${objectName}.${propertyName}`)
          }
        },
      })
    }

    if (usedMap.size > 0)
      console.log('Replaced objects:', usedMap)

    if (removeSet.size > 0)
      console.log('Removed keys:', removeSet)
  },
} satisfies Transform<Objects>
