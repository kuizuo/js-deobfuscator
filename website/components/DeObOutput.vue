<script setup lang="ts">
import { loading } from '#imports'
import { MonacoEditor } from '#build/components'

import DeobfuscatorWorker from '~/utils/deobfuscator.ts?worker'

const worker = new DeobfuscatorWorker()

const output = ref('')

const { text, copy, copied } = useClipboard({ source: output })

worker.onmessage = ({ data }) => {
  loading.value = false

  output.value = data.code
}

worker.onerror = (event) => {
  console.error(event.error)
}

async function run() {
  if (!code.value) {
    // Message({ message: '请输入代码', type: 'error' })
    return
  }

  loading.value = 'parse'
  worker.postMessage('start')

  worker.postMessage({ code: code.value })
}

const container = shallowRef<InstanceType<typeof MonacoEditor>>()
const monaco = useMonaco()!
const IS_SAFARI = /Apple Computer/.test(globalThis.navigator?.vendor)

function download() {
  if (output.value)
    downloadByData(output.value, 'output.js')
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
  <div flex="~ col gap-2 1" min-w-0 h-full>
    <div flex="~ gap-3 wrap items-center" mx-2>
      <!-- <label> <input type="checkbox" /> 移除无用代码 </label> -->
      <div flex="~ gap-2 1" justify-end>
        <button title="clean" @click="copy()">
          <div v-if="!copied" i-ri:file-copy-line />
          <div v-else i-ri:check-line />
        </button>
        <button title="copy" @click="download()">
          <div i-ri:download-line />
        </button>
      </div>
    </div>
    <div flex="~ 1" min-h-0 min-w-0>
      <div w-12 b-r-4 b-zinc50 dark:b-zinc800>
        <div flex="~ col justify-center items-center" h-screen>
          <button title="Deobfuscator" @click="run">
            <div i-ri:arrow-right-line />
          </button>
        </div>
      </div>
      <div v-if="loading === 'load'">
        Loading parser...
      </div>
      <div v-else-if="loading === 'parse'">
        Parsing...
      </div>
      <div v-else-if="error" overflow-scroll text-red>
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
