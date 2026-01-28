import type { Options } from 'deob'

// Keep a local copy to avoid circular init issues on client
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
  mangleMode: 'off',
  manglePattern: '',
  mangleFlags: '',
  isMinifiedEnable: false,
}

const PREFIX = 'js-deobfuscator:'

export const loading = ref<'parse' | false>(false)
export const code = useLocalStorage<string>(`${PREFIX}code`, '')
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
)
  mergedOptions.mangleMode = (persistedOptions.value as any).mangle ? 'all' : 'off'

export const options = ref<Required<Options>>(mergedOptions)

watch(
  options,
  (val) => {
    const { setupCode: _ignore, ...rest } = val
    persistedOptions.value = { ...defaultOptions, ...rest, setupCode: '' }
  },
  { deep: true },
)
