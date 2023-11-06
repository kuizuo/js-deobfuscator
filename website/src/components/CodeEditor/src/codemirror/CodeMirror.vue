<script lang="ts" setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
  watch,
  unref,
  nextTick,
  PropType,
  computed,
  CSSProperties,
} from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useWindowSizeFn } from '~/hooks/event/useWindowSizeFn'
import CodeMirror from 'codemirror'
import { MODE } from './../typing'
// css
import './codemirror.css'
import 'codemirror/theme/juejin.css'
import 'codemirror/theme/material-palenight.css'
import 'codemirror/theme/material.css'
// modes
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

import { isDark, toggleDark } from '~/hooks/web/useTheme'

type Nullable<T> = null | T

const props = defineProps({
  mode: {
    type: String as PropType<MODE>,
    default: MODE.JSON,
    validator(value: any) {
      // 这个值必须匹配下列字符串中的一个
      return Object.values(MODE).includes(value)
    },
  },
  value: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

const el = ref()
let editor: Nullable<CodeMirror.Editor>

const debounceRefresh = useDebounceFn(refresh, 100)

watch(
  () => props.value,
  async (value) => {
    await nextTick()
    const oldValue = editor?.getValue()
    if (value !== oldValue) {
      editor?.setValue(value ? value : '')
    }
  },
  { flush: 'post' },
)

watch(
  () => isDark.value,
  async () => {
    await nextTick()
    setTheme(isDark.value)
  },
)

watchEffect(() => {
  editor?.setOption('mode', props.mode)
})

function setTheme(isDark: boolean) {
  unref(editor)?.setOption(
    'theme',
    isDark === true ? 'material-palenight' : 'juejin',
  )
}

function refresh() {
  editor?.refresh()
}

async function init() {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers'],
  }

  editor = CodeMirror(el.value!, {
    value: '',
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 2,
    theme: isDark.value === true ? 'material-palenight' : 'juejin',
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions,
  })
  editor?.setValue(props.value)
  // setTheme()
  editor?.on('change', () => {
    emit('change', editor?.getValue())
  })
}

onMounted(async () => {
  await nextTick()
  init()
  useWindowSizeFn(debounceRefresh)
})

onUnmounted(() => {
  editor = null
})
</script>

<template>
  <div
    class="relative !h-full w-full overflow-hidden border-4 rounded-md text-left text-sm"
    ref="el"
  ></div>
</template>
website/src/hooks/event/useWindowSizeFn../typingwebsite/src/hooks/web/useTheme
