import type { ParseResult } from '@babel/parser'
import type { Assertion } from 'vitest'
import type { Transform } from '../src/ast-utils'
import { parse } from '@babel/parser'
import { expect } from 'vitest'
import { applyTransform } from '../src/ast-utils'

export function testTransform<Options>(
  transform: Transform<Options>,
): (input: string, options?: Options) => Assertion<ParseResult<File>> {
  return (input, options) => {
    const ast = parse(input, {
      sourceType: 'unambiguous',
      allowReturnOutsideFunction: true,
    })
    applyTransform(ast, transform, options)
    return expect(ast)
  }
}
