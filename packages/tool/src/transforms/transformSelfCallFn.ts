import type { Transform } from '.'

/**
 * 转化自调用函数
 * @example
 * !function() {
 *  a()
 * }();
 * ⬇️
 * {
 *   a()
 * }
 */
export default {
  name: '转化自调用函数',
  visitor() {
    return {
      ExpressionStatement(path) {
        const expression = path.node.expression
        if (
          expression.type === 'UnaryExpression'
                && expression.argument.type === 'CallExpression'
                && expression.argument.callee.type === 'FunctionExpression'
                && expression.argument.arguments.length === 0
        ) {
          path.replaceWith(expression.argument.callee.body)
          path.skip()
        }
      },
    }
  },
} satisfies Transform
