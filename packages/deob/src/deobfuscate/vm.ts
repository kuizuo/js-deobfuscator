import type { NodePath } from '@babel/traverse'
import type { CallExpression } from '@babel/types'
import type { ArrayRotator } from './array-rotator'
import type { Decoder } from './decoder'
import type { StringArray } from './string-array'
import { deobLogger, generate } from '../ast-utils'

export type Sandbox = (code: string) => Promise<unknown>

export function createNodeSandbox(): Sandbox {
  let runtime: Promise<{
    context: import('isolated-vm').Context
    isolate: import('isolated-vm').Isolate
  }> | undefined

  return async (code: string) => {
    runtime ??= import('isolated-vm').then(async ({ default: { Callback, Isolate } }) => {
      const isolate = new Isolate()
      const context = await isolate.createContext()
      await context.global.set('atob', new Callback(atob))
      await context.global.set('btoa', new Callback(btoa))
      return { context, isolate }
    })

    const { context } = await runtime
    return await context.eval(code, {
      timeout: 10_000,
      copy: true,
      filename: 'file:///obfuscated.js',
    }) as unknown
  }
}

export function createBrowserSandbox(): Sandbox {
  return () => {
    // TODO: use sandybox (not available in web workers though)
    throw new Error('Custom Sandbox implementation required.')
  }
}

export class VMDecoder {
  decoders: Decoder[]
  private setupCode: string
  private sandbox: Sandbox

  constructor(
    sandbox: Sandbox,
    stringArray: StringArray,
    decoders: Decoder[],
    rotator?: ArrayRotator,
  ) {
    this.sandbox = sandbox
    this.decoders = decoders

    // Generate as compact to bypass the self defense
    // (which tests someFunction.toString against a regex)
    const generateOptions = {
      compact: true,
      shouldPrintComment: () => false,
    }
    const stringArrayCode = generate(stringArray.path.node, generateOptions)
    const rotatorCode = rotator ? generate(rotator.node, generateOptions) : ''
    const decoderCode = decoders
      .map(decoder => generate(decoder.path.node, generateOptions))
      .join(';\n')

    this.setupCode = [stringArrayCode, rotatorCode, decoderCode].join(';\n')
  }

  async decode(calls: NodePath<CallExpression>[]): Promise<unknown[]> {
    const code = `(() => {
      ${this.setupCode}
      return [${calls.join(',')}]
    })()`

    try {
      const result = await this.sandbox(code)
      return result as unknown[]
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (_error) {
      // ignore
    }

    try {
      const result = await globalThis.eval(code)
      return result as unknown[]
    }
    catch (error) {
      deobLogger('global.eval error:', error)
      throw error
    }
  }
}

export async function evalCode(sandbox: Sandbox, code: string) {
  try {
    return await sandbox(code) as unknown
  }
  catch (sandboxError) {
    try {
      return globalThis.eval(code) as unknown
    }
    catch (evalError) {
      deobLogger('evalCode error:', evalError)
      throw sandboxError
    }
  }
}
