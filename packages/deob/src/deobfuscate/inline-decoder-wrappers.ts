import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import type {
  Transform,
} from '../ast-utils'
import {
  inlineFunctionAliases,
  inlineVariableAliases,
  deobLogger as logger,
} from '../ast-utils'

/**
 * Replaces all references to `var alias = decode;` with `decode`
 */
export default {
  name: 'inlineDecoderWrappers',
  tags: ['unsafe'],
  scope: true,
  run(ast, state, decoder) {
    if (!decoder?.node.id) return

    const decoderName = decoder.node.id.name
    const decoderBinding = decoder.parentPath.scope.getBinding(decoderName)
    if (decoderBinding) {
      const varState = inlineVariableAliases(decoderBinding).changes
      const fnState = inlineFunctionAliases(decoderBinding).changes
      state.changes += varState
      state.changes += fnState
      logger(`解密函数包装内联: ${decoderName} | 变量别名 ${varState} 处, 函数别名 ${fnState} 处`)
    }
  },
} satisfies Transform<NodePath<t.FunctionDeclaration>>
