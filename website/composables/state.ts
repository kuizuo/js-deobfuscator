import type { Options } from 'deob'

// import { defaultOptions } from 'deob'

// FIXME: Uncaught ReferenceError: Cannot access 'defaultOptions' before initialization
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
  isMinifiedEnable: false,
}

const PREFIX = 'js-deobfuscator:'

export const loading = ref<'load' | 'parse' | false>(false)
export const code = ref('')
export const ast = shallowRef<unknown>({})
export const error = shallowRef<unknown>()
export const parseTime = ref(0)

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
}, { deep: true })

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
