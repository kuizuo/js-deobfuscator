<template>
  <Icon :icon="icon" :width="size" :height="size" />
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: String,
  size: {
    type: [String, Number],
    default: 16,
  },
})
</script>

<style>
span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  border-radius: 100%;
}
</style>
