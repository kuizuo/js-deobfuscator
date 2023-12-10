import * as t from '@babel/types'
import type { NodePath } from '@babel/traverse'
import type { Transform } from '.'

/**
 * 将 字面量常量 直接替换对应的变量引用地方
 * @example
 * let a = "debugger";
 * console.log(a)
 * ⬇️
 * console.log("debugger")
 */
export default {
  name: '替换常量引用',
  visitor() {
    function replaceConstantVariable(path: NodePath, name: string, value: t.Literal) {
      const binding = path.scope.getBinding(name)

      if (binding && binding.constant && binding.constantViolations.length === 0) {
        binding.referencePaths.forEach((ref) => {
          ref.replaceWith(value)
        })

        path.remove()
      }
    }

    return {
      AssignmentExpression(path) {
        const value = path.node.right
        if (t.isStringLiteral(value) || t.isNumericLiteral(value))
          replaceConstantVariable(path, (path.node.left as t.Identifier).name, value)
      },
      VariableDeclarator(path) {
        const value = path.node.init
        if (t.isStringLiteral(value) || t.isNumericLiteral(value))
          replaceConstantVariable(path, (path.node.id as t.Identifier).name, value)
      },
    }
  },
} satisfies Transform
