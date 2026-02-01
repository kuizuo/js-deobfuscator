import type { Decoder } from '../deobfuscate/decoder'
import type { Sandbox } from '../deobfuscate/vm'
import * as t from '@babel/types'
import { deobLogger as logger } from '../ast-utils'
import { evalCode } from '../deobfuscate/vm'

/**
 * 执行解密器 (使用 eval 执行)
 * @param {*} decoder
 * @example
 * _0x4698(_0x13ee81, _0x3dfa50)
 * ⬇️
 * 原始字符串
 */
export async function decodeStrings(sandbox: Sandbox, decoders: Decoder[]) {
  const map = new Map<string, string>() // 记录解密结果
  let failures = 0

  for await (const decoder of decoders) {
    decoder?.path.scope.getBinding(decoder.name)?.referencePaths.forEach(async (ref) => {
      if (ref?.parentKey === 'callee' && ref.parentPath?.isCallExpression()) {
        const callExpression = ref.parentPath
        try {
          // 如果调用解密函数中有变量参数则不替换
          const hasIdentifier = callExpression.node.arguments.some(a => t.isIdentifier(a))
          if (hasIdentifier) return

          const call = callExpression.toString()

          const value = await evalCode(sandbox, call)
          map.set(call, value as string)

          callExpression.replaceWith(t.valueToNode(value))
        }
        catch (error) {
          failures++
          // 解密失败 则添加注释
          callExpression.addComment('leading', `decode_error: ${(error as any).message}`, true)
        }
      }
    })
  }

  if (failures)
    logger(`\x1B[31m解密失败 ${failures} 处，已在代码中标记 decode_error\x1B[0m`)

  return map
}
