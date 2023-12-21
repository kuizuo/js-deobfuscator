import * as parser from '@babel/parser'
import type * as t from '@babel/types'
import traverse from '@babel/traverse'
import { generate } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'

/**
 * 根据解密器调用次数寻找到解密器
 * @param {number} count 解密函数调用次数
 * @returns {string} 解密器代码
 */
export function findDecoderByCallCount(ast: t.File, count = 100) {
  let index = 0 // 最后一个解密函数所在语句下标

  const decoders: Decoder[] = []

  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.parentPath.isProgram()) {
        const fnName = path.node.id!.name

        const binding = path.scope.getBinding(fnName)

        if (!binding) return

        // 引用次数
        if (binding.referencePaths.length >= count) {
          decoders.push(new Decoder(fnName, path))

          const body = (path.parentPath!.scope.block as t.Program).body

          // TODO: 根据解密器来找乱序函数与字符串数组
          for (let i = 0; i < body.length; i++) {
            const statement = body[i]
            if (statement.start === path.node.start) {
              index = i + 1
            }
          }
        }
      }
    },
    // 已执行 var-functions 则无需遍历 FunctionExpression
    // FunctionExpression(path) {
    //   if (path.parentKey === 'init' && path.parentPath.type === 'VariableDeclarator') {
    //     const variableDeclarationPath = path.findParent(p => p.isVariableDeclaration())
    //     if (variableDeclarationPath && variableDeclarationPath.parentPath?.isProgram())
    //       processFunction(path)
    //   }
    // },
  })

  const generateOptions = {
    compact: true,
    shouldPrintComment: () => false,
  }

  const newAst = parser.parse('')
  newAst.program.body = ast.program.body.slice(0, index)
  const setupCode = generate(newAst, generateOptions)

  // TODO:
  // stringArray rotators

  return {
    setupCode,
    decoders,
  }
}
