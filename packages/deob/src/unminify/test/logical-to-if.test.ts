import { testTransform } from '../../../test'
import { logicalToIf } from '../transforms'

const expectJS = testTransform(logicalToIf)

it('and', () =>
  expectJS(`
    x && y && z();
  `).toMatchInlineSnapshot(`
    if (x && y) {
      z();
    }
  `))

it('or', () =>
  expectJS(`
    x || y || z();
  `).toMatchInlineSnapshot(`
    if (!(x || y)) {
      z();
    }
  `))
