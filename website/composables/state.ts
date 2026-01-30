import type { Options } from 'deob'

export const defaultOptions: Required<Options> = {
  isStrongRemove: false,

  inlineWrappersDepth: 2,
  decoderLocationMethod: 'stringArray',
  decoderCallCount: 150,
  setupCode: '',
  designDecoderName: '',
  isRemoveDecoder: true,

  execCount: 2,

  isMarkEnable: true,
  keywords: ['debugger'],

  isDebug: false,
  mangleMode: 'off',
  manglePattern: '',
  mangleFlags: '',
  isMinifiedEnable: false,
  stringArraylength: 0,
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

const persistedOptions = useLocalStorage<Required<Options>>(
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

export const options = ref<Required<Options>>(mergedOptions)

watch(
  options,
  (val) => {
    const { setupCode: _ignore, ...rest } = val
    persistedOptions.value = { ...defaultOptions, ...rest, setupCode: '' }
  },
  { deep: true },
)
