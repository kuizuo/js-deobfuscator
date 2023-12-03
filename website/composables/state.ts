const PREFIX = 'js-deobfuscator:'

export const loading = ref<'load' | 'parse' | false>(false)
export const code = ref('')
export const ast = shallowRef<unknown>({})
export const error = shallowRef<unknown>()
export const parseTime = ref(0)

export interface Options {
  /** 是否强力清除 */
  isStrongRemove: boolean
  /** 解密函数调用次数 */
  decryptFnCallCount: number
  /** 是否执行解密操作 */
  isDecryptFnEnabled: boolean
  /** 是否移除解密函数 */
  isRemoveDecryptFn: boolean

  /** 执行代码函数 */
  evalCode: string
  /** 指明解密函数 */
  designDecryptFn: string[] | string | undefined

  /** 循环执行次数 */
  execCount: number

  /** 是否计算二项式常量 */
  isCalcBinaryEnable: boolean
  /** 是否替换所有常量引用 */
  isReplaceConstantEnable: boolean

  /** 是否移除无用代码块 */
  isRemoveUnusedBlock: boolean
  /** 是否移除无用变量 */
  isRemoveUnusedVariables: boolean

  /** 还原 utf8 字符 */
  deleteExtraEnable: boolean
  /** 是否标记关键信息 */
  isMarkEnable: boolean
  /** 关键标识符 */
  keywords: string[]

  /** 是否日志输出(会影响还原效率) */
  isLog: boolean

  /** 压缩代码 */
  isMinifiedEnable: boolean
}

const defaultOptions: Options = {
  isStrongRemove: false,
  decryptFnCallCount: 150,
  isDecryptFnEnabled: true,
  isRemoveDecryptFn: true,
  evalCode: '',
  designDecryptFn: undefined,

  execCount: 2,

  isCalcBinaryEnable: true,
  isReplaceConstantEnable: true,

  isRemoveUnusedBlock: true,
  isRemoveUnusedVariables: true,
  deleteExtraEnable: true,
  isMarkEnable: true,
  keywords: ['debugger'],

  isLog: true,
  isMinifiedEnable: false,
}

export const options = useLocalStorage<Options>(`${PREFIX}options`, defaultOptions)

export const hideEmptyKeys = useLocalStorage(`${PREFIX}hide-empty-keys`, true)
export const hideLocationData = useLocalStorage(
  `${PREFIX}hide-location-data`,
  true,
)
export const hideKeys = useLocalStorage<string[]>(`${PREFIX}hide-keys`, [])
export const autoFocus = useLocalStorage<boolean>(`${PREFIX}auto-focus`, true)

const location = useBrowserLocation()

const rawUrlState = location.value.hash ? atou(location.value.hash!.slice(1)) : ''
if (rawUrlState) {
  const urlState = JSON.parse(rawUrlState)
  code.value = urlState.c
  options.value = urlState.o
}

watch([code, options], () => {
  const serialized = JSON.stringify({
    c: code.value,
    o: options.value,
  })
  location.value.hash = utoa(serialized)
})

export const parserContextMap: Record<string, unknown> = shallowReactive(
  Object.create(null),
)
async function initParser() {
  const { id, init } = currentParser.value
  if (parserContextMap[id])
    return parserContextMap[id]
  return (parserContextMap[id] = await init?.())
}

const parserContext = computed(() => initParser())

watch(
  [currentParser, code],
  async () => {
    try {
      loading.value = 'load'
      const ctx = await parserContext.value
      loading.value = 'parse'
      ast.value = await currentParser.value.parse.call(
        await ctx,
        code.value,
        options.value,
      )
      error.value = null
    }
    catch (err) {
      error.value = err
      console.error(err)
    }
    finally {
      loading.value = false
    }
  },
  { immediate: true },
)
