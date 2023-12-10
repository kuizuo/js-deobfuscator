import type * as t from '@babel/types'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import type { Transform } from '../transforms'

export default {
  name: '通过字符串数组找解密器',
  run(ast, state, count) {
    // 大数组 有可能是以函数形式包裹的
    let stringArray: NodePath
    // 乱序函数
    const shufferFns: NodePath[] = []
    // 解密器
    const decoders: NodePath[] = []

    traverse(ast, {
      ArrayExpression(path) {
        if (path.node.elements.length >= (count || 50)) {
          // 字符串数组定义位置 var a = [] 或 a = [] 或 function a(){ return []}
          const stringArrayDeclaration = path.findParent(p => p.isVariableDeclarator() || p.isFunctionDeclaration() || p.isExpressionStatement())

          if (!stringArrayDeclaration)
            return

          // if (!stringArrayDeclaration?.parentPath?.isProgram())
          // return

          stringArray = stringArrayDeclaration

          let bigArrName = ''
          if (stringArray.isVariableDeclarator()) {
            bigArrName = (stringArray.node.id as t.Identifier).name
          }
          else if (stringArray.isFunctionDeclaration()) {
            bigArrName = (stringArray.node.id as t.Identifier).name
          }
          else if (stringArray.isExpressionStatement()) {
            if (stringArray.node.expression.type === 'AssignmentExpression')
              bigArrName = (stringArray.node.expression.left as t.Identifier).name
          }

          const binding = path.scope.getBinding(bigArrName)
          if (!binding) return

          // 通过引用 找到 数组乱序代码 与 解密函数代码
          binding.referencePaths.forEach((r) => {
            if (r.parentKey === 'object') {
              // 找到大数组所调用位置,继续向上找,大概率就是解密函数
              const parent = r.findParent(p => p.isFunctionDeclaration() || p.isFunctionExpression())
              if (parent)
                decoders.push(parent)

              return
            }

            // 以参数传入,大概率乱序函数
            if (r.parentKey === 'arguments') {
              const parent = r.findParent(p => p.isExpressionStatement())
              if (parent)
                shufferFns.push(parent)
            }
          })
        }

        path.skip()
      },
    })

    return {
      stringArray,
      shufferFns,
      decoders,
    }
  },

} satisfies Transform<number>
