import * as parser from '@babel/parser'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import type { GeneratorOptions } from '@babel/generator'
import generator from '@babel/generator'
import { codeFrameColumns } from '@babel/code-frame'
import * as t from '@babel/types'

import { blockStatement } from '@codemod/matchers'
import { applyTransform, applyTransforms } from './transforms'

import deadCode from './transforms/deadCode'
import selfDefending from './transforms/selfDefending'
import markComment from './transforms/markComment'
import mergeStrings from './transforms/mergeStrings'
import deleteUnusedVar from './transforms/deleteUnusedVar'
import replaceConstantRef from './transforms/replaceConstantRef'
import transformSelfCallFn from './transforms/transformSelfCallFn'
import controlFlowSwitch from './deobfuscator/controlFlowSwitch'
import replaceDecoder from './deobfuscator/inlineDecoderStrings'
import { Decoder } from './deobfuscator/decoder'
import transformForLoop from './transforms/transformForLoop'
import type { Objects } from './deobfuscator/saveAllObject'
import saveAllObject from './deobfuscator/saveAllObject'
import replaceObjectProp from './deobfuscator/inlineObjectProps'
import sequence from './transforms/sequence'
import splitVariableDeclarations from './transforms/splitVariableDeclarations'
import numberExpressions from './transforms/numberExpressions'
import debugProtection from './deobfuscator/debugProtection'
import unminify from './transforms/unminify'
import inlineDecoderWrappers from './deobfuscator/inlineDecoderWrappers'

if (typeof window !== 'undefined')
  // eslint-disable-next-line no-global-assign
  global = window

interface GlobalState {
  objects: Objects
  decoders: Decoder[]
}

let globalState: GlobalState = {
  objects: {}, // 所有对象变量
  decoders: [], // 解密(器)函数列表
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

export class Deob {
  public ast: parser.ParseResult<t.File>

  private opts: GeneratorOptions
  private isLog: boolean
  private throwWithEval: boolean

  constructor(private rawCode: string, options: any = {}) {
    if (!rawCode)
      throw new Error('请载入js代码')
    console.clear()

    this.opts = options.opts || {
      minified: false,
      jsescOption: { minimal: true },
      compact: false,
      comments: true,
    }

    this.isLog = options.isLog ?? true
    this.throwWithEval = options.throwWithEval ?? false

    globalState = {
      objects: {},
      decoders: [],
    }

    try {
      this.ast = parser.parse(rawCode, { sourceType: 'script' })
    }
    catch (error) {
      console.error('代码初始化解析有误!')

      handleError(error, rawCode)
      throw new Error(`代码初始化解析有误! ${error}`)
    }
  }

  log(...args: any[]) {
    this.isLog && console.log(...args)
  }

  get code() {
    const code = generator(this.ast, this.opts).code
    return code
  }

  /**
   * 当执行替换(replace,rename等)操作时,需要执行一次更新以获取最新状态 ast
   */
  reParse() {
    const jscode = generator(this.ast, this.opts).code

    try {
      this.ast = parser.parse(jscode, { sourceType: 'script' })
    }
    catch (error) {
      handleError(error, jscode)
      throw new Error(`代码替换有误,解析失败! 请到控制台中查看 ${error}`)
    }
  }

  get decoders() {
    return globalState.decoders
  }

  prepare() {
    applyTransforms(
      this.ast,
      [blockStatement, sequence, splitVariableDeclarations],
      'prepare',
    )
  }

  unminify() {
    applyTransform(
      this.ast,
      unminify,
    )
    this.reParse()
  }

  inlineDecodeWrappers(depth = 2) {
    applyTransform(this.ast, inlineDecoderWrappers, depth)
    this.reParse()
  }

  replaceDecoder() {
    for (const decoder of this.decoders)
      applyTransform(this.ast, replaceDecoder, decoder.path)

    this.reParse()
  }

  /**
   * 执行解密器 传递解密代码将会注入执行
   * @param {*} decoder
   * @example
   * _0x4698(_0x13ee81, _0x3dfa50)
   * ⬇️
   * 原始字符串
   */
  decodeStrings(decoders: Decoder[] = []) {
    const map = new Map<string, string>()

    for (const decoder of decoders) {
      decoder?.path.scope.getBinding(decoder.name)?.referencePaths.forEach((ref) => {
        if (ref.parentPath?.parentKey === 'callee' && ref.parentPath?.isCallExpression()) {
          const callExpression = ref.parentPath
          try {
            // 如果调用解密函数中有变量参数则不替换
            const hasIdentifier = callExpression.node.arguments.some(a => t.isIdentifier(a))
            if (hasIdentifier) return

            const callCode = callExpression.toString()

            const decStr = eval(callCode)
            map.set(callCode, decStr)

            callExpression.replaceWith(t.valueToNode(decStr))
          }
          catch (error) {
            // 解密失败 则添加注释
            callExpression.addComment('leading', `解密失败: ${(error as any).message}`, true)
          }
        }
      })
    }

    this.reParse()
    if (map.size > 0)
      this.log('解密结果:', map)
  }

  /**
   * 根据解密器调用次数寻找到解密器(执行代码)
   * @deprecated
   * @param {number} count 解密函数调用次数
   * @param {boolean} [isRemove] 是否移除解密函数(后续用不到)
   * @returns {string} decoderCode
   */
  findDecoderByCallCount(count = 100, isRemove = false) {
    if (globalState.decoders.length > 0) return

    let index = 0 // 定义解密函数所在语句下标

    const processFunction = (path: NodePath<t.FunctionDeclaration | t.FunctionExpression>) => {
      const fnName = path.node.id?.name || (path.parentPath.node as t.FunctionDeclaration).id!.name

      const binding = path.scope.getBinding(fnName)

      if (!binding) return

      if (binding.referencePaths.length >= count) {
        globalState.decoders.push(new Decoder(fnName, path))

        // 根据最后一个解密函数来定义解密函数所在语句下标
        const binding = path.scope.getBinding(fnName)
        if (!binding) return

        /**
         * @type {NodePath<t.FunctionDeclaration | t.VariableDeclaration>} path
         */
        const parent = binding.path.find(p => p.isFunctionDeclaration() || p.isVariableDeclaration())
        if (!parent) return

        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        const body = parent.parentPath!.scope.block.body

        for (let i = 0; i < body.length; i++) {
          const node = body[i]
          if (node.start === parent.node.start)
            index = i + 1
        }
        // 遍历完当前节点,就不再往子节点遍历
        path.skip()
      }
    }

    traverse(this.ast, {
      FunctionDeclaration(path) {
        if (path.parentPath.isProgram())
          processFunction(path)
      },
      FunctionExpression(path) {
        if (path.parentKey === 'init' && path.parentPath.type === 'VariableDeclarator') {
          const variableDeclarationPath = path.findParent(p => p.isVariableDeclaration())
          if (variableDeclarationPath && variableDeclarationPath.parentPath?.isProgram())
            processFunction(path)
        }
      },
    })

    const descryptAst = parser.parse('')
    // 插入解密函数前的几条语句
    descryptAst.program.body = this.ast.program.body.slice(0, index)
    const decoderCode = generator(descryptAst, { compact: true }).code

    if (isRemove)
      this.ast.program.body = this.ast.program.body.slice(index)

    return decoderCode
  }

  /**
   * 根据大数组定位代码以及寻找到解密函数(执行代码)
   * @param {number} count 数组成员数
   * @param {boolean} [isRemove] 是否移除解密函数(后续用不到)
   * @returns {string} decoderCode
   */
  findDecoderByBigArr(count = 100, isRemove = false) {

    // const newAst = parser.parse('')
    // newAst.program.body.push(stringArray.node, ...decoders.map(d => d.node), ...shufferFns.map(d => d.node))
    // const decoderCode = generator(newAst).code

    // return decoderCode
  }

  /**
   * 注入代码 eval 执行
   */
  evalCode(code: string) {
    try {
      const result = global.eval(code)
      this.log('注入代码执行结果', result)
    }
    catch (error) {
      throw new Error('代码无法运行, 请在控制台中查看错误信息')
    }
  }

  saveAllObject() {
    globalState.objects = {}

    const { objects } = applyTransform(this.ast, saveAllObject)

    globalState.objects = objects!
  }

  getAllObject() {
    return globalState.objects
  }

  replaceObjectProp() {
    applyTransform(this.ast, replaceObjectProp, globalState.objects)
    this.reParse()
  }

  controlFlowSwitch() {
    applyTransform(this.ast, transformForLoop)

    this.reParse()

    applyTransform(this.ast, controlFlowSwitch)
  }

  transformSelfCallFn() {
    applyTransform(this.ast, transformSelfCallFn)

    this.reParse()
  }

  replaceConstantRef() {
    applyTransform(this.ast, replaceConstantRef)
    this.reParse()
  }

  calcBinary() {
    applyTransforms(this.ast, [mergeStrings, numberExpressions])
    // this.reParse()
  }

  deleteUnusedVar() {
    applyTransform(this.ast, deleteUnusedVar)
    this.reParse()
  }

  deadCode() {
    applyTransform(this.ast, deadCode)
    this.reParse()
  }

  markComment({ keywords, label }: { keywords: string[]; label: string }) {
    applyTransform(this.ast, markComment, { keywords, label })
  }

  /**
   * 禁用 debugger
   * @todo
   */
  disableDebugger() {
    // xxx
  }

  /**
   * 移除环境检测 (自卫代码,debugger 保护, 控制台输出)
   */
  removeEnvDetection() {
    applyTransforms(this.ast, [selfDefending, debugProtection])
  }
}
