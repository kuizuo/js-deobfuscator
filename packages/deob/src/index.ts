import type { ParseResult } from '@babel/parser'
import type * as t from '@babel/types'
import type { ArrayRotator } from './deobfuscate/array-rotator'
import type { Decoder } from './deobfuscate/decoder'
import type { StringArray } from './deobfuscate/string-array'
import type { Options } from './options'
import { join, normalize } from 'node:path'
import { codeFrameColumns } from '@babel/code-frame'
import { parse } from '@babel/parser'
import { applyTransform, applyTransforms, codePrettier, enableLogger, generate, deobLogger as logger } from './ast-utils'
import controlFlowObject from './deobfuscate/control-flow-object'
import controlFlowSwitch from './deobfuscate/control-flow-switch'
import deadCode from './deobfuscate/dead-code'
import debugProtection from './deobfuscate/debug-protection'
import evaluateGlobals from './deobfuscate/evaluate-globals'
import inlineDecoderWrappers from './deobfuscate/inline-decoder-wrappers'
import inlineObjectProps from './deobfuscate/inline-object-props'
import mergeObjectAssignments from './deobfuscate/merge-object-assignments'

import selfDefending from './deobfuscate/self-defending'
import varFunctions from './deobfuscate/var-functions'

import { evalCode } from './deobfuscate/vm'
import { defaultOptions, mergeOptions } from './options'
import { collectDecoders } from './transforms/collect-decoders'
import { decodeStrings } from './transforms/decode-strings'
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
  evalCode,
  type Options,
}

export interface DeobResult {
  code: string
  save: (path: string) => Promise<void>
}

export function parseCode(code: string): ParseResult<t.File> {
  return parse(code, {
    sourceType: 'unambiguous',
    allowReturnOutsideFunction: true,
    errorRecovery: true,
    plugins: ['jsx'],
  })
}

// TODO: 错误输出处理 定位代码位置
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

function buildDecryptionSummaryLog(map: Map<string, string>) {
  const shorten = (value: string, max = 120) => {
    const clean = value.replace(/\s+/g, ' ').trim()
    return clean.length <= max ? clean : `${clean.slice(0, max)}...`
  }

  const preview = Array.from(map.entries()).slice(0, 5)
  return [
    '=== 解密结果预览 ===',
    `- 解密条目: ${map.size} 个`,
    ...preview.map(([k, v]) => `  • ${k} -> ${shorten(String(v))}`),
    '====================',
  ].join('\n')
}

export async function deob(rawCode: string, options: Options = {}): Promise<DeobResult> {
  mergeOptions(options)
  const opts = options

  enableLogger('Deob')

  if (!rawCode)
    throw new Error('请载入js代码')

  const ast: ParseResult<t.File> = parse(rawCode, {
    sourceType: 'unambiguous',
    allowReturnOutsideFunction: true,
    errorRecovery: true,
    plugins: ['jsx'],
  })

  let outputCode = ''

  const stages = [
    // 格式预处理
    () => {
      applyTransforms(
        ast,
        [blockStatements, sequence, splitVariableDeclarations, varFunctions, rawLiterals],
        { name: 'prepare' },
      )
    },
    // 定位解密器
    async () => {
      let stringArray: StringArray | undefined
      let decoders: Decoder[] = []
      let rotators: ArrayRotator[] = []
      let setupCode: string = ''

      if (opts.decoderLocationMethod === 'stringArray') {
        const { decoders: ds, rotators: r, stringArray: s, setupCode: scode } = findDecoderByArray(ast)

        stringArray = s as any
        rotators = r
        decoders = collectDecoders(ast, ds.map(d => d.name))
        setupCode = scode
      }
      else if (opts.decoderLocationMethod === 'callCount') {
        const { decoders: ds, setupCode: scode } = findDecoderByCallCount(ast, opts.decoderCallCount)
        decoders = collectDecoders(ast, ds.map(d => d.name))
        setupCode = scode
      }
      else if (opts.decoderLocationMethod === 'evalCode') {
        await evalCode(opts.sandbox!, opts.setupCode!)
        decoders = collectDecoders(ast, opts.decoderNames!)
      }

      logger(`${stringArray ? `字符串数组: ${stringArray?.name} (共 ${stringArray?.length} 项) 被引用 ${stringArray?.references.length} 处` : '没找到字符串数组'} | ${decoders.length ? `解密器函数: ${decoders.map(d => d.name)}` : '没找到解密器函数'}`)

      await evalCode(opts.sandbox!, setupCode)

      for (const decoder of decoders) {
        applyTransform(
          ast,
          inlineDecoderWrappers,
          decoder.path,
        )
      }

      // 对象引用替换
      applyTransform(ast, inlineObjectProps)

      // 执行解密器
      const map = await decodeStrings(opts.sandbox!, decoders as Decoder[])

      if (map.size > 0) {
        logger(buildDecryptionSummaryLog(map))
      }

      if (decoders.length > 0) {
        if (stringArray?.path) {
          stringArray.path.remove()
        }
        rotators.forEach(rotator => rotator.remove())
        decoders.forEach(decoder => decoder.path.remove())
      }

      return { changes: (map as any)?.size ?? decoders.length }
    },
    // 控制流平坦化
    () => applyTransforms(
      ast,
      [mergeStrings, deadCode, controlFlowObject, controlFlowSwitch],
      { noScope: true },
    ),
    // unminify
    () => applyTransforms(ast, [transpile, unminify]),
    // 变量命名优化
    () => applyTransform(ast, mangle, getMangleMatcher(opts)),
    // 移除自卫代码
    () => applyTransforms(
      ast,
      [
        [selfDefending, debugProtection],
      ].flat(),
    ),
    // 合并对象
    () => applyTransforms(ast, [mergeObjectAssignments, evaluateGlobals]),

    opts.isMarkEnable && (() => {
      logger(`关键字列表: [${opts.keywords.join(', ')}]`)
      markKeyword(ast, opts.keywords)
      return { changes: opts.keywords.length }
    }),

    () => outputCode = generate(ast),
  ].filter(Boolean) as (() => unknown)[]

  for (let i = 0; i < stages.length; i++) {
    await stages[i]()
  }

  return {
    code: outputCode,
    async save(path) {
      const { mkdir, writeFile } = await import('node:fs/promises')
      path = normalize(path)
      await mkdir(path, { recursive: true })
      await writeFile(join(path, 'output.js'), outputCode, 'utf8')
    },
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
