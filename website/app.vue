<script setup lang="ts">
import { code } from '#imports'

import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const paneSize = ref(50)
</script>
<template>
  <main h-screen flex="~ col">
    <TheHeader mb-1 />
    <div min-h-0 flex="~ gap3 1">
      <Splitpanes class="h-full">
        <Pane :size="paneSize" min-size="30">
          <CodeEditor v-model="code" />
        </Pane>
        <Pane :size="100 - paneSize" min-size="20">
          <OutputViewer></OutputViewer>
        </Pane>
      </Splitpanes>
    </div>
  </main>
</template>
