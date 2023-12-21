import { testTransform } from '../../../test'
import { unaryExpressions } from '../transforms'

const expectJS = testTransform(unaryExpressions)

it('void', () => expectJS('void foo();').toMatchInlineSnapshot('foo();'))

it('typeof', () => expectJS('typeof foo();').toMatchInlineSnapshot('foo();'))

it('logical not', () => expectJS('!foo();').toMatchInlineSnapshot('foo();'))

it('return void', () =>
  expectJS('return void foo();').toMatchInlineSnapshot(`
    foo();
    return;
  `))
