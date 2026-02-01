import type { Binding, NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import type { ArrayRotator } from '../deobfuscate/array-rotator'

import traverse from '@babel/traverse'
import * as m from '@codemod/matchers'
import { generate, deobLogger as logger } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'

/**
 * Checks if the array variable is passed as the first argument to an IIFE
 * Example: (function(_0x2684bf, _0x5d23f1) { ... }(arr, 0x128));
 */
function hasIIFEReference(binding: Binding): boolean {
  const iifeMatcher = m.callExpression(
    m.or(m.functionExpression(), m.arrowFunctionExpression()),
  )
  return binding.referencePaths.some((refPath) => {
    const parent = refPath.parent
    if (!iifeMatcher.match(parent)) return false
    const callExpr = parent as t.CallExpression
    return callExpr.arguments[0] === refPath.node
  })
}

/**
 * Checks if the array variable is accessed as a member expression inside a function
 * Example: var _0x3028 = function(_0x2308a4, _0x573528) {
 *     var _0x29a1e7 = arr[_0x2308a4];
 *     return _0x29a1e7;
 * };
 */
function hasMemberAccessInFunction(binding: Binding): boolean {
  return binding.referencePaths.some((refPath) => {
    if (refPath.parentKey !== 'object') return false
    // Check if this reference is inside a function
    return refPath.findParent(p => p.isFunction()) !== null
  })
}

export function findDecoderByArray(ast: t.Node) {
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

      // Check if the array variable satisfies both conditions:
      // 1. Passed as first argument to an IIFE
      // 2. Accessed as member expression inside a function
      if (!hasIIFEReference(binding) || !hasMemberAccessInFunction(binding)) {
        return
      }

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
            decoders.push(new Decoder(parent.node.id!.name, parent.node.id!.name, parent))
          }
        }

        if (r.parentKey === 'object') {
          const parent = r.find(p => p.isFunctionDeclaration())
          if (parent?.isFunctionDeclaration()) {
            // function decoder(x){
            //   return array[x]
            // }
            decoders.push(new Decoder(parent.node.id!.name, parent.node.id!.name, parent))
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
              decoders.push(new Decoder(funcDeclaration.node.id!.name, funcDeclaration.node.id!.name, funcDeclaration))
            }
          }
        }
      })

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
