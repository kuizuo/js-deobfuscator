import * as t from '@babel/types'
import { getPropName } from '../utils/ast'
import type { Transform } from '.'

export interface Options {
  keywords: string[]
  label: string
}
/**
 * 给关键函数、标识符 设置注释
 * @example
 * debugger;
 * ⬇️
 * // TOLOOK
 * debugger;
 */
export default {
  name: '标记标识符',
  visitor(options: Options | undefined) {
    let { keywords, label } = options || { keywords: ['debugger'], label: ' TOLOOK' }

    const defaultKeywords = ['debugger']
    keywords = [
      ...new Set([...keywords.map(k => k.toLowerCase()), ...defaultKeywords]),
    ]

    return {
      DebuggerStatement(path) {
        // 如果已注释,则跳过
        const hasComment = path.node.leadingComments?.find(
          c => (c.value = label),
        )
        if (hasComment)
          return

        path.addComment('leading', label, true)
      },
      CallExpression(path) {
        if (t.isMemberExpression(path.node.callee)) {
          if (
            !['setTimeout', 'setInterval'].includes(
              getPropName(path.node.callee.property),
            )
          )
            return
          path.addComment('leading', label, true)
          return
        }

        if (t.isIdentifier(path.node.callee)) {
          if (!['setTimeout', 'setInterval'].includes(path.node.callee.name))
            return
          path.addComment('leading', label, true)
        }
      },
      StringLiteral(path) {
        if (keywords.includes(path.node.value.toLowerCase())) {
          const statementPath = path.findParent(p => p.isStatement())
          if (statementPath)
            statementPath.addComment('leading', label, true)
          else path.addComment('leading', label, true)
        }
      },
      Identifier(path) {
        const name = path.node.name
        if (keywords.includes(name.toLowerCase())) {
          const statementPath = path.findParent(p => p.isStatement())
          if (statementPath)
            statementPath.addComment('leading', label, true)
          else path.addComment('leading', label, true)
        }
      },
    }
  },
} satisfies Transform<Options>
