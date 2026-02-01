import { parse } from '@babel/parser'
import { describe, expect, it } from 'vitest'
import { evalCode } from '../..'
import { generate } from '../../ast-utils'
import { createNodeSandbox } from '../../deobfuscate'
import { decodeStrings } from '../decode-strings'
import { findDecoderByArray } from '../find-decoder-by-array'
import { findDecoderByCallCount } from '../find-decoder-by-call-count'

describe('decoder', async () => {
  it('find decoder by call count', () => {
    const ast = parse(`
      function decoder(a){
        return atob(a)
      }
  
      decoder("SGVsbG8sIHdvcmxk")
      decoder("ZGVidWdnZXI=")
      `)

    const sandbox = createNodeSandbox()
    const { decoders, setupCode } = findDecoderByCallCount(ast, 2)

    evalCode(sandbox, setupCode)
    decodeStrings(sandbox, decoders)

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
      (function(a, b) {
        // rotator function
      })(arr, 0x128)

      decoder(0)
      decoder(1)
      `)

    const sandbox = createNodeSandbox()

    const { stringArray, decoders, rotators, setupCode } = findDecoderByArray(ast)

    evalCode(sandbox, setupCode)
    decodeStrings(sandbox, decoders)

    stringArray?.path.remove()
    decoders.forEach(d => d.path.remove())
    rotators.forEach(r => r.remove())
    expect(stringArray!.name).toBe('arr')
    expect(decoders[0].name).toBe('decoder')

    expect(generate(ast)).toMatchInlineSnapshot(`
      ""hello,world";
      "debugger";"
    `)
  })
})
