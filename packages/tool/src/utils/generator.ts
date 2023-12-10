import type { GeneratorOptions } from '@babel/generator'
import babelGenerate from '@babel/generator'
import type * as t from '@babel/types'

const defaultOptions: GeneratorOptions = { jsescOption: { minimal: true } }

export function generate(
  ast: t.Node,
  options: GeneratorOptions = defaultOptions,
): string {
  return babelGenerate(ast, options).code
}
