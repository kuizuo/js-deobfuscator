import { testTransform } from '../../../test'
import { mergeElseIf } from '../transforms'

const expectJS = testTransform(mergeElseIf)

it('merge', () =>
  expectJS(`
    if (x) {
    } else {
      if (y) {}
    }`).toMatchInlineSnapshot('if (x) {} else if (y) {}'))

it('ignore when it contains other statements', () =>
  expectJS(`
    if (x) {
    } else {
      if (y) {}
      z();
    }`).toMatchInlineSnapshot(`
      if (x) {} else {
        if (y) {}
        z();
      }
    `))
