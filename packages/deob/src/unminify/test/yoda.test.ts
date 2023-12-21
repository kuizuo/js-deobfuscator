import { testTransform } from '../../../test'
import { yoda } from '../transforms'

const expectJS = testTransform(yoda)

it('strict equality', () =>
  expectJS('"red" === color').toMatchInlineSnapshot('color === "red";'))

it('loose equality', () =>
  expectJS('null == x').toMatchInlineSnapshot('x == null;'))

it('strict inequality', () =>
  expectJS('"red" !== color').toMatchInlineSnapshot('color !== "red";'))

it('loose inequality', () =>
  expectJS('null != x').toMatchInlineSnapshot('x != null;'))

it('less than', () => expectJS('0 < x').toMatchInlineSnapshot('x > 0;'))

it('less or equal', () =>
  expectJS('0 <= x').toMatchInlineSnapshot('x >= 0;'))

it('greater than', () => expectJS('0 > x').toMatchInlineSnapshot('x < 0;'))

it('greater or equal', () =>
  expectJS('0 >= x').toMatchInlineSnapshot('x <= 0;'))

it('multiply', () => expectJS('0 * x').toMatchInlineSnapshot('x * 0;'))

it('xor', () => expectJS('0 ^ x').toMatchInlineSnapshot('x ^ 0;'))

it('and', () => expectJS('0 & x').toMatchInlineSnapshot('x & 0;'))

it('or', () => expectJS('0 | x').toMatchInlineSnapshot('x | 0;'))

it('string', () =>
  expectJS('"str" == x').toMatchInlineSnapshot('x == "str";'))

it('number', () => expectJS('1 == x').toMatchInlineSnapshot('x == 1;'))

it('negative number', () =>
  expectJS('-1 == x').toMatchInlineSnapshot('x == -1;'))

it('boolean', () =>
  expectJS('true == x').toMatchInlineSnapshot('x == true;'))

it('null', () => expectJS('null == x').toMatchInlineSnapshot('x == null;'))

it('undefined', () =>
  expectJS('undefined == x').toMatchInlineSnapshot('x == undefined;'))

it('naN', () => expectJS('NaN == x').toMatchInlineSnapshot('x == NaN;'))

it('infinity', () =>
  expectJS('Infinity == x').toMatchInlineSnapshot('x == Infinity;'))

it('negative infinity', () =>
  expectJS('-Infinity == x').toMatchInlineSnapshot('x == -Infinity;'))

it('ignore other operators', () =>
  expectJS('2 + x').toMatchInlineSnapshot('2 + x;'))

it('ignore when right side is a literal', () =>
  expectJS('1 === 2').toMatchInlineSnapshot('1 === 2;'))
