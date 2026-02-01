import type { ParseResult } from '@babel/parser'
import type * as t from '@babel/types'
import type { ArrayRotator } from './deobfuscate/array-rotator'
import type { Decoder } from './deobfuscate/decoder'
import type { StringArray } from './deobfuscate/string-array'
import type { Options } from './options'
import { join, normalize } from 'node:path'
import { codeFrameColumns } from '@babel/code-frame'
import { parse } from '@babel/parser'
import { applyTransform, applyTransformAsync, applyTransforms, codePrettier, codePreview, enableLogger, generate, deobLogger as logger } from './ast-utils'
import deobfuscate from './deobfuscate'
import controlFlowObject from './deobfuscate/control-flow-object'
import controlFlowSwitch from './deobfuscate/control-flow-switch'
import deadCode from './deobfuscate/dead-code'
import debugProtection from './deobfuscate/debug-protection'
import evaluateGlobals from './deobfuscate/evaluate-globals'
import inlineDecoderWrappers from './deobfuscate/inline-decoder-wrappers'
import inlineObjectProps from './deobfuscate/inline-object-props'
import mergeObjectAssignments from './deobfuscate/merge-object-assignments'
import myDeobfuscate from './deobfuscate/my-deobfuscate'

import selfDefending from './deobfuscate/self-defending'
import varFunctions from './deobfuscate/var-functions'

import { defaultOptions, mergeOptions } from './options'
import { decodeStrings } from './transforms/decode-strings'
import { designDecoder } from './transforms/design-decoder'
import { findDecoderByArray } from './transforms/find-decoder-by-array'
import { findDecoderByCallCount } from './transforms/find-decoder-by-call-count'
import mangle from './transforms/mangle'
import { markKeyword } from './transforms/mark-keyword'
import transpile from './transpile'
import unminify from './unminify'
import { blockStatements, mergeStrings, rawLiterals, sequence, splitVariableDeclarations } from './unminify/transforms'

export {
  codePrettier,
  defaultOptions,
  generate,
  type Options,
}

interface DeobResult {
  code: string
  save: (path: string) => Promise<void>
  historys: ParseResult<t.File>[]
}

function handleError(error: any, rawCode: string) {
  if (error instanceof SyntaxError) {
    const codeFrame = codeFrameColumns(rawCode, {
      start: {
        line: (error as any).loc.line,
        column: (error as any).loc.column + 1,
      },
    }, {
      highlightCode: true,
      message: error.message,
    })

    console.error(codeFrame)
  }
}

function shorten(value: string, max = 120) {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= max)
    return clean
  return `${clean.slice(0, max)}...`
}

function buildDecryptionSummaryLog(map: Map<string, string>) {
  const lines = ['=== 解密结果预览 ===']

  lines.push(`- 解密条目: ${map.size} 个`)
  if (map.size) {
    const preview = Array.from(map.entries()).slice(0, 5)
    preview.forEach(([key, value]) => {
      lines.push(`  • ${key} -> ${shorten(String(value))}`)
    })
  }

  lines.push('====================')
  return lines.join('\n')
}

export function evalCode(code: string) {
  try {
    const result = global.eval(code)
  }
  catch (error) {
    logger(`eval code:\n${code}`)
    throw new Error(`evalCode 无法运行, 请在控制台中查看错误信息: ${(error as any).message}`)
  }
}

export class Deob {
  public ast: ParseResult<t.File> = null!
  private options: Required<Options>

  constructor(private rawCode: string, options: Options = {}) {
    mergeOptions(options)
    this.options = options

    enableLogger('Deob')

    if (!rawCode)
      throw new Error('请载入js代码')
  }

  get code() {
    const code = generate(this.ast)
    return code
  }

  async run(): Promise<DeobResult> {
    let outputCode = ''

    this.ast = parse(this.rawCode, {
      sourceType: 'unambiguous',
      allowReturnOutsideFunction: true,
      errorRecovery: true,
      plugins: ['jsx'],
    })

    const options = this.options

    const historys: ParseResult<t.File>[] = []

    const stages = [
      // 格式预处理
      () => {
        applyTransforms(
          this.ast,
          [blockStatements, sequence, splitVariableDeclarations, varFunctions, rawLiterals],
          { name: 'prepare' },
        )
      },
      // webcrack 反混淆
      () => applyTransformAsync(this.ast, deobfuscate, options.sandbox),
      // 对象引用替换
      () => applyTransform(this.ast, inlineObjectProps),
      // 定位解密器
      () => {
        let stringArray: StringArray | undefined
        let decoders: Decoder[] = []
        let rotators: ArrayRotator[] = []
        let setupCode: string = ''

        if (options.decoderLocationMethod === 'stringArray') {
          const { decoders: ds, rotators: r, stringArray: s, setupCode: scode } = findDecoderByArray(this.ast)

          stringArray = s as any
          rotators = r
          decoders = designDecoder(this.ast, ds.map(d => d.name))
          setupCode = scode
        }
        else if (options.decoderLocationMethod === 'callCount') {
          const { decoders: ds, setupCode: scode } = findDecoderByCallCount(this.ast, options.decoderCallCount)
          decoders = designDecoder(this.ast, ds.map(d => d.name))
          setupCode = scode
        }
        else if (options.decoderLocationMethod === 'evalCode') {
          evalCode(options.setupCode!)
          decoders = designDecoder(this.ast, options.designDecoderName!)
        }

        logger(`${stringArray ? `字符串数组: ${stringArray?.name} (共 ${stringArray?.length} 项) 被引用 ${stringArray?.references.length} 处` : '没找到字符串数组'} | ${decoders.length ? `解密器函数: ${decoders.map(d => d.name)}` : '没找到解密器函数'}`)

        evalCode(setupCode)

        for (let i = 0; i < options.inlineWrappersDepth; i++) {
          for (const decoder of decoders) {
            applyTransform(
              this.ast,
              inlineDecoderWrappers,
              decoder.path,
            )
          }
        }

        const map = decodeStrings(decoders)

        logger(buildDecryptionSummaryLog(map))

        const removedSnippets: string[] = []
        const addSnippet = (node: t.Node) => {
          if (removedSnippets.length < 3)
            removedSnippets.push(codePreview(node))
        }

        if (decoders.length > 0) {
          if (stringArray?.path) {
            stringArray.path.remove()
          }
          rotators.forEach(rotator => rotator.remove())
          decoders.forEach(decoder => decoder.path.remove())
        }

        logger(`已移除解密相关节点${removedSnippets.length ? `，片段:\n${removedSnippets.join('\n')}` : ''}`)

        return { changes: (map as any)?.size ?? decoders.length }
      },
      // 对象引用替换
      () => applyTransform(this.ast, inlineObjectProps),
      // 控制流平坦化
      () => applyTransforms(
        this.ast,
        [mergeStrings, deadCode, controlFlowObject, controlFlowSwitch],
        { noScope: true },
      ),
      // 合并对象
      () => applyTransform(this.ast, mergeObjectAssignments),
      // unminify
      () => applyTransforms(this.ast, [transpile, unminify]),
      // 变量命名优化
      () => applyTransform(this.ast, mangle, getMangleMatcher(options)),
      // 移除自卫代码
      () => applyTransforms(
        this.ast,
        [
          [selfDefending, debugProtection],
        ].flat(),
      ),
      // 合并对象
      () => applyTransforms(this.ast, [mergeObjectAssignments, evaluateGlobals]),

      options.isMarkEnable && (() => {
        logger(`关键字列表: [${options.keywords.join(', ')}]`)
        markKeyword(this.ast, options.keywords)
        return { changes: options.keywords.length }
      }),

      () => outputCode = generate(this.ast),
    ].filter(Boolean) as (() => unknown)[]

    for (let i = 0; i < stages.length; i++) {
      await stages[i]()
    }

    return {
      code: outputCode,
      historys,
      async save(path) {
        const { mkdir, writeFile } = await import('node:fs/promises')
        path = normalize(path)
        await mkdir(path, { recursive: true })
        await writeFile(join(path, 'output.js'), outputCode, 'utf8')
      },
    }
  }
}

function getMangleMatcher(options: Options): ((id: string) => boolean) | undefined {
  const legacyBoolean = (options as any).mangle
  const mode
    = options.mangleMode ?? (typeof legacyBoolean === 'boolean' ? (legacyBoolean ? 'all' : 'off') : 'off')

  switch (mode) {
    case 'off':
      return
    case 'all':
      return () => true
    case 'hex': {
      const re = /_0x[a-f\d]+/i
      return id => re.test(id)
    }
    case 'short':
      return id => id.length <= 2
    case 'custom': {
      const pattern = options.manglePattern ?? ''
      const flags = options.mangleFlags ?? ''
      try {
        const re = new RegExp(pattern, flags)
        return id => re.test(id)
      }
      catch {

      }
    }
  }
}
