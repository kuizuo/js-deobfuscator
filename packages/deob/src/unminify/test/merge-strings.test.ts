import { testTransform } from '../../../test'
import { mergeStrings } from '../transforms'

const expectJS = testTransform(mergeStrings)

it('only strings', () =>
  expectJS(`
    "a" + "b" + "c";
  `).toMatchInlineSnapshot('"abc";'))

it('with variables', () =>
  expectJS(`
    "a" + "b" + xyz + "c" + "d";
  `).toMatchInlineSnapshot('"ab" + xyz + "cd";'))
