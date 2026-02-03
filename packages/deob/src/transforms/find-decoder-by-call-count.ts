import type * as t from '@babel/types'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import { generate, deobLogger as logger } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'

/**
 * 根据解密器调用次数寻找到解密器
 *
 * ## 定位原理
 * 混淆代码中的解密器函数通常会被大量调用，因为每个加密的字符串都需要通过解密器来解密。
 * 例如：_0x4b57('0x1'), _0x4b57('0x2'), _0x4b57('0x3')...
 * 这种高频调用的特征可以用来识别解密器函数。
 *
 * ## 匹配条件
 * 1. 必须是顶层的 FunctionDeclaration（直接在 Program 下）
 * 2. 函数的引用次数 >= count（默认100次）
 *
 * ## 匹配示例
 * ```javascript
 * // 这种顶层函数如果被调用超过100次，会被识别为解密器
 * function _0x4b57(x) {
 *   return stringArray[x];
 * }
 *
 * // 大量调用
 * console.log(_0x4b57('0x1'));  // 引用1
 * console.log(_0x4b57('0x2'));  // 引用2
 * // ... 更多调用
 * ```
 *
 * ## 返回值
 * - setupCode: 从程序开头到最后一个解密器函数位置的所有代码（包含字符串数组、乱序函数、解密器等）
 * - decoders: 找到的所有解密器
 *
 * @param ast AST 语法树
 * @param count 解密函数最小调用次数阈值，默认100
 * @returns 包含 setupCode 和 decoders 的对象
 */
export function findDecoderByCallCount(ast: t.File, count = 100) {
  let index = 0

  const decoders: Decoder[] = []

  traverse(ast, {
    /**
     * 遍历所有函数声明，查找高频调用的函数
     *
     * 只检查顶层函数声明，因为解密器通常定义在全局作用域
     * 通过 binding.referencePaths.length 获取函数被引用的次数
     */
    FunctionDeclaration(path) {
      // 只处理顶层函数（直接在 Program 下的函数声明）
      if (path.parentPath.isProgram()) {
        const fnName = path.node.id!.name

        // 获取函数名的绑定信息，包含所有引用路径
        const binding = path.scope.getBinding(fnName)

        if (!binding) return

        if (binding.referencePaths.length >= count) {
          logger(`根据调用次数命中解密器: ${fnName} (调用 ${binding.referencePaths.length} 次)`)
          decoders.push(new Decoder(fnName, fnName, path))

          const body = (path.parentPath!.scope.block as t.Program).body

          for (let i = 0; i < body.length; i++) {
            const statement = body[i]
            if (statement.start === path.node.start) {
              index = i + 1
            }
          }
        }
      }
    },
  })

  const generateOptions = {
    compact: true,
    shouldPrintComment: () => false,
  }

  const newAst = parser.parse('')
  newAst.program.body = ast.program.body.slice(0, index)
  const setupCode = generate(newAst, generateOptions)

  if (!decoders.length)
    logger(`未找到调用次数 >= ${count} 的解密器`)
  else
    logger(`解密器列表: ${decoders.map(d => d.name).join(', ')}`)

  return {
    setupCode,
    decoders,
  }
}
