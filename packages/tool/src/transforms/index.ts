import type { Node, TraverseOptions } from '@babel/traverse'
import traverse, { visitors } from '@babel/traverse'
import debug from 'debug'
import type { Objects } from '../deobfuscator/saveAllObject'

const logger = debug('deob:transforms')

export interface TransformState {
  changes: number
  objects?: Objects
}

export interface Transform<TOptions = unknown> {
  name: string
  run?: (ast: Node, state: TransformState, options?: TOptions) => void
  visitor?: (options?: TOptions) => TraverseOptions<TransformState>
}

export function applyTransform<TOptions>(
  ast: Node,
  transform: Transform<TOptions>,
  options?: TOptions,
): TransformState {
  logger(`${transform.name}: started`)

  const state: TransformState = { changes: 0 }

  transform.run?.(ast, state, options)
  if (transform.visitor)
    traverse(ast, transform.visitor(options), undefined, state)

  logger(`${transform.name}: finished with ${state.changes} changes`)

  return state
}

export function applyTransforms(
  ast: Node,
  transforms: Transform[],
  name?: string,
): TransformState {
  name ??= transforms.map(t => t.name).join(', ')
  logger(`${name}: started`)

  const state: TransformState = { changes: 0 }

  for (const transform of transforms)
    transform.run?.(ast, state)

  const traverseOptions = transforms.flatMap(t => t.visitor?.() ?? [])
  if (traverseOptions.length > 0) {
    const visitor = visitors.merge(traverseOptions)
    // @ts-expect-error regression from https://github.com/babel/babel/pull/15702
    visitor.noScope = traverseOptions.every(t => t.noScope)
    traverse(ast, visitor, undefined, state)
  }

  logger(`${name}: finished with ${state.changes} changes`)

  return state
}
