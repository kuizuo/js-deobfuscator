<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { code } from '#imports'
import 'splitpanes/dist/splitpanes.css'

const paneSize = ref(54)
const shouldWarnOnLeave = computed(() => code.value?.trim().length > 0)

function beforeUnloadHandler(event: BeforeUnloadEvent) {
  if (!shouldWarnOnLeave.value)
    return
  event.preventDefault()
  event.returnValue = '重新加载站点? 你所做的更改可能未保存。'
  return event.returnValue
}

onMounted(() => window.addEventListener('beforeunload', beforeUnloadHandler))
onBeforeUnmount(() =>
  window.removeEventListener('beforeunload', beforeUnloadHandler),
)
</script>

<template>
  <main
    h-screen
    flex="~ col"
    bg="gradient-to-b from-amber-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-black"
  >
    <TheHeader px-4 pt-4 />
    <div flex-1 min-h-0>
      <Splitpanes class="h-full dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl overflow-hidden ">
        <Pane :size="paneSize" min-size="35" class="p-2">
          <SourceCodeEditor v-model="code" />
        </Pane>
        <Pane :size="100 - paneSize" min-size="30" class="p-2">
          <DeObfuscatorOutput />
        </Pane>
      </Splitpanes>
    </div>
  </main>
</template>
