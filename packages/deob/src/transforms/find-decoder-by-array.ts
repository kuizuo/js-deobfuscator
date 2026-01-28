import type * as t from '@babel/types'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'

import { generate, deobLogger as logger } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'
import type { ArrayRotator } from '../deobfuscate/array-rotator'

export function findDecoderByArray(ast: t.Node, count: number = 100) {
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
      if (path.node.elements.length >= count) {
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
          name: stringArrayName,
          length: path.node.elements.length,
        }

        // 通过引用 找到 数组乱序代码 与 解密函数代码
        binding.referencePaths.forEach((r) => {
          if (r.parentKey === 'callee') {
            const parent = r.find(p => p.isFunctionDeclaration())
            if (parent?.isFunctionDeclaration() && parent.node.id!.name !== stringArrayName) {
              // function decoder(x){
              //   return array(x)
              // }
              decoders.push(new Decoder(parent.node.id!.name, parent))
            }
          }

          if (r.parentKey === 'object') {
            const parent = r.find(p => p.isFunctionDeclaration())
            if (parent?.isFunctionDeclaration()) {
              // function decoder(x){
              //   return array[x]
              // }
              decoders.push(new Decoder(parent.node.id!.name, parent))
            }
          }

          if (r.parentKey === 'arguments') {
            const parent = r.parentPath
            const parent_expression = parent?.findParent(p => p.isExpressionStatement())
            if (parent_expression?.isExpressionStatement()) {
              // (function (h) {
              //     // ...
              // })(array)
              rotators.push(parent_expression)
              return
            }

            if (parent?.parentPath?.isVariableDeclarator()) {
              // function decoder() {
              //  var a = xxx(array)
              // }
              const funcDeclaration = parent?.parentPath.findParent(p => p.isFunctionDeclaration())
              if (funcDeclaration?.isFunctionDeclaration()) {
                logger(`发现解密器 (变量派生): ${funcDeclaration.node.id!.name}`)
                decoders.push(new Decoder(funcDeclaration.node.id!.name, funcDeclaration))
              }
            }
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

  if (!stringArray)
    logger('未找到满足长度要求的字符串数组')
  if (rotators.length) {
    const rotatorNames = rotators
      .map(r => r.isFunctionDeclaration() ? (r as any).node.id?.name : r.node?.expression && (r.node.expression as any)?.callee?.name)
      .filter(Boolean)
    logger(`乱序函数数量: ${rotators.length}${rotatorNames.length ? ` -> ${rotatorNames.join(', ')}` : ''}`)
  }

  return {
    stringArray,
    rotators,
    decoders,
    setupCode,
  }
}
