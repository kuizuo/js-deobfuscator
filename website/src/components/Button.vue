<template>
  <button
    data-tooltip-target="tooltip-click"
    data-tooltip-trigger="click"
    type="button"
    class="mt-2 py-2 px-4 font-semibold text-white shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
  <div
    id="tooltip-click"
    role="tooltip"
    class="inline-block absolute invisible z-10 py-2 px-3 text-sm text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  >
    {{ tooltip }}
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Button',
  inheritAttrs: false,
  props: {
    tooltip: String,
  },
  emits: ['click'],
})
</script>



