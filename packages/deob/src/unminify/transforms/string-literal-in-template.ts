import type { Transform } from '../../ast-utils'
import * as t from '@babel/types'
import { escapeTemplateLiteral } from '../../ast-utils'

function joinRaw(left: string, right: string): string {
  // Joining two chunks can create an interpolation or an octal escape.
  if (left.endsWith('$') && right.startsWith('{'))
    return `${left}\\${right}`
  if (left.endsWith('\\0') && /^\d/.test(right)) {
    const digit = right.charCodeAt(0).toString(16)
    return `${left}\\x${digit}${right.slice(1)}`
  }
  return left + right
}

export default {
  name: 'string-literal-in-template-literal',
  tags: ['safe'],
  visitor: () => ({
    TemplateLiteral(path) {
      if (path.parentPath.isTaggedTemplateExpression({ quasi: path.node })) return

      // inline string literals in template literals
      // e.g. `Hello ${'World'}!` -> `Hello World!`
      for (let i = 0; i < path.node.expressions.length; i++) {
        const expr = path.node.expressions[i]
        if (t.isStringLiteral(expr)) {
          path.node.expressions.splice(i, 1)
          const main = path.node.quasis[i]
          const next = path.node.quasis[i + 1]
          const raw = joinRaw(main.value.raw, escapeTemplateLiteral(expr.value))
          main.value.raw = joinRaw(raw, next.value.raw)
          main.tail = next.tail
          path.node.quasis.splice(i + 1, 1)

          this.changes++
          i--
        }
      }
    },
  }),
} satisfies Transform
