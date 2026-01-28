<script setup lang="ts">
import type * as monaco from 'monaco-editor'

import { codePrettier, parser } from 'deob'

// eslint-disable-next-line ts/consistent-type-imports
import type { MonacoEditor } from '#build/components'
import { editorStickyScroll, editorTheme, editorWordWrap } from '#imports'

interface Example {
  name: string
  value: () => Promise<string>
}

const files = import.meta.glob('../../example/**/input.js', { as: 'raw' })

const examples: Example[] = Object.entries(files).map(([key, value]) => ({
  name: key.replace('../../example/', ''),
  value,
}))

const code = defineModel<string>()
const container = shallowRef<InstanceType<typeof MonacoEditor>>()
const editorOptions = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
  automaticLayout: true,
  theme: editorTheme.value,
  fontSize: 13,
  tabSize: 2,
  wordWrap: editorWordWrap.value ? ('on' as const) : ('off' as const),
  stickyScroll: {
    enabled: editorStickyScroll.value,
  },
  minimap: {
    enabled: false,
  },
}))

function getEditor(): monaco.editor.IStandaloneCodeEditor | undefined {
  const instance = container.value?.$editor as monaco.editor.IStandaloneCodeEditor | undefined
  return instance ? toRaw(instance) : undefined
}

function applyText(next: string, source = 'edit') {
  const editor = getEditor()
  if (!editor) {
    code.value = next
    return
  }
  const model = editor.getModel()
  if (!model)
    return

  const fullRange = model.getFullModelRange()
  editor.pushUndoStop()
  editor.executeEdits(source, [
    {
      range: fullRange,
      text: next,
    },
  ])
  editor.pushUndoStop()
}

async function handleExampleChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value

  if (!selectedValue) {
    applyText('', 'ExampleClear')
    return
  }

  const result = await examples.find(e => e.name === selectedValue)!.value()
  applyText(result, 'ExampleLoad')
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return

  if (!file.name.endsWith('.js')) {
    window.alert('请选择 js 文件')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    applyText(reader.result as string, 'Upload')
  }
  reader.readAsText(file)
}

async function beautify() {
  if (!code.value)
    return
  applyText(codePrettier(parser.parse(code.value)), 'Beautify')
}

function clean() {
  applyText('', 'Clean')
}
</script>

<template>
  <div class="flex h-full flex-col rounded-r-xl bg-white/70 p-3 dark:bg-zinc-900/60">
    <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-amber-200/80 bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:(border-amber-500/60 bg-amber-500/10 text-amber-100)">
      <div class="flex items-center gap-2">
        <div class="i-ri:input-method-line text-lg" />
        <span class="font-semibold text-zinc-800 dark:text-zinc-100">源代码</span>
        <span class="text-[11px] text-zinc-500 dark:text-zinc-400">粘贴混淆代码，或直接加载示例/上传文件。</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <label class="flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1 text-[11px] font-medium shadow-sm transition hover:border-amber-300 dark:(border-zinc-700 bg-zinc-900/80)">
          <span>示例</span>
          <select
            name="example-select"
            class="min-w-36 bg-transparent text-xs focus:outline-none"
            @change="handleExampleChange"
          >
            <option value="">
              选择一个
            </option>
            <option v-for="e in examples" :key="e.name" :value="e.name">
              {{ e.name }}
            </option>
          </select>
        </label>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
          title="Beautify code"
          @click="beautify"
        >
          <div class="i-ri:brush-3-line" />
          <span>美化</span>
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
          :class="editorWordWrap ? 'border-amber-300 text-amber-700 dark:text-amber-100' : ''"
          title="切换自动换行"
          @click="editorWordWrap = !editorWordWrap"
        >
          <div class="i-ri:text-wrap" />
          <span> {{ editorWordWrap ? '不' : '' }}换行</span>
        </button>
        <label
          for="fileInput"
          class="inline-flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
        >
          <div class="i-ri:upload-cloud-line" />
          <span>上传</span>
        </label>
        <input id="fileInput" type="file" class="hidden" @change="handleFileChange">
        <button
          class="inline-flex items-center gap-2 rounded-md border border-transparent bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-amber-500 dark:hover:bg-amber-400"
          title="Clean source code"
          @click="clean"
        >
          <div class="i-ri:delete-bin-line" />
          <span>清空</span>
        </button>
      </div>
    </div>
    <div class="mt-3 flex min-h-0 flex-1 rounded-lg border border-zinc-200/70 bg-white/90 shadow-sm dark:(border-zinc-800/80 bg-zinc-950/60)">
      <MonacoEditor
        ref="container"
        v-model="code"
        class="h-full flex-1"
        lang="javascript"
        :options="editorOptions"
      >
        <div class="flex h-full w-full flex-col items-center justify-center gap-2">
          <div class="i-ri:loader-2-line text-4xl animate-spin" />
          <span class="text-sm">Loading...</span>
        </div>
      </MonacoEditor>
    </div>
  </div>
</template>
