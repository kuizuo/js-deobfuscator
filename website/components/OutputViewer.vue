<script lang="ts" setup>
import { AstOutput, DeObOutput } from '#components'
import { ref } from '#imports'

const currentTab = ref('deob')

const tabs = {
  deob: DeObOutput,
  ast: AstOutput,
}

// TODO: add parseTime
const parseTime = ref(0)
</script>

<template>
  <div class="output h-full">
    <div class="inline-flex w-full">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        class="px-3 py-0.5 text-base cursor-pointer bg-zinc50 hover:bg-zinc300 transition dark:(bg-zinc-900 hover:bg-zinc-600)" :class="[
          { active: currentTab === tab },
        ]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <!-- <span class="flex-1 text-right mr-2">{{ parseTime }} ms</span> -->
    </div>
    <keep-alive>
      <component :is="tabs[currentTab]" />
    </keep-alive>
  </div>
</template>

<style scoped>
.active {
  --at-apply: bg-zinc300 dark-bg-zinc600;
}
</style>
