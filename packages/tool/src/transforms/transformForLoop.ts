import * as t from '@babel/types'
import type { Transform } from '.'

/**
 * 将 for 初始化赋值前置
 * @example
 * for (a = 1, w = "2|1|2|3"["split"]("|"), void 0;;) {
 *   var a;
 *   var w;
 *   break;
 * }
 * 🔽
 * var a = 1;
 * var w = "2|1|2|3"["split"]("|")
 * for (void 0;;) {
 *    break;
 * }
 */
export default {
  name: '将 for 初始化赋值前置',
  visitor() {
    return {
      ForStatement(path) {
        if (path.node.init && path.node.init.type === 'SequenceExpression') {
          const expressions = path.node.init.expressions

          const toRemoveVariableDeclarators: string[] = []
          const declarations: t.VariableDeclaration[] = []
          expressions.forEach((expression, index) => {
            if (t.isAssignmentExpression(expression)) {
              if (expression.left.type === 'Identifier') {
                toRemoveVariableDeclarators.push(expression.left.name)

                declarations.push(
                  t.variableDeclaration('var', [
                    t.variableDeclarator(
                      t.identifier(expression.left.name),
                      expression.right,
                    ),
                  ]),
                )
              }
            }
          })

          path.node.init.expressions = path.node.init.expressions.filter((e) => {
            if (e.type === 'AssignmentExpression') {
              if (e.left.type === 'Identifier')
                return !toRemoveVariableDeclarators.includes(e.left.name)
            }
            else {
              return true
            }

            return false
          })

          // 必须要删除 后续的 var 会影响判断
          path.traverse({
            VariableDeclarator(p) {
              const name = (p.node.id as t.Identifier).name
              if (p.node.init === null) {
                if (toRemoveVariableDeclarators.includes(name))
                  p.remove()
              }
            },
          })

          path.insertBefore(declarations)
        }
      },
    }
  },
} satisfies Transform
