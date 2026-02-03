import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import { getPropName } from '../ast-utils'

export type Objects = Record<`${string}_${string}`, t.ObjectExpression>

/**
 * 保存代码中所有对象用于后续替换
 * @deprecated 该函数已弃用，请使用其他方式处理对象合并与替换
 * @example
 * var r = {
 *   "PzXHf": "0|2|4|3|1",
 *   "LeQrV": function (n, t) {
 *     return n(t);
 *   }
 * }
 * r["wPpOS"]: "webgl"
 * ⬇️
 * var r = {
 *   "PzXHf": "0|2|4|3|1",
 *   "LeQrV": function (n, t) {
 *     return n(t);
 *   }
 *   "wPpOS": "webgl"
 * }
 *
 * //  全局变量状态会保存 r 对象
 * globalState.objects = {
 *   r = { ... }
 * }
 */
export function saveObjects(ast: t.Node) {
  const parents: {
    parentPath: NodePath<t.Node>
    objectName: string
  }[] = []

  const objects: Objects = {}

  traverse(ast, {
    VariableDeclaration: {
      exit(path, _state) {
        path.node.declarations.forEach((declaration) => {
          if (declaration.id.type === 'Identifier') {
            const objectName = declaration.id.name
            if (declaration.init?.type === 'ObjectExpression') {
              objects[`${declaration.start}_${objectName}`] = declaration.init

              // 在同作用域下将变量重命名 var u = e; ---> var e = e; 同时一并移除
              const binding = path.scope.getBinding(objectName)
              if (!(binding && binding.path.isVariableDeclarator() && binding.path.get('init')?.isObjectExpression())) return
              if (!binding.constant && binding.constantViolations.length === 0) return

              parents.push({
                parentPath: path.getStatementParent()!.parentPath,
                objectName,
              })
            }
          }
        })
      },
    },

  })

  /**
   * 合并对象  如果有相同 key 则覆盖
   * var a = {}
   * a["b"] = 123
   * ⬇️
   * var a = {
   *  "b": 123
   * }
   */
  traverse(ast, {
    AssignmentExpression: {
      exit(path) {
        const { left, right } = path.node
        if (left.type !== 'MemberExpression') return

        if (!t.isLiteral(left.property)) return

        if (!(
          t.isFunctionExpression(right)
          || t.isLiteral(right)
          || t.isIdentifier(right)
          || t.isBinaryExpression(right)
          || t.isObjectExpression(right)
        )) {
          return
        }

        const objectName = (left.object as t.Identifier).name

        // 在同作用域下将变量重命名 var u = e; ---> var e = e; 同时一并移除
        const binding = path.scope.getBinding(objectName)

        // 判断 原 object 是否为 var e = {}
        if (!(binding && binding.path.node.type === 'VariableDeclarator' && binding.path.node.init?.type === 'ObjectExpression')) return
        if (!binding.constant && binding.constantViolations.length === 0) return

        // 同时判断对象初始化的成员长度(避免不必要的替换),一般为空 {}
        // !!! 但是 后续填充的时候会更改原对象长度,这里可能需要做个缓存
        // if (binding.path.node.init.properties.length !== 0)
        //   return

        parents.push({
          parentPath: path.getStatementParent()!.parentPath,
          objectName,
        })

        const start = binding.identifier.start

        let isReplace = false
        try {
          const prop = t.objectProperty(left.property, right)
          if (objects[`${start}_${objectName}`]) {
            const keyIndex = objects[`${start}_${objectName}`].properties.findIndex((p) => {
              if (p.type === 'ObjectProperty') {
                const propName = getPropName(left.property)
                const keyName = getPropName(p.key)

                return propName === keyName
              }
              return false
            })
            if (keyIndex !== -1)
              objects[`${start}_${objectName}`].properties[keyIndex] = prop

            else
              objects[`${start}_${objectName}`].properties.push(prop)

            isReplace = true
          }
        }
        catch (_error: any) {
          throw new Error(`生成表达式失败${_error.message}`)
        }

        if (isReplace) {
          if (path.parentPath.type === 'SequenceExpression' || path.parentPath.type === 'ExpressionStatement')
            path.remove() // 移除自身赋值语句
        }

        path.skip()
      },
    },
  })

  parents.forEach(({ parentPath, objectName }) => {
    parentPath?.traverse({
      VariableDeclarator(p) {
        const { id, init } = p.node

        if (init && init.type === 'Identifier' && id.type === 'Identifier') {
          if (init.name === objectName) {
            p.scope.rename(id.name, objectName)
            // !!! 移除后 再次解析会导致 start 定位变更, 致使后续对象替换失效, 因此执行替换前不要执行 reParse
            p.parentPath.remove()
          }
        }
      },
    })
  })

  return objects
}
