<script setup lang="ts">
import json5 from 'json5'
import type * as Monaco from 'monaco-editor'
import { autoFocus, hideEmptyKeys, hideLocationData, loading } from '#imports'

import { MonacoEditor } from '#build/components'

const container = shallowRef<InstanceType<typeof MonacoEditor>>()
const monaco = useMonaco()!
const IS_SAFARI = /Apple Computer/.test(globalThis.navigator?.vendor)

const serialized = computed(() => {
  try {
    const seen = new WeakMap<any, unknown>()
    return JSON.stringify(
      ast.value,
      (key: string, value: unknown) => {
        if (hideEmptyKeys.value && value == null)
          return
        if (
          [
            ...(hideLocationData.value ? ['loc', 'start', 'end', 'span'] : []),
            ...hideKeys.value.filter(v => !!v),
          ].includes(key)
        )
          return
        if (typeof value === 'function')
          return `function ${value.name}(...)`
        if (typeof value === 'bigint')
          return `(BigInt) ${value}n`

        if (seen.has(value))
          return seen.get(value)

        if (value !== null && typeof value === 'object') {
          let newValue: any
          try {
            JSON.stringify(value)
            newValue = value
          }
          catch {
            newValue = `(circular: ${key || '#root'})`
          }
          seen.set(value, newValue)
        }

        return value
      },
      2,
    )
  }
  catch (err) {
    console.error(err)
    error.value = err
  }
})

const hideKeysValue = ref(JSON.stringify(hideKeys.value))

watchEffect(() => {
  try {
    hideKeys.value = json5.parse(hideKeysValue.value)
  }
  catch (error) {
    console.error(error)
    hideKeys.value = []
  }
})

/** AST range -> code range */
const positionMap = computed(() =>
  serialized.value
    ? collectPositionMap(serialized.value, currentParser.value)
    : undefined,
)

const highlightRange = computed(() => {
  if (!positionMap.value)
    return
  return Array.from(positionMap.value.entries()).findLast(
    ([, { start, end }]) =>
      start <= editorCursor.value! && end >= editorCursor.value!,
  )?.[0]
})

let decorationsCollection:
| Monaco.editor.IEditorDecorationsCollection
| undefined

function highlight() {
  decorationsCollection?.clear()

  const range = highlightRange.value
  if (!range)
    return

  const editor: Monaco.editor.IStandaloneCodeEditor = toRaw(
    container.value?.$editor,
  )
  if (!editor)
    return

  const start = editor.getModel()!.getPositionAt(range.start)
  const end = editor.getModel()!.getPositionAt(range.end)

  decorationsCollection = editor.createDecorationsCollection([
    {
      range: monaco.Range.fromPositions(start, end),
      options: {
        className: `important-bg-yellow-400 important-bg-opacity-30`,
      },
    },
  ])
  if (autoFocus.value)
    editor.revealPositionNearTop(start)
}

onMounted(() => highlight())

watch(highlightRange, () => highlight(), {
  immediate: true,
  flush: 'post',
})

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
    <div flex="~ gap-3 wrap" items-center mx-2>
      <label><input v-model="autoFocus" type="checkbox"> Auto focus</label>
      <label>
        <input v-model="hideEmptyKeys" type="checkbox"> Hide empty keys
      </label>
      <label>
        <input v-model="hideLocationData" type="checkbox"> Hide location data
      </label>
    </div>
    <div flex="~ 1" min-h-0 min-w-0>
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
        min-w-0
        flex-1
        lang="json"
        :model-value="serialized"
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
