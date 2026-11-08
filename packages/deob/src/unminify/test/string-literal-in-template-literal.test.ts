import { Buffer } from 'node:buffer'
import { runInNewContext } from 'node:vm'
import { parse } from '@babel/parser'
import { expect, test } from 'vitest'
import { testTransform } from '../../../test'
import { applyTransform, generate } from '../../ast-utils'
import stringLiteralInTemplate from '../transforms/string-literal-in-template'

const expectJS = testTransform(stringLiteralInTemplate)

test('string-literal-in-template-literal', () => {
  expectJS(
    `
    const a = \`Hello \${'World'}!\`;
  `,
  ).toMatchInlineSnapshot(`const a = \`Hello World!\`;`)

  expectJS(
    `
    const a = \`Hello \${'World'}\${'!'}\`;
  `,
  ).toMatchInlineSnapshot(`const a = \`Hello World!\`;`)

  expectJS(
    `
    const a = \`\${"Hi!"}\`;
  `,
  ).toMatchInlineSnapshot(`const a = \`Hi!\`;`)
})

/* eslint-disable no-template-curly-in-string -- These strings are JavaScript test inputs. */
test.each([
  ['backslashes', '`C:${"\\\\\\\\"}temp`'],
  ['a backtick', '`a${"`"}b`'],
  ['literal interpolation markers', '`a${"${missing}"}b`'],
  ['an opening brace from an inserted string', '`$${"{missing}"}`'],
  ['an empty substitution between a dollar sign and a brace', '`$${""}{missing}`'],
  ['a carriage return', '`a${"\\r"}b`'],
  ['a null escape followed by a digit', '`\\0${"1"}`'],
  ['a null character followed by a digit in a substitution', '`a${"\\x001"}b`'],
  ['a null substitution before a digit', '`${"\\0"}1`'],
  ['a lone surrogate', '`a${"\\uD800"}b`'],
  ['a tagged template', '((s, ...v) => `${s.length}/${v.length}`)`a${"b"}c`'],
])('preserves the value with %s', (_, source) => {
  /* eslint-enable no-template-curly-in-string */
  const ast = parse(source)
  applyTransform(ast, stringLiteralInTemplate)

  const output = Buffer.from(generate(ast)).toString()
  expect(runInNewContext(output)).toBe(runInNewContext(source))
})
