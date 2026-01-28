<script setup lang="ts">
import type * as monaco from 'monaco-editor'
import Options from './Options.vue'
import { code, editorStickyScroll, editorWordWrap, error, loading, options, parseTime } from '#imports'

import DeobfuscatorWorker from '~/utils/deobfuscate.worker.ts?worker'

const worker = new DeobfuscatorWorker()
const output = ref('')
const optionsModal = shallowRef<InstanceType<typeof Options>>()

const editorOptions = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
  automaticLayout: true,
  theme: editorTheme.value,
  readOnly: true,
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

const { copy, copied } = useClipboard({ source: output })

worker.onmessage = ({ data }) => {
  loading.value = false
  error.value = null

  output.value = data.code
  parseTime.value = data.parseTime
}

worker.onerror = (event) => {
  loading.value = false
  output.value = ''
  error.value = event.message
}

async function run() {
  if (!code.value?.trim()) {
    error.value = '请输入代码'
    return
  }

  error.value = null
  parseTime.value = 0
  loading.value = 'parse'

  worker.postMessage({
    code: code.value,
    options: JSON.parse(JSON.stringify(options.value)),
  })
}

function download() {
  if (!output.value)
    return
  downloadByData(output.value, 'output.js')
}

function openOptions() {
  optionsModal.value?.open()
}
</script>

<template>
  <div class="flex h-full flex-col rounded-l-xl bg-white/70 p-3 dark:bg-zinc-900/60">
    <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200/80 bg-white/90 px-3 py-2 text-xs font-medium shadow-sm dark:(border-zinc-800/80 bg-zinc-950/50)">
      <div class="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
        <div class="i-ri:terminal-window-line text-lg" />
        <span class="font-semibold">输出结果</span>
        <span class="text-[11px] text-zinc-500 dark:text-zinc-400">运行后在此查看解混淆的代码</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-if="parseTime"
          class="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:(bg-emerald-500/10 text-emerald-100)"
        >
          {{ parseTime }} ms
        </span>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-transparent bg-gradient-to-r from-amber-400 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition hover:from-amber-500 hover:to-orange-600"
          title="Deobfuscate"
          @click="run"
        >
          <div class="i-ri:play-mini-fill" />
          <span>解混淆</span>
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-amber-200/70 bg-amber-50/80 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-sm transition hover:(border-amber-400 bg-amber-100) dark:(border-amber-500/40 bg-amber-500/10 text-amber-100)"
          title="打开配置"
          @click="openOptions"
        >
          <div class="i-ri:settings-4-line" />
          <span>配置</span>
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
          title="copy"
          @click="copy()"
        >
          <div v-if="!copied" class="i-ri:file-copy-2-line" />
          <div v-else class="i-ri:check-line text-emerald-500" />
          <span>{{ copied ? '已复制' : '复制' }}</span>
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
          title="download"
          @click="download()"
        >
          <div class="i-ri:download-2-line" />
          <span>下载</span>
        </button>
      </div>
    </div>
    <div class="mt-3 flex min-h-0 flex-1 rounded-lg border border-zinc-200/70 bg-white/90 shadow-sm dark:(border-zinc-800/80 bg-zinc-950/60)">
      <div
        v-if="loading === 'parse'"
        class="flex w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
      >
        正在解析混淆代码...
      </div>
      <div
        v-else-if="error"
        class="w-full overflow-auto p-3 text-sm text-red-600 dark:text-red-400"
      >
        <pre class="whitespace-pre-wrap" v-text="String(error)" />
      </div>
      <div
        v-else-if="!output"
        class="flex w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
      >
        粘贴代码后点击“运行解混淆”以查看结果
      </div>
      <MonacoEditor
        v-else
        v-model="output"
        class="h-full min-w-0 flex-1"
        lang="javascript"
        :options="editorOptions"
      />
    </div>
    <Options ref="optionsModal" />
  </div>
</template>
