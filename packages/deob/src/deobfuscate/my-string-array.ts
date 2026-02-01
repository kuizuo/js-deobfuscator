import type { Binding, NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import * as m from '@codemod/matchers'
import {
  inlineArrayElements,
  isReadonlyObject,
  renameFast,
  undefinedMatcher,
} from '../ast-utils'

export interface StringArray {
  path: NodePath<t.FunctionDeclaration | t.VariableDeclaration | t.Node>
  references: NodePath[]
  name: string
  originalName: string
  length: number
}

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
    return refPath.findParent(p => t.isFunction(p.node)) !== null
  })
}

export function findStringArray(ast: t.Node): StringArray | undefined {
  let result: StringArray | undefined
  const functionName = m.capture(m.anyString())
  const arrayIdentifier = m.capture(m.identifier())
  const arrayExpression = m.capture(
    m.arrayExpression(m.arrayOf(m.or(m.stringLiteral(), undefinedMatcher))),
  )
  // getStringArray = function () { return array; };
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
  const matcher = m.functionDeclaration(
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
      // getStringArray = function () { return array; });
      // return getStringArray();
      m.blockStatement([
        variableDeclaration,
        m.expressionStatement(functionAssignment),
        m.returnStatement(m.callExpression(m.identifier(functionName))),
      ]),
    ),
  )

  traverse(ast, {
    // Wrapped string array from later javascript-obfuscator versions
    FunctionDeclaration(path) {
      if (matcher.match(path.node)) {
        const length = arrayExpression.current!.elements.length
        const name = functionName.current!
        const binding = path.scope.getBinding(name)!
        renameFast(binding, '__STRING_ARRAY__')

        result = {
          path,
          references: binding.referencePaths,
          originalName: name,
          name: '__STRING_ARRAY__',
          length,
        }
        path.stop()
      }
    },
    // Simple string array inlining (only `array[0]`, `array[1]` etc references, no rotating/decoding).
    // May be used by older or different obfuscators
    VariableDeclaration(path) {
      if (!variableDeclaration.match(path.node)) return

      const length = arrayExpression.current!.elements.length
      const binding = path.scope.getBinding(arrayIdentifier.current!.name)!
      const memberAccess = m.memberExpression(
        m.fromCapture(arrayIdentifier),
        m.numericLiteral(m.matcher(value => value < length)),
      )
      if (!binding.referenced || !isReadonlyObject(binding, memberAccess))
        return

      inlineArrayElements(arrayExpression.current!, binding.referencePaths)
      path.remove()
    },
    // Detect string array defined as a literal ArrayExpression: `var arr = [...]`, `function arr() { return [...] }`, or `arr = [...]`.
    // Requires IIFE reference and member access pattern (typical of obfuscator string arrays).
    ArrayExpression(path) {
      if (result) return
      const stringArrayDeclaration = path.findParent(
        p => p.isVariableDeclarator() || p.isFunctionDeclaration() || p.isExpressionStatement(),
      )

      if (!stringArrayDeclaration) return

      let stringArrayName = ''
      let stringArrayPath: NodePath | undefined

      if (stringArrayDeclaration.isVariableDeclarator()) {
        // var arr = []
        const id = stringArrayDeclaration.node.id
        if (!t.isIdentifier(id)) return
        stringArrayName = id.name
        stringArrayPath = stringArrayDeclaration.parentPath!

        // may be wrapped in a function
        const parent = stringArrayPath.findParent(p => p.isFunctionDeclaration())
        if (parent && parent.isFunctionDeclaration() && parent.node.id) {
          stringArrayName = parent.node.id.name
          stringArrayPath = parent
        }
      }
      else if (stringArrayDeclaration.isFunctionDeclaration()) {
        // function arr() { return [] }
        const id = stringArrayDeclaration.node.id
        if (!id) return
        stringArrayName = id.name
        stringArrayPath = stringArrayDeclaration
      }
      else if (stringArrayDeclaration.isExpressionStatement()) {
        const expr = stringArrayDeclaration.node.expression
        if (t.isAssignmentExpression(expr) && t.isIdentifier(expr.left)) {
          // arr = []
          stringArrayName = expr.left.name
          stringArrayPath = stringArrayDeclaration
        }
      }

      if (!stringArrayName || !stringArrayPath) return

      const binding = path.scope.getBinding(stringArrayName)
      if (!binding) return

      if (!hasIIFEReference(binding) || !hasMemberAccessInFunction(binding)) {
        return
      }

      renameFast(binding, '__STRING_ARRAY__')

      result = {
        path: stringArrayPath,
        references: binding.referencePaths,
        originalName: stringArrayName,
        name: '__STRING_ARRAY__',
        length: path.node.elements.length,
      }

      path.stop()
    },
  })

  return result
}
