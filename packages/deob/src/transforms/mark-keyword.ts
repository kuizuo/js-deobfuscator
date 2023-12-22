import traverse from '@babel/traverse'
import * as t from '@babel/types'

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
export function markKeyword(ast: t.Node, keywords = ['debugger'], label = ' TOLOOK') {
  const defaultKeywords = ['debugger', 'setTimeout', 'setInterval']
  keywords = [...new Set([...keywords.map(k => k.toLowerCase()), ...defaultKeywords])]

  traverse(ast, {
    DebuggerStatement: {
      exit(path) {
        // 如果已注释,则跳过
        const hasComment = path.node.leadingComments?.find(
          c => (c.value = label),
        )
        if (hasComment)
          return

        path.addComment('leading', label, true)
      },
    },
    CallExpression: {
      exit(path) {
        if (t.isIdentifier(path.node.callee)) {
          if (!keywords.includes(path.node.callee.name))
            return
          path.addComment('leading', label, true)
        }
      },
    },
    StringLiteral: {
      exit(path) {
        if (keywords.includes(path.node.value.toLowerCase())) {
          const statementPath = path.findParent(p => p.isStatement())
          if (statementPath)
            statementPath.addComment('leading', label, true)
          else path.addComment('leading', label, true)
        }
      },
    },
    Identifier: {
      exit(path) {
        const name = path.node.name
        if (keywords.includes(name.toLowerCase())) {
          const statementPath = path.findParent(p => p.isStatement())
          if (statementPath)
            statementPath.addComment('leading', label, true)
          else path.addComment('leading', label, true)
        }
      },
    },
  })
}
