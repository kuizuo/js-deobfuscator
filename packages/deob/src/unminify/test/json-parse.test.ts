import { testTransform } from '../../../test'
import { jsonParse } from '../transforms'

const expectJS = testTransform(jsonParse)

it('array', () =>
  expectJS('JSON.parse("[1,2,3]")').toMatchInlineSnapshot('[1, 2, 3];'))

it('large literal', () =>
  expectJS('JSON.parse("1000000000000000000000")').toMatchInlineSnapshot(
    '1000000000000000000000;',
  ))

it('ignore invalid json', () =>
  expectJS('JSON.parse("abc")').toMatchInlineSnapshot('JSON.parse("abc");'))

it('ignore when JSON is declared in scope', () =>
  expectJS('let JSON; JSON.parse("null")').toMatchInlineSnapshot(
    `
    let JSON;
    JSON.parse("null");
  `,
  ))
