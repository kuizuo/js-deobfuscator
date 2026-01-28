import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import * as m from '@codemod/matchers'
import { type Transform, generateUid, renameFast } from '../ast-utils'

export default {
  name: 'mangle',
  tags: ['safe'],
  scope: true,
  visitor(match: (name: string) => boolean = () => true) {
    return {
      BindingIdentifier: {
        exit(path, state) {
          if (!path.isBindingIdentifier()) return
          if (path.parentPath.isImportSpecifier()) return
          if (path.parentPath.isObjectProperty()) return
          if (!match(path.node.name)) return

          const binding = path.scope.getBinding(path.node.name)
          if (!binding) return
          if (binding.referencePaths.some(ref => ref.isExportNamedDeclaration()))
            return

          renameFast(binding, inferName(path))
          if (state)
            state.changes++
        },
      },
    }
  },
} satisfies Transform<(id: string) => boolean>

const requireMatcher = m.variableDeclarator(
  m.identifier(),
  m.callExpression(m.identifier('require'), [m.stringLiteral()]),
)

function inferName(path: NodePath<t.Identifier>): string {
  if (path.parentPath.isClass({ id: path.node }))
    return generateUid(path.scope, 'C')

  if (path.parentPath.isFunction({ id: path.node }))
    return generateUid(path.scope, 'f')

  if (
    path.listKey === 'params'
    || (path.parentPath.isAssignmentPattern({ left: path.node })
    && path.parentPath.listKey === 'params')
  ) {
    return generateUid(path.scope, 'p')
  }

  if (requireMatcher.match(path.parent)) {
    return generateUid(
      path.scope,
      (path.parentPath.get('init.arguments.0') as NodePath<t.StringLiteral>)
        .node.value,
    )
  }

  if (path.parentPath.isVariableDeclarator({ id: path.node })) {
    const init = path.parentPath.get('init')
    const suffix = (init.isExpression() && generateExpressionName(init)) || ''
    return generateUid(path.scope, `v${titleCase(suffix)}`)
  }

  if (path.parentPath.isCatchClause())
    return generateUid(path.scope, 'e')

  if (path.parentPath.isArrayPattern())
    return generateUid(path.scope, 'v')

  return path.node.name
}

function generateExpressionName(
  expression: NodePath<t.Expression>,
): string | undefined {
  if (expression.isIdentifier())
    return expression.node.name

  if (expression.isFunctionExpression())
    return expression.node.id?.name ?? 'f'

  if (expression.isArrowFunctionExpression())
    return 'f'

  if (expression.isClassExpression())
    return expression.node.id?.name ?? 'C'

  if (expression.isCallExpression()) {
    return generateExpressionName(
      expression.get('callee') as NodePath<t.Expression>,
    )
  }

  if (expression.isThisExpression())
    return 'this'

  if (expression.isNumericLiteral())
    return `LN${expression.node.value.toString()}`

  if (expression.isStringLiteral())
    return `LS${titleCase(expression.node.value).slice(0, 20)}`

  if (expression.isObjectExpression())
    return 'O'

  if (expression.isArrayExpression())
    return 'A'

  return undefined
}

function titleCase(str: string) {
  return str
    .replace(/(?:^|\s)([a-z])/g, (_, m) => (m as string).toUpperCase())
    .replace(/[^a-zA-Z0-9$_]/g, '')
}
