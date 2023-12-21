import { testTransform } from '../../../test'
import { ternaryToIf } from '../transforms'

const expectJS = testTransform(ternaryToIf)

it('statement', () =>
  expectJS(`
    a ? b() : c();
  `).toMatchInlineSnapshot(`
    if (a) {
      b();
    } else {
      c();
    }
  `))

it('returned', () =>
  expectJS(`
    return a ? b() : c();
  `).toMatchInlineSnapshot(`
    if (a) {
      return b();
    } else {
      return c();
    }
  `))

it('ignore expression', () =>
  expectJS(`
    const x = a ? b() : c();
  `).toMatchInlineSnapshot('const x = a ? b() : c();'))
