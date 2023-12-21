import { testTransform } from '../../../test'
import { typeofUndefined } from '../transforms'

const expectJS = testTransform(typeofUndefined)

it('typeof greater than', () =>
  expectJS('typeof a > "u"').toMatchInlineSnapshot(
    `typeof a === "undefined";`,
  ))

it('typeof less than', () =>
  expectJS('typeof a < "u"').toMatchInlineSnapshot(
    `typeof a !== "undefined";`,
  ))
