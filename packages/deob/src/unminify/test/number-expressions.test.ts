import { testTransform } from '../../../test'
import { numberExpressions } from '../transforms'

const expectJS = testTransform(numberExpressions)

it('simplify', () =>
  expectJS(`-0x1021e + -0x7eac8 + 0x17 * 0xac9c`).toMatchInlineSnapshot(
    '431390;',
  ))

it('simplify coerced string', () =>
  expectJS(`-"0xa6" - -331; -"0xa6"`).toMatchInlineSnapshot(`
    165;
    -166;
  `))

it('simplify division', () => expectJS('10 / 2').toMatchInlineSnapshot('5;'))

it('keep divisions if it results in a decimal number', () =>
  expectJS(
    '(-0x152f + 0x1281 * -0x1 + -0x18 * -0x1d1) / (0x83 * -0x1a + -0x19ea + 0x5f * 0x6a)',
  ).toMatchInlineSnapshot('1000 / 30;'))

it('ignore string results', () =>
  expectJS('0x1021e + "test"').toMatchInlineSnapshot('0x1021e + "test";'))
