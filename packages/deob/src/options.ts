export interface Options {
  /** 是否强力清除 */
  isStrongRemove?: boolean

  /** 解密器嵌套深度 */
  inlineWrappersDepth?: number
  /** 解密器定位方式 */
  decoderLocationMethod?: 'obfuscate' | 'callCount' | 'stringArray' | 'evalCode'
  /** 解密器调用次数 */
  decoderCallCount?: number
  /** 字符串数组长度 */
  stringArraylength?: number
  /** 执行代码函数 */
  setupCode?: string
  /** 指明解密函数 */
  designDecoderName?: string | string[]
  /** 是否移除解密器代码 */
  isRemoveDecoder?: boolean
  /** 混淆花指令执行次数 */
  execCount?: number

  /** 是否标记关键信息 */
  isMarkEnable?: boolean
  /** 关键标识符 */
  keywords?: string[]
  /** 是否调试模式，将会日志输出与文件输出 */
  isDebug?: boolean
  /** 优化变量名 */
  mangle?: boolean
  // /** 优化对象访问方式 */
  // computedProp?: boolean
  /** 压缩代码 */
  isMinifiedEnable?: boolean
}

export const defaultOptions: Required<Options> = {
  isStrongRemove: false,

  inlineWrappersDepth: 2,
  decoderLocationMethod: 'stringArray',
  decoderCallCount: 150,
  stringArraylength: 150,
  setupCode: '',
  designDecoderName: '',
  isRemoveDecoder: true,

  execCount: 2,

  isMarkEnable: true,
  keywords: ['debugger'],

  isDebug: false,
  mangle: false,
  // computedProp: false,
  isMinifiedEnable: false,
}

export function mergeOptions(options: Options): asserts options is Required<Options> {
  const mergedOptions: Required<Options> = {
    ...defaultOptions,
    ...options,
  }
  Object.assign(options, mergedOptions)
}
