import { it } from 'vitest'
import { testTransform } from '../../../test'
import { sequence } from '../transforms'

const expectJS = testTransform(sequence)

it('to statements', () =>
  expectJS(`
    if (a) b(), c();
  `).toMatchInlineSnapshot(`
    if (a) {
      b();
      c();
    }
  `))

it('rearrange from return', () =>
  expectJS(`
    function f() {
      return a(), b(), c();
    }
  `).toMatchInlineSnapshot(`
    function f() {
      a();
      b();
      return c();
    }
  `))

it('rearrange from if', () =>
  expectJS(`
    if (a(), b()) c();
  `).toMatchInlineSnapshot(`
    a();
    if (b()) c();
  `))

it('rearrange from switch', () =>
  expectJS(`
    switch (a(), b()) {}
  `).toMatchInlineSnapshot(`
    a();
    switch (b()) {}
  `))

it('throw', () =>
  expectJS(`
    throw a(), b();
  `).toMatchInlineSnapshot(`
    a();
    throw b();
  `))

it('rearrange from for-in', () =>
  expectJS(`
    for (let key in a = 1, object) {}
  `).toMatchInlineSnapshot(`
    a = 1;
    for (let key in object) {}
  `))

it('rearrange from for loop init', () =>
  expectJS(`
    for((a(), b());;);
  `).toMatchInlineSnapshot(`
    a();
    b();
    for (;;);
  `))

it('rearrange from for loop update', () =>
  expectJS(`
    for(; i < 10; a(), b(), i++);
  `).toMatchInlineSnapshot(`
    for (; i < 10; i++) {
      a();
      b();
    }
  `))

it('rearrange variable declarator', () =>
  expectJS(`
   var t = (o = null, o);
  `).toMatchInlineSnapshot(`
    o = null;
    var t = o;
  `))

it('rearrange assignment', () => {
  expectJS(`
    t = (o = null, o);
  `).toMatchInlineSnapshot(`
    o = null;
    t = o;
  `)

  expectJS(`
    for (;;) a = (b, c);
  `).toMatchInlineSnapshot(`
    for (;;) {
      b;
      a = c;
    }
  `)
})

it('dont rearrange variable declarator in for loop', () =>
  expectJS(`
    for(let a = (b, c);;) {}
  `).toMatchInlineSnapshot(`
    b;
    for (let a = c;;) {}
  `))
