import * as t from '@babel/types'
import type { Decoder } from '../deobfuscate/decoder'

/**
 * 执行解密器 (使用 eval 执行)
 * @param {*} decoder
 * @example
 * _0x4698(_0x13ee81, _0x3dfa50)
 * ⬇️
 * 原始字符串
 */
export function decodeStrings(decoders: Decoder[]) {
  const map = new Map<string, string>() // 记录解密结果

  for (const decoder of decoders) {
    decoder?.path.scope.getBinding(decoder.name)?.referencePaths.forEach((ref) => {
      if (ref?.parentKey === 'callee' && ref.parentPath?.isCallExpression()) {
        const callExpression = ref.parentPath
        try {
          // 如果调用解密函数中有变量参数则不替换
          const hasIdentifier = callExpression.node.arguments.some(a => t.isIdentifier(a))
          if (hasIdentifier) return

          const call = callExpression.toString()

          const value = global.eval(call)
          map.set(call, value)

          callExpression.replaceWith(t.valueToNode(value))
        }
        catch (error) {
          // 解密失败 则添加注释
          callExpression.addComment('leading', `decode_error: ${(error as any).message}`, true)
        }
      }
    })
  }

  return map
}
