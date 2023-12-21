import { testTransform } from '../../../test'
import mergeObjectAssignments from '../merge-object-assignments'

const expectJS = testTransform(mergeObjectAssignments)

it('inline properties without inlining object', () =>
  expectJS(`
    const obj = {};
    obj.foo = foo;
    obj.bar = 1;
    foo++;
    return obj;
  `).toMatchInlineSnapshot(`
    const obj = {
      foo: foo,
      bar: 1
    };
    foo++;
    return obj;
  `))

it('inline properties and object', () =>
  expectJS(`
    const obj = {};
    obj.foo = 'foo';
    return obj;
  `).toMatchInlineSnapshot(`
    return {
      foo: 'foo'
    };
  `))

it('computed properties', () =>
  expectJS(`
    const obj = {};
    obj["a b c"] = 1;
    obj[1] = 2;
    return obj;
  `).toMatchInlineSnapshot(`
    return {
      "a b c": 1,
      1: 2
    };
  `))

it('ignore circular reference', () =>
  expectJS(`
    const obj = {};
    obj.foo = obj;
  `).toMatchInlineSnapshot(`
    const obj = {};
    obj.foo = obj;
  `))

it('ignore call with possible circular reference', () =>
  expectJS(`
    const obj = {};
    obj.foo = fn();
  `).toMatchInlineSnapshot(`
    const obj = {};
    obj.foo = fn();
  `))
