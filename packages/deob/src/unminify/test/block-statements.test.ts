import { testTransform } from '../../../test'
import { blockStatements } from '../transforms'

const expectJS = testTransform(blockStatements)

it('if statement', () =>
  expectJS(`
    if (a) b();
  `).toMatchInlineSnapshot(`
    if (a) {
      b();
    }
  `))

it('while statement', () =>
  expectJS(`
    while (a) b();
  `).toMatchInlineSnapshot(`
    while (a) {
      b();
    }
  `))

it('for statement', () =>
  expectJS(`
    for (;;) b();
  `).toMatchInlineSnapshot(`
    for (;;) {
      b();
    }
  `))

it('for-in statement', () =>
  expectJS(`
    for (const key in object) b();
  `).toMatchInlineSnapshot(`
    for (const key in object) {
      b();
    }
  `))

it('for-of statement', () =>
  expectJS(`
    for (const item of array) b();
  `).toMatchInlineSnapshot(`
    for (const item of array) {
      b();
    }
  `))

it('arrow function', () =>
  expectJS(`
    const x = () => (a(), b());
  `).toMatchInlineSnapshot(`
    const x = () => {
      return a(), b();
    };
  `))

it('ignore empty statement', () =>
  expectJS(`
    while (arr.pop());
  `).toMatchInlineSnapshot(`
    while (arr.pop());
  `))
