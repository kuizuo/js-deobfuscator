import jsxNew from '../src/transforms/jsx-new'
import { testTransform } from '.'

const expectJS = testTransform(jsxNew)

it('tag name type', () =>
  expectJS('jsx("div", {});').toMatchInlineSnapshot('<div />;'))

it('component type', () =>
  expectJS('jsx(TodoList, {});').toMatchInlineSnapshot('<TodoList />;'))

it('deeply nested member expression type', () =>
  expectJS('jsx(components.list.TodoList, {});').toMatchInlineSnapshot(
    '<components.list.TodoList />;',
  ))

it('rename component with conflicting name', () =>
  expectJS('function a(){} jsx(a, {});').toMatchInlineSnapshot(`
      function _Component() {}
      <_Component />;
    `))

it('attributes', () =>
  expectJS(
    'jsx("div", { "data-hover": "tooltip", style: { display: "block" } });',
  ).toMatchInlineSnapshot(`
      <div data-hover="tooltip" style={{
        display: "block"
      }} />;
    `))

it('spread attributes', () =>
  expectJS('jsx("div", {...props});').toMatchInlineSnapshot(
    '<div {...props} />;',
  ))

it('children', () =>
  expectJS(
    'jsx("div", { children: jsxs("span", { children: ["Hello ", name ] }) });',
  ).toMatchInlineSnapshot('<div><span>Hello {name}</span></div>;'))

it('text with special chars', () =>
  expectJS(
    'jsx("div", { children: ".style { color: red; }" });',
  ).toMatchInlineSnapshot('<div>{".style { color: red; }"}</div>;'))

it('component with key', () =>
  expectJS('jsx("div", {}, "test")').toMatchInlineSnapshot(
    '<div key="test" />;',
  ))

it('array expression child', () =>
  expectJS('jsx("div", { children: [1] })').toMatchInlineSnapshot(
    '<div>{[1]}</div>;',
  ))

it('fragment', () =>
  expectJS(
    'jsxs(React.Fragment, { children: [jsx("span", {}), "test"] });',
  ).toMatchInlineSnapshot('<><span />test</>;'))

it('fragment with key', () =>
  expectJS('jsx(React.Fragment, {}, o)').toMatchInlineSnapshot(
    '<React.Fragment key={o} />;',
  ))

it('remove leading comments', () =>
  expectJS(
    'return /*#__PURE__*/_jsx("h1", {children: /*#__PURE__*/_jsx("div", {})});',
  ).toMatchInlineSnapshot('return <h1><div /></h1>;'))

it('props with escaped strings', () =>
  expectJS(String.raw`
    _jsx(Foo, { bar: 'abc' });
    _jsx(Foo, { bar: 'a\\nbc' });
    _jsx(Foo, { bar: 'ab\\tc' });
    _jsx(Foo, { bar: 'ab"c' });
    _jsx(Foo, { bar: "ab'c" });
  `).toMatchInlineSnapshot(`
    <Foo bar='abc' />;
    <Foo bar={'a\\\\nbc'} />;
    <Foo bar={'ab\\\\tc'} />;
    <Foo bar={'ab"c'} />;
    <Foo bar="ab'c" />;
  `))
