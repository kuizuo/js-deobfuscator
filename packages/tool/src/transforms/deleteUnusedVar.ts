import * as t from '@babel/types'
import type { NodePath } from '@babel/traverse'
import type { Transform } from '.'

/**
 * 清理无用变量与函数
 * @example
 * let a = 1;
 * ⬇️
 *
 */
export default {
  name: '清理无用变量',
  visitor() {
    function processDeclaration(path: NodePath, name: string) {
      const binding = path.scope.getBinding(name)

      if (!binding || binding.constantViolations.length > 0) return

      if (binding.referencePaths.length > 0) return

      path.remove()
    }

    return {
      VariableDeclarator(path) {
        const { id, init } = path.node

        if (!(t.isLiteral(init) || t.isObjectExpression(init) || t.isFunctionExpression(init)))
          return

        if (t.isIdentifier(id)) {
          const name = id.name
          processDeclaration(path, name)
        }
      },
      FunctionDeclaration(path) {
        const name = path.node.id!.name
        processDeclaration(path, name)
      },
    }
  },
} satisfies Transform
