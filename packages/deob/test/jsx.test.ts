import jsx from '../src/transforms/jsx'
import { testTransform } from '.'

const expectJS = testTransform(jsx)

it('tag name type', () =>
  expectJS('React.createElement("div", null);').toMatchInlineSnapshot(
    '<div />;',
  ))

it('component type', () =>
  expectJS('React.createElement(TodoList, null);').toMatchInlineSnapshot(
    '<TodoList />;',
  ))

it('deeply nested member expression type', () =>
  expectJS(
    'React.createElement(components.list.TodoList, null);',
  ).toMatchInlineSnapshot('<components.list.TodoList />;'))

it('rename component with conflicting name', () =>
  expectJS('function a(){} React.createElement(a, null);')
    .toMatchInlineSnapshot(`
    function _Component() {}
    <_Component />;
  `))

it('attributes', () =>
  expectJS(
    'React.createElement("div", { "data-hover": "tooltip", style: { display: "block" } });',
  ).toMatchInlineSnapshot(`
  <div data-hover="tooltip" style={{
    display: "block"
  }} />;
`))

it('spread attributes', () =>
  expectJS('React.createElement("div", {...props});').toMatchInlineSnapshot(
    '<div {...props} />;',
  ))

it('children', () =>
  expectJS(
    'React.createElement("div", null, React.createElement("span", null, "Hello ", name));',
  ).toMatchInlineSnapshot('<div><span>Hello {name}</span></div>;'))

it('spread children', () =>
  expectJS(
    'React.createElement("div", null, ...children);',
  ).toMatchInlineSnapshot('<div>{...children}</div>;'))

it('text with special chars', () =>
  expectJS(
    'React.createElement("div", null, ".style { color: red; }");',
  ).toMatchInlineSnapshot('<div>{".style { color: red; }"}</div>;'))

it('fragment', () =>
  expectJS(
    'React.createElement(React.Fragment, null, React.createElement("span", null), "test");',
  ).toMatchInlineSnapshot('<><span />test</>;'))

it('fragment with key', () =>
  expectJS(
    'React.createElement(React.Fragment, { key: o })',
  ).toMatchInlineSnapshot('<React.Fragment key={o} />;'))

it('fragment with children', () =>
  expectJS(
    'React.createElement(React.Fragment, null, "test", ...children);',
  ).toMatchInlineSnapshot('<>test{...children}</>;'))

it('remove leading comments', () =>
  expectJS(
    'return /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("div", null));',
  ).toMatchInlineSnapshot('return <h1><div /></h1>;'))

it('props with escaped strings', () =>
  expectJS(String.raw`
    React.createElement(Foo, {bar: 'abc'});
    React.createElement(Foo, {bar: 'a\\nbc'});
    React.createElement(Foo, {bar: 'ab\\tc'});
    React.createElement(Foo, {bar: 'ab"c'});
    React.createElement(Foo, {bar: "ab'c"});
  `).toMatchInlineSnapshot(`
    <Foo bar='abc' />;
    <Foo bar={'a\\\\nbc'} />;
    <Foo bar={'ab\\\\tc'} />;
    <Foo bar={'ab"c'} />;
    <Foo bar="ab'c" />;
  `))
