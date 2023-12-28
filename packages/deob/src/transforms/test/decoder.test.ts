import { describe, expect, it } from 'vitest'
import { parse } from '@babel/parser'
import { findDecoderByCallCount } from '../find-decoder-by-call-count'
import { findDecoderByArray } from '../find-decoder-by-array'
import { evalCode, generate } from '../..'
import { VMDecoder, VMSetupCode, createNodeSandbox } from '../../deobfuscate/vm'
import { designDecoder } from '../design-decoder'
import { decodeStrings } from '../decode-strings'

describe('decoder', async () => {
  it('find decoder by call count', () => {
    const ast = parse(`
      function decoder(a){
        return atob(a)
      }
  
      decoder("SGVsbG8sIHdvcmxk")
      decoder("ZGVidWdnZXI=")
      `)

    const { decoders, setupCode } = findDecoderByCallCount(ast, 2)

    evalCode(setupCode)
    decodeStrings(decoders)

    decoders.forEach(d => d.path.remove())

    expect(decoders[0].name).toBe('decoder')
    expect(generate(ast)).toMatchInlineSnapshot(`
      ""Hello, world";
      "debugger";"
    `)
  })
  it('find decoder by array', () => {
    const ast = parse(`
      var arr = ["hello,world", "debugger"]
      function decoder(i){
        return arr[i]
      }
  
      decoder(0)
      decoder(1)
      `)

    const { stringArray, decoders, setupCode } = findDecoderByArray(ast, 2)

    evalCode(setupCode)
    decodeStrings(decoders)

    stringArray?.path.remove()
    decoders.forEach(d => d.path.remove())
    expect(stringArray!.name).toBe('arr')
    expect(decoders[0].name).toBe('decoder')

    expect(generate(ast)).toMatchInlineSnapshot(`
      ""hello,world";
      "debugger";"
    `)
  })
})
