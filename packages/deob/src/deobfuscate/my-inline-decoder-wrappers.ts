import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import { expression } from '@babel/template'
import { type Transform, generate } from '../ast-utils'

import { Decoder } from './decoder'

/**
 * 嵌套函数花指令替换 需要优先执行 通常内嵌解密函数
 * @param {number} 嵌套深度 针对多次嵌套,默认为 2
 * @example
 * var _0x49afe4 = function (_0x254ae1, _0x559602, _0x3dfa50, _0x13ee81) {
 *   return _0x4698(_0x13ee81 - -674, _0x3dfa50);
 * };
 * _0x49afe4(-57, 1080, 828, 469)
 * ⬇️
 * _0x4698(469 - -674, 828)
 */
export default {
  name: 'inlineDecoderWrappers',
  tags: ['unsafe'],
  visitor() {
    const processFunction = (path: NodePath<t.FunctionDeclaration | t.FunctionExpression>) => {
      const fnName = path.isFunctionDeclaration()
        ? path.node.id!.name
        : path.parentPath.isVariableDeclarator()
          ? (path.parentPath.node.id as t.Identifier)!.name
          : ''

      // if (decoderNameList.includes(fnName)) return

      const firstStatement = path.get('body').get('body')?.[0] as NodePath<t.ReturnStatement>

      // 在原代码中，函数体就一行 return 语句 并且 参数还是函数表达式
      if (firstStatement && firstStatement.isReturnStatement()) {
        // 真实调用函数(解密函数)
        const realFn = firstStatement.get('argument')

        if (!realFn.isCallExpression()) return

        const realFnCallee = realFn.get('callee')
        if (realFnCallee.isIdentifier()) return

        // 包装函数
        const wrapFn = path

        const binding = path.scope.getBinding(fnName)
        if (!binding) return

        // 遍历 _0x49afe4(-57, 1080, 828, 469)
        binding.referencePaths.forEach((ref) => {
          // 通过引用找到调用混淆函数的,需要拿到实际传入的参数
          if (ref.parentKey === 'callee' && ref.parentPath?.isCallExpression()) {
            // 调用传入参数 -57, 1080, 828, 469
            const callFn_args = ref.parentPath.node.arguments

            // 实际用到的参数 _0x13ee81 - -674, _0x3dfa50
            const realFn_args = realFn.node.arguments

            // 要替换的模版
            let templateCode = generate(realFn.node)

            // 记录后续模版中要替换的标识符
            const replaceIdentifiers: Record<string, any> = {}

            // 遍历 (_0x254ae1, _0x559602, _0x3dfa50, _0x13ee81)
            wrapFn.node.params.forEach((param, i) => {
              if (param.type !== 'Identifier')
                return

              // 如果模版中不存在标识符则没有用到
              if (templateCode.includes(param.name)) {
                templateCode = templateCode.replace(new RegExp(`${param.name}`, 'g'), `%%${param.name}%%`)

                // 拿到传入参数 如 第四个参数 _0x13ee81 对应 469
                const arg = callFn_args[i]
                replaceIdentifiers[param.name] = arg
              }
            })

            const buildCallExpression = expression`${templateCode}`

            const newCallExpression = buildCallExpression(replaceIdentifiers)

            // console.log(templateCode, generate(newCallExpression))

            const callFnName = (realFnCallee.node as t.Identifier).name

            if (callFnName && newCallExpression)
              ref.parentPath.replaceWith(newCallExpression)
          }
        })

        path.skip()
      }
    }

    return {
      FunctionDeclaration(path) {
        return processFunction(path)
      },
      FunctionExpression(path) {
        if (path.parentKey === 'init' && path.parentPath.isVariableDeclarator())
          processFunction(path)
      },
    }
  },
} satisfies Transform<{ decoders: Decoder[] }>
