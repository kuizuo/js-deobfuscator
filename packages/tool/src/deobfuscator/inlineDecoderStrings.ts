import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import type { Transform } from '../transforms'
import { inlineFunctionAliases, inlineVariableAliases } from '../utils/inline'

/**
 * 替换解密函数引用 所有引用该变量赋值的代码都将替换成解密函数
 * @example
 * function decoder(){ ... }
 * var alias = decoder;
 * alias(1)
 * ⬇️
 * decoder(1)
 */
export default {
  name: '替换解密函数引用',
  run(ast, state, decoder) {
    if (!decoder?.node) return

    let decoderName
    let decoderBinding

    if (decoder.isFunctionDeclaration()) {
      decoderName = decoder.node.id!.name
      decoder.parentPath.scope.getBinding(decoderName)
    }

    else if (decoder.isFunctionExpression() && decoder.parentKey === 'init' && decoder.parentPath?.isVariableDeclarator()) {
      const parentPath = decoder.parentPath
      decoderName = (parentPath.node.id as t.Identifier).name
      decoderBinding = parentPath.parentPath.scope.getBinding(decoderName)
    }

    if (decoderBinding)
      state.changes += inlineVariableAliases(decoderBinding).changes
  },
} satisfies Transform<NodePath<t.FunctionDeclaration | t.FunctionExpression>>
