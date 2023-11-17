import json5 from 'json5'

const PREFIX = 'js-deobfuscator:'

export const loading = ref<'load' | 'parse' | false>(false)
export const code = ref('')
export const ast = shallowRef<unknown>({})
export const error = shallowRef<unknown>()
export const rawOptions = ref('')

export const hideEmptyKeys = useLocalStorage(`${PREFIX}hide-empty-keys`, true)
export const hideLocationData = useLocalStorage(
  `${PREFIX}hide-location-data`,
  true,
)
export const hideKeys = useLocalStorage<string[]>(`${PREFIX}hide-keys`, [])
export const autoFocus = useLocalStorage<boolean>(`${PREFIX}auto-focus`, true)

export const options = computed(() => {
  try {
    return currentParser.value.options.defaultValueType === 'javascript'
      // eslint-disable-next-line no-new-func
      ? new Function(rawOptions.value)()
      : json5.parse(rawOptions.value)
  }
  catch {
    console.error(
      `Failed to parse options: ${JSON.stringify(rawOptions.value, null, 2)}`,
    )
  }
})

const location = useBrowserLocation()

const rawUrlState = location.value.hash ? atou(location.value.hash!.slice(1)) : ''
if (rawUrlState) {
  const urlState = JSON.parse(rawUrlState)
  code.value = urlState.c
  rawOptions.value = urlState.o
}

watch([code, rawOptions], () => {
  const serialized = JSON.stringify({
    c: code.value,
    o: rawOptions.value,
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
  [currentParser, code, rawOptions],
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
