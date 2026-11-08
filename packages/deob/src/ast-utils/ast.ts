import * as t from '@babel/types'

export function getPropName(node: t.Node): string | undefined {
  if (t.isIdentifier(node)) {
    return node.name
  }
  if (t.isStringLiteral(node)) {
    return node.value
  }
  if (t.isNumericLiteral(node)) {
    return node.value.toString()
  }
}

export function escapeTemplateLiteral(str: string): string {
  return str
    .replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('$', '\\$')
    .replaceAll('\0', '\\x00')
    .replaceAll('\b', '\\b')
    .replaceAll('\f', '\\f')
    .replaceAll('\r', '\\r')
    .replaceAll('\t', '\\t')
    .replaceAll('\v', '\\v')
    .replaceAll(/[\uD800-\uDFFF]/gu, char => JSON.stringify(char).slice(1, -1))
}
