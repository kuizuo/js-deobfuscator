import type { Options } from 'deob'

type WebsiteOptions = Omit<Required<Options>, 'sandbox'>

export const defaultOptions: WebsiteOptions = {
  decoderLocationMethod: 'stringArray',
  decoderCallCount: 150,
  setupCode: '',
  decoderNames: '',

  isMarkEnable: true,
  keywords: ['debugger'],

  mangleMode: 'off',
  manglePattern: '',
  mangleFlags: '',
}

const PREFIX = 'js-deobfuscator:'

export const loading = ref<'parse' | false>(false)
const codeStorageKey = `${PREFIX}code`
const localCode = useLocalStorage<string>(codeStorageKey, '')
const codeValue = ref<string>(localCode.value)
const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : undefined
const MAX_BYTES = 1024 * 1024

export const code = computed<string>({
  get: () => codeValue.value,
  set: (val) => {
    codeValue.value = val
    const size = encoder ? encoder.encode(val).length : val.length
    if (size <= MAX_BYTES)
      localCode.value = val
  },
})
export const error = shallowRef<unknown>()
export const parseTime = ref(0)

const persistedOptions = useLocalStorage<WebsiteOptions>(
  `${PREFIX}options`,
  defaultOptions,
)
const mergedOptions = {
  ...defaultOptions,
  ...(persistedOptions.value || {}),
}

if (
  !mergedOptions.mangleMode
  && typeof (persistedOptions.value as any)?.mangle === 'boolean'
) {
  mergedOptions.mangleMode = (persistedOptions.value as any).mangle ? 'all' : 'off'
}

export const options = ref<WebsiteOptions>(mergedOptions)

watch(
  options,
  (val) => {
    const { setupCode: _ignore, ...rest } = val
    persistedOptions.value = { ...defaultOptions, ...rest, setupCode: '' }
  },
  { deep: true },
)
