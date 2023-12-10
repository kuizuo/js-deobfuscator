<script setup lang="ts">
import type * as monaco from 'monaco-editor'
import { generator, parser } from '@deob/tool'

// eslint-disable-next-line ts/consistent-type-imports
import type { MonacoEditor } from '#build/components'

interface Example {
  name: string
  value: () => Promise<string>
}

const files = import.meta.glob('../../example/**/code.js', { as: 'raw' })

const examples: Example[] = Object.entries(files).map(([key, value]) => ({
  name: key.replace('../../example/', ''),
  value,
}))

const code = defineModel<string>()
const container = shallowRef<InstanceType<typeof MonacoEditor>>()

async function handleExampleChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value

  if (selectedValue === '') {
    code.value = ''
  }
  else {
    const result = await examples.find(e => e.name === selectedValue)!.value()

    code.value = result
  }
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files![0]

  // 检查文件后缀名是否为 .js
  if (file && !file.name.endsWith('.js')) {
    // eslint-disable-next-line no-alert
    window.alert('请选择 js 文件')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    code.value = reader.result as string
  }
  reader.readAsText(file)
}

async function beautify() {
  const formatted = generator(parser.parse(code.value!), {
    minified: false,
    jsescOption: { minimal: true },
    compact: false,
    comments: true,
  }).code
  code.value = formatted
}

function clean() {
  code.value = ''
}

onMounted(() => {
  const editor = toRaw(
    container.value!.$editor as monaco.editor.IStandaloneCodeEditor,
  )
  editor.onDidChangeCursorPosition((e) => {
    editorCursor.value = editor.getModel()!.getOffsetAt(e.position)
  })
})
</script>

<template>
  <div flex="~ col gap-2 1" min-w-0 h-full>
    <div flex="~ gap-3 wrap items-center" mx-2>
      <label> <span text-sm font-mono>Source Code</span> </label>
      <div flex="~ gap-3 1" justify-end>
        <div class="inline-flex items-center gap-2">
          <label for="example-select" class="text-sm font-medium">Example: </label>
          <select id="example-select" name="example-select" class="p-0.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:(ring border-blue-300) dark:bg-gray-700" @change="handleExampleChange">
            <option value="" />
            <option v-for="e in examples" :key="e.name" :value="e.name">
              {{ e.name }}
            </option>
          </select>
        </div>

        <OuputOptions />
        <button title="Beautify code">
          <div i-ri:brush-3-line @click="beautify" />
        </button>
        <button title="Upload file">
          <label for="fileInput" cursor-pointer> <div i-ri:upload-line /></label>
          <input id="fileInput" type="file" style="display: none" @change="handleFileChange">
        </button>
        <button title="Clean source code">
          <div i-ri:delete-bin-line @click="clean" />
        </button>
      </div>
    </div>
    <MonacoEditor
      ref="container"
      v-model="code"
      h-full
      lang="javascript"
      :options="{
        automaticLayout: true,
        theme: isDark ? 'vs-dark' : 'vs',
        fontSize: 14,
        tabSize: 2,
        minimap: {
          enabled: false,
        },
      }"
    >
      <div flex="~ col gap-2" h-full w-full items-center justify-center>
        <div i-ri:loader-2-line animate-spin text-4xl />
        <span text-lg>Loading...</span>
      </div>
    </MonacoEditor>
  </div>
</template>
