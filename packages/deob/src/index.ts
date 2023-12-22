import { join, normalize } from 'node:path'
import * as parser from '@babel/parser'
import { codeFrameColumns } from '@babel/code-frame'
import type * as t from '@babel/types'
import debug from 'debug'
import { applyTransform, applyTransforms, codePrettier, generate } from './ast-utils'
import type { Options } from './options'
import { defaultOptions, mergeOptions } from './options'
import type { StringArray } from './deobfuscate/string-array'
import type { Decoder } from './deobfuscate/decoder'
import type { ArrayRotator } from './deobfuscate/array-rotator'
import inlineDecoderWrappers from './deobfuscate/inline-decoder-wrappers'
import inlineObjectProps from './deobfuscate/inline-object-props'
import deadCode from './deobfuscate/dead-code'
import controlFlowObject from './deobfuscate/control-flow-object'
import controlFlowSwitch from './deobfuscate/control-flow-switch'
import mergeObjectAssignments from './deobfuscate/merge-object-assignments'
import varFunctions from './deobfuscate/var-functions'
import debugProtection from './deobfuscate/debug-protection'
import selfDefending from './deobfuscate/self-defending'
import forLoopHoist from './deobfuscate/for-loop-hoist'

import { blockStatements, mergeStrings, rawLiterals, sequence, splitVariableDeclarations } from './unminify/transforms'
import { unminify } from './unminify'

import { findDecoderByArray } from './transforms/find-decoder-by-array'
import { findDecoderByCallCount } from './transforms/find-decoder-by-call-count'
import { designDecoder } from './transforms/design-decoder'
import { decodeStrings } from './transforms/decode-strings'
import { markKeyword } from './transforms/mark-keyword'
import mangle from './transforms/mangle'

export {
  type Options,
  defaultOptions,
  codePrettier,
  parser,
  generate,
}

interface DeobResult {
  code: string
  save(path: string): Promise<void>
  historys: parser.ParseResult<t.File>[]
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

const logger = debug('Deob')

export class Deob {
  public ast: parser.ParseResult<t.File>
  private options: Required<Options>

  constructor(private rawCode: string, options: Options = {}) {
    mergeOptions(options)
    this.options = options

    // debug.enable('webcrack:*')
    debug.enable('Deob')

    if (!rawCode)
      throw new Error('请载入js代码')
    console.clear()

    try {
      this.ast = parser.parse(rawCode, { sourceType: 'script' })
    }
    catch (error) {
      console.error('代码初始化解析有误!')

      handleError(error, rawCode)
      throw new Error(`代码初始化解析有误! ${error}`)
    }
  }

  get code() {
    const code = generate(this.ast)
    return code
  }

  /**
   * 当执行替换(replace,rename等)操作时,需要执行一次更新以获取最新状态 ast
   */
  reParse() {
    const jscode = generate(this.ast, {
      minified: false,
      jsescOption: { minimal: true },
      compact: false,
      comments: true,
    })

    try {
      this.ast = parser.parse(jscode)
    }
    catch (error) {
      handleError(error, jscode)
      throw new Error(`代码替换有误,解析失败! 请到控制台中查看 ${error}`)
    }
  }

  prepare() {
    applyTransforms(this.ast, [blockStatements, sequence, splitVariableDeclarations, varFunctions, rawLiterals])
  }

  unminify() {
    applyTransform(this.ast, unminify)
    this.reParse()
  }

  eval(code: string) {
    try {
      const result = global.eval(code)
      logger('注入代码执行结果', result)
    }
    catch (error) {
      logger(`code to be eval:\n${code}`)
      throw new Error('evalCode 无法运行, 请在控制台中查看错误信息')
    }
  }

  run(): DeobResult {
    let outputCode = ''

    const historys: parser.ParseResult<t.File>[] = []

    const options = this.options

    const stages = [
      /** 格式预处理 */
      () => this.prepare(),
      /** 执行解密器 */
      () => {
        let stringArray: StringArray | undefined
        let decoders: Decoder[] = []
        let rotators: ArrayRotator[] = []
        let setupCode: string = ''

        if (options.decoderLocationMethod === 'stringArray') {
          const { decoders: ds, rotators: r, stringArray: s, setupCode: scode } = findDecoderByArray(this.ast, options.stringArraylength)

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
          this.eval(options.setupCode!)
          decoders = designDecoder(this.ast, options.designDecoderName!)
        }

        logger(`${stringArray ? `字符串数组: ${stringArray?.name} 数组长度:${stringArray?.length}` : '没找到字符串数组'}`)
        logger(`${decoders.length ? `解密器: ${decoders.map(d => d.name)}` : '没找到解密器'}`)

        this.eval(setupCode)

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

        logger('解密结果:', map)

        if (options.isRemoveDecoder && !options.isStrongRemove) {
          stringArray?.path.remove()
          rotators.forEach(r => r.remove())
          decoders.forEach(d => d.path?.remove())
        }
      },
      /** 对象引用替换 */
      () => applyTransform(this.ast, inlineObjectProps),
      /** 控制流平坦化 */
      () => {
        for (let i = 0; i < options.execCount; i++) {
          applyTransform(this.ast, forLoopHoist)
          applyTransform(this.ast, splitVariableDeclarations)

          applyTransforms(
            this.ast,
            [
              mergeStrings,
              deadCode,
              controlFlowObject,
              controlFlowSwitch,
            ],
          )
          this.reParse()
        }
      },
      /** 合并对象 */
      () => applyTransform(this.ast, mergeObjectAssignments),
      /** 去 minify */
      () => applyTransform(this.ast, unminify),
      /** 对象命名优化 */
      options.mangle && (() => applyTransform(this.ast, mangle)),
      /** 移除自卫代码 */
      () => {
        return applyTransforms(
          this.ast,
          [
            [selfDefending, debugProtection],
          ].flat(),
        )
      },
      /** 标记关键字 */
      options.isMarkEnable && (() => markKeyword(this.ast, options.keywords)),
      /** 输出代码 */
      () => (outputCode = generate(this.ast)),
    ].filter(Boolean) as (() => unknown)[]

    for (let i = 0; i < stages.length; i++) {
      stages[i]()

      if (options.isDebug) {
        const jscode = generate(this.ast, {
          minified: false,
          jsescOption: { minimal: true },
          compact: false,
          comments: true,
        })

        try {
          historys.push(parser.parse(jscode))
        }
        catch (error) {
          handleError(error, jscode)
          throw new Error(`代码替换有误,解析失败! 请到控制台中查看 ${error}`)
        }
      }
    }

    if (options.isStrongRemove) {
      options.isStrongRemove = false
      options.isRemoveDecoder = true
      this.reParse()
      return this.run()
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
