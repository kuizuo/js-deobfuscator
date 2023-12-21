import { it } from 'vitest'
import { testTransform } from '../../../test'
import { computedProperties } from '../transforms'

const expectJS = testTransform(computedProperties)

it('member expression', () => {
  expectJS(`
    require("foo")["default"]?.["_"];
  `).toMatchInlineSnapshot('require("foo").default?._;')
})

it('object', () => {
  expectJS(`
    const x = { ["foo"](){}, ["bar"]: 1 };
  `).toMatchInlineSnapshot(`
    const x = {
      foo() {},
      bar: 1
    };
  `)
})

it('class', () => {
  expectJS(`
    class Foo {
      ["foo"](){}
      ["bar"] = 1;
    }
  `).toMatchInlineSnapshot(`
    class Foo {
      foo() {}
      bar = 1;
    }
  `)
})

it('ignore invalid identifier', () =>
  expectJS(`
    console["1"]("hello");
  `).toMatchInlineSnapshot('console["1"]("hello");'))

it('ignore __proto__ property', () =>
  expectJS(`
    const x = { ["__proto__"]: 1 };
  `).toMatchInlineSnapshot(`
    const x = {
      ["__proto__"]: 1
    };
  `))

it('ignore constructor method', () =>
  expectJS(`
    class Foo {
      ["constructor"](){}
    }
  `).toMatchInlineSnapshot(`
    class Foo {
      ["constructor"]() {}
    }
  `))
