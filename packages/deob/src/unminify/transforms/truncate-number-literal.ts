import type { Transform } from '../../ast-utils'
import * as m from '@codemod/matchers'

export default {
  name: 'truncate-number-literal',
  tags: ['safe'],
  visitor: () => {
    const binaryOperators = m.or('|', '&', '^', '<<', '>>', '>>>')
    const literal = m.capture(m.numericLiteral())
    const matcher = m.or(
      m.binaryExpression(binaryOperators, literal, m.anything()),
      m.binaryExpression(binaryOperators, m.anything(), literal),
    )

    return {
      BinaryExpression: {
        exit(path) {
          if (!matcher.match(path.node)) return

          const value = literal.current!.value

          const isShifter
            = literal.current! === path.node.right
              && (path.node.operator === '<<' || path.node.operator === '>>')
          const truncation = isShifter ? 31 : 0xFFFFFFFF
          const truncated = value & truncation

          if (truncated === value) return

          literal.current!.value = truncated
        },
      },
    }
  },
} satisfies Transform
