<script setup lang="ts">
import type * as monaco from 'monaco-editor'
import type { SplitpanesResizedPayload } from 'splitpanes'
import type { ConsoleLogEntry } from '~/types/logger'
import { code, editorStickyScroll, editorWordWrap, error, loading, options, parseTime, t } from '#imports'
import { Pane, Splitpanes } from 'splitpanes'
import DeobfuscatorWorker from '~/utils/deobfuscate.worker.ts?worker'
import Console from './Console.vue'
import Options from './Options.vue'
import 'splitpanes/dist/splitpanes.css'

const worker = new DeobfuscatorWorker()
const output = ref('')
const logs = ref<ConsoleLogEntry[]>([])
const consoleSize = useLocalStorage<number>('js-deobfuscator:console-size', 15)
const consoleCollapsed = ref(false)
const consoleCollapsedSize = 5
const optionsModal = shallowRef<InstanceType<typeof Options>>()

const activeConsoleSize = computed(() =>
  consoleCollapsed.value ? consoleCollapsedSize : consoleSize.value,
)
const resultPaneSize = computed(() => Math.max(0, 100 - activeConsoleSize.value))
const editorOptions = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
  automaticLayout: true,
  theme: editorTheme.value,
  readOnly: true,
  fontSize: 13,
  tabSize: 2,
  wordWrap: editorWordWrap.value ? 'on' : 'off',
  stickyScroll: {
    enabled: editorStickyScroll.value,
  },
  minimap: {
    enabled: false,
  },
}))

const { copy, copied } = useClipboard({ source: output })
const MAX_LOGS = 200

function pushLog(message: string, timestamp = Date.now()) {
  logs.value = [
    ...logs.value.slice(-(MAX_LOGS - 1)),
    {
      id: timestamp + Math.random(),
      message,
      timestamp,
    },
  ]
}

function clearLogs() {
  logs.value = []
}

function handleConsoleResize({ panes }: SplitpanesResizedPayload) {
  const consolePane = panes[1]
  if (!consolePane)
    return

  if (!consoleCollapsed.value)
    consoleSize.value = consolePane.size
}

function toggleConsole() {
  consoleCollapsed.value = !consoleCollapsed.value
}

worker.onmessage = ({ data }) => {
  if (data?.type === 'log') {
    pushLog(String(data.message ?? ''), data.timestamp)
    return
  }

  if (data?.type === 'error') {
    loading.value = false
    error.value = data.message
    pushLog(String(data.message ?? ''), data.timestamp)
    return
  }

  if (data?.type === 'result') {
    loading.value = false
    error.value = null
    output.value = data.code
    parseTime.value = data.parseTime
    pushLog(t('output.completed', {
      time: data.parseTime,
      method: options.value.decoderLocationMethod,
    }))
  }
}

worker.onerror = (event) => {
  loading.value = false
  output.value = ''
  error.value = event.message
  pushLog(event.message)
}

async function run() {
  if (!code.value?.trim()) {
    error.value = t('output.enterCode')
    return
  }

  error.value = null
  parseTime.value = 0
  loading.value = 'parse'
  clearLogs()

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
    <Splitpanes
      horizontal
      class="h-full min-h-0 deob-splitpanes"
      @resized="handleConsoleResize"
    >
      <Pane :size="resultPaneSize" min-size="45" class="min-h-0">
        <div class="flex h-full flex-col">
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200/80 bg-white/90 px-3 py-2 text-xs font-medium shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950/50">
            <div class="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
              <div class="i-ri:terminal-window-line text-lg" />
              <span class="font-semibold">{{ t('output.title') }}</span>
              <span class="text-[11px] text-zinc-500 dark:text-zinc-400">{{ t('output.description') }}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span
                v-if="parseTime"
                class="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-100"
              >
                {{ parseTime }} ms
              </span>
              <button
                :disabled="loading === 'parse'"
                class="inline-flex items-center gap-2 rounded-md border border-transparent bg-gradient-to-r from-amber-400 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition hover:enabled:from-amber-500 hover:enabled:to-orange-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:from-amber-300 disabled:to-orange-400"
                :title="loading === 'parse' ? t('output.processingTitle') : t('output.run')"
                @click="run"
              >
                <div v-if="loading === 'parse'" class="i-ri:loader-4-line animate-spin" />
                <div v-else class="i-ri:play-mini-fill" />
                <span>{{ loading === 'parse' ? t('output.processing') : t('output.run') }}</span>
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-md border border-amber-200/70 bg-amber-50/80 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-sm transition hover:border-amber-400 hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
                :title="t('output.openSettings')"
                @click="openOptions"
              >
                <div class="i-ri:settings-4-line" />
                <span>{{ t('output.settings') }}</span>
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-amber-400 hover:text-amber-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200"
                :title="t('output.copy')"
                @click="copy()"
              >
                <div v-if="!copied" class="i-ri:file-copy-2-line" />
                <div v-else class="i-ri:check-line text-emerald-500" />
                <span>{{ copied ? t('output.copied') : t('output.copy') }}</span>
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-md border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-amber-400 hover:text-amber-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200"
                :title="t('output.download')"
                @click="download()"
              >
                <div class="i-ri:download-2-line" />
                <span>{{ t('output.download') }}</span>
              </button>
            </div>
          </div>
          <div class="mt-3 flex min-h-0 flex-1 rounded-lg border border-zinc-200/70 bg-white/90 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950/60">
            <div
              v-if="loading === 'parse'"
              class="flex w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
            >
              {{ t('output.parsing') }}
            </div>
            <div
              v-else-if="error"
              class="w-full overflow-auto p-4 text-sm"
            >
              <div class="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/90 p-3 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100">
                <div class="i-ri:error-warning-line mt-0.5 text-lg" />
                <div class="space-y-2">
                  <div class="text-xs uppercase tracking-wide text-red-500 dark:text-red-200">
                    {{ t('output.failed') }}
                  </div>
                  <pre class="max-h-60 whitespace-pre-wrap break-all font-mono text-xs leading-5" v-text="String(error)" />
                </div>
              </div>
            </div>
            <div
              v-else-if="!output"
              class="flex w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
            >
              {{ t('output.empty') }}
            </div>
            <MonacoEditor
              v-else
              v-model="output"
              class="h-full min-w-0 flex-1"
              lang="javascript"
              :options="editorOptions"
            />
          </div>
        </div>
      </Pane>
      <Console
        :size="activeConsoleSize"
        :collapsed="consoleCollapsed"
        :logs="logs"
        @toggle="toggleConsole"
        @clear="clearLogs"
      />
    </Splitpanes>
    <Options ref="optionsModal" />
  </div>
</template>
