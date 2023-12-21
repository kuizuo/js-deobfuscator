import type * as t from '@babel/types'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'

import { generate } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'
import type { ArrayRotator } from '../deobfuscate/array-rotator'

export function findDecoderByArray(ast: t.Node, count?: number) {
  // 大数组 有可能是以函数形式包裹的
  let stringArray: {
    path: NodePath<t.Node>
    references: NodePath[]
    name: string
    length: number
  } | undefined
  // 乱序函数
  const rotators: ArrayRotator[] = []
  // 解密器
  const decoders: Decoder[] = []

  traverse(ast, {
    ArrayExpression(path) {
      if (path.node.elements.length >= (count || 50)) {
        const stringArrayDeclaration = path.findParent(p => p.isVariableDeclarator() || p.isFunctionDeclaration() || p.isExpressionStatement())

        if (!stringArrayDeclaration)
          return

        // if (!stringArrayDeclaration?.parentPath?.isProgram())
        // return

        let stringArrayName = ''
        let stringArrayPath
        if (stringArrayDeclaration.isVariableDeclarator()) {
          // var a = []
          stringArrayName = (stringArrayDeclaration.node.id as t.Identifier).name
          stringArrayPath = stringArrayDeclaration.parentPath

          // 可能会被在包裹一层
          const parent = stringArrayPath.findParent(p => p.isFunctionDeclaration())
          if (parent && parent.isFunctionDeclaration()) {
            stringArrayName = parent.node.id!.name
            stringArrayPath = parent
          }
        }
        else if (stringArrayDeclaration.isFunctionDeclaration()) {
          // function a(){ return []}
          stringArrayName = (stringArrayDeclaration.node.id as t.Identifier).name
          stringArrayPath = stringArrayDeclaration
        }
        else if (stringArrayDeclaration.isExpressionStatement()) {
          if (stringArrayDeclaration.node.expression.type === 'AssignmentExpression') {
            // a = []
            stringArrayName = (stringArrayDeclaration.node.expression.left as t.Identifier).name
            stringArrayPath = stringArrayDeclaration
          }
        }

        const binding = path.scope.getBinding(stringArrayName)
        if (!binding) return

        stringArray = {
          path: stringArrayPath!,
          references: binding.referencePaths,
          name: '__STRING_ARRAY__',
          length: path.node.elements.length,
        }

        // 通过引用 找到 数组乱序代码 与 解密函数代码
        binding.referencePaths.forEach((r) => {
          if (r.parentKey === 'callee') {
            // 找到大数组所调用位置,继续向上找,大概率就是解密函数
            const parent = r.find(p => p.isFunctionDeclaration())
            if (parent && parent.isFunctionDeclaration() && parent.node.id!.name !== stringArrayName)
              decoders.push(new Decoder(parent.node.id!.name, parent))
            return
          }

          if (r.parentKey === 'object') {
            // 找到大数组所调用位置,继续向上找,大概率就是解密函数
            const parent = r.find(p => p.isFunctionDeclaration())
            if (parent && parent.isFunctionDeclaration())
              decoders.push(new Decoder(parent.node.id!.name, parent))
            return
          }

          // 以参数传入,大概率乱序函数
          if (r.parentKey === 'arguments') {
            const parent = r.findParent(p => p.isExpressionStatement())
            if (parent && parent.isExpressionStatement())
              rotators.push(parent)
          }
        })
      }

      path.skip()
    },
  })

  const generateOptions = {
    compact: true,
    shouldPrintComment: () => false,
  }
  const stringArrayCode = stringArray ? generate(stringArray.path.node, generateOptions) : ''
  const rotatorCode = rotators
    .map(rotator => generate(rotator.node, generateOptions))
    .join(';\n')
  const decoderCode = decoders
    .map(decoder => generate(decoder.path.node, generateOptions))
    .join(';\n')

  const setupCode = [stringArrayCode, rotatorCode, decoderCode].join(';\n')

  return {
    stringArray,
    rotators,
    decoders,
    setupCode,
  }
}
