import type * as t from '@babel/types'
import traverse from '@babel/traverse'
import { Decoder } from '../deobfuscate/decoder'

export function collectDecoders(ast: t.Node, decoderNames: string | string[]): Decoder[] {
  const names = Array.isArray(decoderNames) ? decoderNames : [decoderNames]

  const foundDecoders: Decoder[] = []

  traverse(ast, {
    FunctionDeclaration(path) {
      const { id } = path.node
      const fnName = id?.name

      if (fnName && names.includes(fnName)) {
        foundDecoders.push(new Decoder(fnName, fnName, path))
      }
    },
  })

  return foundDecoders
}
