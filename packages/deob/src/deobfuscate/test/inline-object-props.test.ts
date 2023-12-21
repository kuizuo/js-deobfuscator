import { testTransform } from '../../../test'
import inlineObjectProps from '../inline-object-props'

const expectJS = testTransform(inlineObjectProps)

it('inline property', () =>
  expectJS(`
      const a = { x: 1 };
      console.log(a.x);
    `).toMatchInlineSnapshot('console.log(1);'))

it('ignore non-existent properties', () =>
  expectJS(`
    const a = { x: 1 };
    console.log(a.__defineGetter__);
  `).toMatchInlineSnapshot(`
    const a = {
      x: 1
    };
    console.log(a.__defineGetter__);
  `))

it('ignore shared variable references', () =>
  expectJS(`
    const a = { x: 1 };
    fn(a);
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    const a = {
      x: 1
    };
    fn(a);
    console.log(a.x);
  `))

it('ignore variable assignment', () =>
  expectJS(`
    let a = { x: 1 };
    a = { x: 2 };
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    let a = {
      x: 1
    };
    a = {
      x: 2
    };
    console.log(a.x);
  `))

it('ignore property assignment', () =>
  expectJS(`
    const a = { x: 1 };
    a.x = 2;
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    const a = {
      x: 1
    };
    a.x = 2;
    console.log(a.x);
  `))

it('ignore property assignment with array pattern', () =>
  expectJS(`
    let a = { x: 1 };
    [a.x] = [2];
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    let a = {
      x: 1
    };
    [a.x] = [2];
    console.log(a.x);
  `))

it('ignore property assignment with object pattern', () =>
  expectJS(`
    let a = { x: 1 };
    ({ x: a.x } = { x: 2 });
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    let a = {
      x: 1
    };
    ({
      x: a.x
    } = {
      x: 2
    });
    console.log(a.x);
  `))

it('ignore delete', () =>
  expectJS(`
    const a = { x: 1 };
    delete a.x;
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    const a = {
      x: 1
    };
    delete a.x;
    console.log(a.x);
  `))

it('ignore update expression', () =>
  expectJS(`
    const a = { x: 1 };
    a.x++;
    console.log(a.x);
  `).toMatchInlineSnapshot(`
    const a = {
      x: 1
    };
    a.x++;
    console.log(a.x);
  `))
