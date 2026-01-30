<script setup lang="ts">
import { code } from '#imports'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const paneSize = ref(54)
</script>

<template>
  <main
    class="h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-black"
  >
    <TheHeader class="px-4 pt-4" />
    <div class="flex-1 min-h-0">
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
