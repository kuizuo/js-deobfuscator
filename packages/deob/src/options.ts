import type { Sandbox } from './deobfuscate/vm'
import { createBrowserSandbox, createNodeSandbox } from './deobfuscate/vm'
import { isBrowser } from './utils/platform'

export interface Options {

  /** 解密器定位方式 */
  decoderLocationMethod?: 'callCount' | 'stringArray' | 'evalCode'
  /** 解密器调用次数 */
  decoderCallCount?: number
  /** 执行代码函数 */
  setupCode?: string
  /** 解密函数包装深度 */
  inlineWrappersDepth?: number
  /** 指明解密函数 */
  designDecoderName?: string | string[]

  /** 是否标记关键信息 */
  isMarkEnable?: boolean
  /** 关键标识符 */
  keywords?: string[]
  /** 变量名优化模式 */
  mangleMode?: 'off' | 'all' | 'hex' | 'short' | 'custom'
  /** 自定义变量名优化正则 */
  manglePattern?: string
  /** 自定义变量名优化正则标志位 */
  mangleFlags?: string
  /** 沙盒 */
  sandbox?: Sandbox
}

export const defaultOptions: Required<Options> = {
  inlineWrappersDepth: 2,
  decoderLocationMethod: 'stringArray',
  decoderCallCount: 150,
  setupCode: '',
  designDecoderName: '',

  isMarkEnable: true,
  keywords: ['debugger'],

  mangleMode: 'off',
  manglePattern: '',
  mangleFlags: '',
  sandbox: isBrowser() ? createBrowserSandbox() : createNodeSandbox(),
}

export function mergeOptions(options: Options): asserts options is Required<Options> {
  const mergedOptions: Required<Options> = {
    ...defaultOptions,
    ...options,
  }
  // backward compatibility: boolean mangle -> mode
  if (!options.mangleMode && typeof (options as any).mangle === 'boolean') {
    mergedOptions.mangleMode = (options as any).mangle ? 'all' : 'off'
  }
  Object.assign(options, mergedOptions)
}
