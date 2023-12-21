import { testTransform } from '../../../test'
import { rawLiterals } from '../transforms'

const expectJS = testTransform(rawLiterals)

it('string', () =>
  expectJS(
    String.raw`f("\x61", '"', "\u270F\uFE0F", "\u2028\u2029\t")`,
  ).toMatchInlineSnapshot('f("a", "\\"", "✏️", "\\u2028\\u2029\\t");'))

it('number', () =>
  expectJS('const a = 0x1;').toMatchInlineSnapshot('const a = 1;'))
