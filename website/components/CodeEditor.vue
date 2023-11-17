<script setup lang="ts">
import type * as monaco from 'monaco-editor'

// eslint-disable-next-line ts/consistent-type-imports
import type { MonacoEditor } from '#build/components'

const code = defineModel<string>()
const container = shallowRef<InstanceType<typeof MonacoEditor>>()

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
</template>
