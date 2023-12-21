import { testTransform } from '../../../test'
import { infinity } from '../transforms'

const expectJS = testTransform(infinity)

it('infinity', () => expectJS('1/0').toMatchInlineSnapshot('Infinity;'))

it('negative infinity', () =>
  expectJS('-1/0').toMatchInlineSnapshot('-Infinity;'))

it('ignore when Infinity is declared in scope', () =>
  expectJS('let Infinity = 1; 1/0').toMatchInlineSnapshot(`
    let Infinity = 1;
    1 / 0;
  `))
