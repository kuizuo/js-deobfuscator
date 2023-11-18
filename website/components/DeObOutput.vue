<script setup lang="ts">
import json5 from 'json5'
import { code, error, loading, options } from '#imports'

// eslint-disable-next-line ts/consistent-type-imports
import type { MonacoEditor } from '#build/components'

import DeobfuscatorWorker from '~/utils/deobfuscator.ts?worker'

const worker = new DeobfuscatorWorker()

const output = ref('')

const { text, copy, copied } = useClipboard({ source: output })

worker.onmessage = ({ data }) => {
  loading.value = false

  output.value = data.code
}

worker.onerror = (event) => {
  loading.value = false

  error.value = event.message
}

async function run() {
  if (!code.value) {
    // Message({ message: '请输入代码', type: 'error' })
    return
  }

  loading.value = 'parse'

  console.log('options', options.value)
  worker.postMessage({ code: code.value, options: json5.parse(JSON.stringify(options.value)) })
}

const container = shallowRef<InstanceType<typeof MonacoEditor>>()
const monaco = useMonaco()!
const IS_SAFARI = /Apple Computer/.test(globalThis.navigator?.vendor)

function download() {
  if (output.value) {
    // eslint-disable-next-line no-alert
    if (window.confirm('下载文件?'))
      downloadByData(output.value, 'output.js')
  }
}

function stringifyError(error: unknown) {
  if (error instanceof Error) {
    if (IS_SAFARI) {
      return `${error}\n${error.stack
        ?.split('\n')
        .map((line) => {
          const [fn, file] = line.split('@', 2)
          return `${' '.repeat(4)}at ${fn} (${file})`
        })
        .join('\n')}`
    }
    return error.stack
  }
  return String(error)
}
</script>

<template>
  <div flex="~ col 1" min-w-0 h-full>
    <div flex="~ gap-3 wrap items-center" py-0.5 mx-2>
      <button flex="~" title="Deobfuscator" @click="run">
        <div i-ri:arrow-right-double-line h-6 w-6 />
      </button>
      <div flex="~ gap-2 1" justify-end>
        <button title="copy" @click="copy()">
          <div v-if="!copied" i-ri:file-copy-line />
          <div v-else i-ri:check-line />
        </button>
        <button title="download" @click="download()">
          <div i-ri:download-line />
        </button>
      </div>
    </div>
    <div flex="~ 1" min-h-0 min-w-0 mt-1>
      <div v-if="loading === 'parse'">
        Parsing...
      </div>
      <div v-else-if="error" overflow-scroll w-full text-red>
        <pre v-text="stringifyError(error)" />
      </div>
      <MonacoEditor
        v-show="!loading && !error"
        ref="container"
        v-model="output"
        min-w-0
        flex-1
        lang="javascript"
        :options="{
          automaticLayout: true,
          theme: isDark ? 'vs-dark' : 'vs',
          readOnly: true,
          fontSize: 14,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        }"
      />
    </div>
  </div>
</template>
