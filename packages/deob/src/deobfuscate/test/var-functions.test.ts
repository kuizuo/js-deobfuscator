import { testTransform } from '../../../test'
import mergeObjectAssignments from '../var-functions'

const expectJS = testTransform(mergeObjectAssignments)

it('var to function declaration', () =>
  expectJS('var a = function() {}').toMatchInlineSnapshot(`
    function a() {}
  `))

it('var to async function declaration', () =>
  expectJS('var a = async function() {}').toMatchInlineSnapshot(`
    async function a() {}
  `))

it('ignore when the function has a name', () =>
  expectJS('var a = function b() {}').toMatchInlineSnapshot(`
    var a = function b() {};
  `))

it('ignore when the function is in a for loop', () =>
  expectJS('for (var a = function() {}; false;) {}').toMatchInlineSnapshot(`
    for (var a = function () {}; false;) {}
  `))
