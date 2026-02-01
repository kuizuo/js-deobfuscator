<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const visible = ref(false)

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}
</script>

<template>
  <span
    class="relative inline-flex items-center"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <!-- trigger -->
    <slot />

    <!-- tooltip -->
    <span
      v-if="visible"
      class="
        pointer-events-none
        absolute
        left-1/2
        top-full
        z-50
        mt-2
        w-max
        max-w-xs
        -translate-x-1/2
        rounded-lg
        bg-zinc-800
        px-2.5
        py-2
        text-xs
        leading-relaxed
        text-white
        shadow-lg
        dark:bg-zinc-100
        dark:text-zinc-900
      "
    >
      {{ text }}
    </span>
  </span>
</template>
