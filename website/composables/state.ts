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

export const loading = ref<'parse' | false>(false)
export const code = ref('')
export const error = shallowRef<unknown>()
export const parseTime = ref(0)

export const options = useLocalStorage<Options>(`${PREFIX}options`, defaultOptions)

const location = useBrowserLocation()

const rawUrlState = location.value.hash ? atou(location.value.hash!.slice(1)) : ''
if (rawUrlState) {
  try {
    const urlState = JSON.parse(rawUrlState)
    code.value = urlState.c ?? ''
    options.value = { ...defaultOptions, ...(urlState.o || {}) }
  }
  catch (err) {
    console.error(err)
  }
}

watch([code, options], () => {
  const serialized = JSON.stringify({
    c: code.value,
    o: options.value,
  })
  location.value.hash = utoa(serialized)
}, { deep: true })
