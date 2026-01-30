import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'
import type { ArrayRotator } from '../deobfuscate/array-rotator'

import traverse from '@babel/traverse'
import * as m from '@codemod/matchers'
import { generate, deobLogger as logger } from '../ast-utils'
import { Decoder } from '../deobfuscate/decoder'

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

  // @codemod/matchers 定义
  const functionName = m.capture(m.anyString())
  const arrayIdentifier = m.capture(m.identifier())
  const arrayExpression = m.capture(m.arrayExpression())
  // getStringArray = function () { return n; };
  const functionAssignment = m.assignmentExpression(
    '=',
    m.identifier(m.fromCapture(functionName)),
    m.functionExpression(
      undefined,
      [],
      m.blockStatement([m.returnStatement(m.fromCapture(arrayIdentifier))]),
    ),
  )
  const variableDeclaration = m.variableDeclaration(undefined, [
    m.variableDeclarator(arrayIdentifier, arrayExpression),
  ])
  // function getStringArray() { ... }
  const wrappedFunctionMatcher = m.functionDeclaration(
    m.identifier(functionName),
    [],
    m.or(
      // var array = ["hello", "world"];
      // return (getStringArray = function () { return array; })();
      m.blockStatement([
        variableDeclaration,
        m.returnStatement(m.callExpression(functionAssignment)),
      ]),
      // var array = ["hello", "world"];
      // getStringArray = function () { return n; });
      // return getStringArray();
      m.blockStatement([
        variableDeclaration,
        m.expressionStatement(functionAssignment),
        m.returnStatement(m.callExpression(m.identifier(functionName))),
      ]),
    ),
  )

  // 处理引用，找到乱序函数和解密器
  function processReferences(binding: ReturnType<typeof traverse.prototype.scope.getBinding>, stringArrayName: string) {
    binding?.referencePaths.forEach((r: { parentKey: string, find: (arg0: { (p: any): any, (p: any): any }) => any, parentPath: any }) => {
      if (r.parentKey === 'callee') {
        const parent = r.find((p: { isFunctionDeclaration: () => any }) => p.isFunctionDeclaration())
        if (parent?.isFunctionDeclaration() && parent.node.id!.name !== stringArrayName) {
          // function decoder(x){
          //   return array(x)
          // }
          decoders.push(new Decoder(parent.node.id!.name, parent))
        }
      }

      if (r.parentKey === 'object') {
        const parent = r.find((p: { isFunctionDeclaration: () => any }) => p.isFunctionDeclaration())
        if (parent?.isFunctionDeclaration()) {
          // function decoder(x){
          //   return array[x]
          // }
          decoders.push(new Decoder(parent.node.id!.name, parent))
        }
      }

      if (r.parentKey === 'arguments') {
        const parent = r.parentPath
        const parent_expression = parent?.findParent((p: { isExpressionStatement: () => any }) => p.isExpressionStatement())
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
          const funcDeclaration = parent?.parentPath.findParent((p: { isFunctionDeclaration: () => any }) => p.isFunctionDeclaration())
          if (funcDeclaration?.isFunctionDeclaration()) {
            logger(`发现解密器 (变量派生): ${funcDeclaration.node.id!.name}`)
            decoders.push(new Decoder(funcDeclaration.node.id!.name, funcDeclaration))
          }
        }
      }
    })
  }

  traverse(ast, {
    // 方式1: 使用 @codemod/matchers 匹配包装的字符串数组函数
    FunctionDeclaration(path) {
      if (stringArray) return
      if (wrappedFunctionMatcher.match(path.node)) {
        const length = arrayExpression.current!.elements.length
        const name = functionName.current!
        const binding = path.scope.getBinding(name)
        if (!binding) return

        stringArray = {
          path,
          references: binding.referencePaths,
          name,
          length,
        }

        processReferences(binding, name)
        path.stop()
      }
    },
    // 方式2: 使用 @codemod/matchers 匹配简单的变量声明数组
    VariableDeclaration(path) {
      if (stringArray) return
      if (variableDeclaration.match(path.node)) {
        const length = arrayExpression.current!.elements.length
        const name = arrayIdentifier.current!.name
        const binding = path.scope.getBinding(name)
        if (!binding) return

        stringArray = {
          path,
          references: binding.referencePaths,
          name,
          length,
        }

        processReferences(binding, name)
        path.stop()
      }
    },
    // 方式3 (Fallback): 通用的 ArrayExpression 遍历方式
    ArrayExpression(path) {
      if (stringArray) return
      const stringArrayDeclaration = path.findParent(p => p.isVariableDeclarator() || p.isFunctionDeclaration() || p.isExpressionStatement())

      if (!stringArrayDeclaration)
        return

      let stringArrayName = ''
      let stringArrayPath
      if (stringArrayDeclaration.isVariableDeclarator()) {
        // var a = []
        stringArrayName = (stringArrayDeclaration.node.id as t.Identifier).name
        stringArrayPath = stringArrayDeclaration.parentPath

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

      logger(`[方式3 Fallback] 通过 ArrayExpression 遍历定位到字符串数组: ${stringArrayName}`)
      processReferences(binding, stringArrayName)

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

  if (rotators.length) {
    const rotatorNames = rotators
      .map(r => r.isFunctionDeclaration() ? (r as any).node.id?.name : r.node?.expression && (r.node.expression as any)?.callee?.name)
      .filter(Boolean)
  }

  return {
    stringArray,
    rotators,
    decoders,
    setupCode,
  }
}
