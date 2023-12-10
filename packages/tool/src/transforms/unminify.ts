import type { Visitor } from '@babel/traverse'
import { visitors } from '@babel/traverse'
import blockStatement from './blockStatement'
import booleanIf from './booleanIf'
import computedProperties from './computedProperties'
import jsonParse from './jsonParse'
import mergeStrings from './mergeStrings'
import numberExpressions from './numberExpressions'
import rawLiterals from './rawLiterals'
import sequence from './sequence'
import splitVariableDeclarations from './splitVariableDeclarations'
import type { Transform, TransformState } from '.'

export default {
  name: 'unminify',
  visitor() {
    const traverseOptions: Visitor<TransformState>[] = [
      rawLiterals.visitor(),
      blockStatement.visitor(),
      mergeStrings.visitor(),
      computedProperties.visitor(),
      splitVariableDeclarations.visitor(),
      sequence.visitor(),
      numberExpressions.visitor(),
      booleanIf.visitor(),
      jsonParse.visitor(),
    ]
    const visitor = visitors.merge(traverseOptions)
    // @ts-expect-error regression from https://github.com/babel/babel/pull/15702
    visitor.noScope = traverseOptions.every(t => t.noScope)
    return visitor
  },
} satisfies Transform
