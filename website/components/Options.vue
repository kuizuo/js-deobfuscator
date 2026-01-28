<script setup lang="ts">
import { options } from '#imports'

const dialog = ref<HTMLDialogElement>()

const decoderMethods = [
  { value: 'stringArray', label: '字符串数组长度' },
  { value: 'callCount', label: '解密器调用次数' },
  { value: 'evalCode', label: '注入解密代码' },
] as const

const isEvalCode = computed(
  () => options.value.decoderLocationMethod === 'evalCode',
)
const isCallCount = computed(
  () => options.value.decoderLocationMethod === 'callCount',
)
const isStringArray = computed(
  () => options.value.decoderLocationMethod === 'stringArray',
)

function open() {
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function handleDialogClick(evt: MouseEvent) {
  if (evt.target === evt.currentTarget)
    close()
}

defineExpose({ open })
</script>

<template>
  <dialog
    ref="dialog"
    class="min-w-96 rounded-xl border border-zinc-200/70 bg-white/95 p-0 shadow-xl backdrop:backdrop-blur-sm dark:(border-zinc-800/70 bg-zinc-900/90)"
    @click="handleDialogClick"
  >
    <div class="flex items-center justify-between px-5 py-4">
      <div>
        <p class="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          解混淆配置
        </p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          保持轻量，只暴露核心选项。
        </p>
      </div>
      <button class="i-ri:close-line text-lg text-zinc-500 hover:text-zinc-800 dark:text-zinc-300" @click="close" />
    </div>
    <hr class="border-zinc-200 dark:border-zinc-800">
    <div class="space-y-4 px-5 py-4 text-sm text-zinc-800 dark:text-zinc-100">
      <div class="space-y-2">
        <label class="flex flex-col gap-1">
          <span class="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">解密器定位</span>
          <select
            v-model="options.decoderLocationMethod"
            class="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm focus:(outline-none ring-1 ring-amber-400) dark:(border-zinc-700 bg-zinc-900)"
          >
            <option v-for="method in decoderMethods" :key="method.value" :value="method.value">
              {{ method.label }}
            </option>
          </select>
        </label>

        <div v-if="isCallCount" class="flex items-center justify-between gap-3 rounded-lg bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:(bg-amber-500/10 text-amber-100)">
          <span>调用次数</span>
          <input
            v-model.number="options.decoderCallCount"
            class="w-24 rounded border border-amber-200 bg-white px-2 py-1 text-right focus:(outline-none ring-1 ring-amber-400) dark:(border-amber-500/40 bg-zinc-900)"
            type="number"
            min="1"
            step="1"
          >
        </div>

        <div v-if="isStringArray" class="flex items-center justify-between gap-3 rounded-lg bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:(bg-amber-500/10 text-amber-100)">
          <span>字符串数组长度</span>
          <input
            v-model.number="options.stringArraylength"
            class="w-24 rounded border border-amber-200 bg-white px-2 py-1 text-right focus:(outline-none ring-1 ring-amber-400) dark:(border-amber-500/40 bg-zinc-900)"
            type="number"
            min="1"
            step="1"
          >
        </div>

        <div v-if="isEvalCode" class="space-y-2 rounded-lg bg-amber-50/70 px-3 py-3 text-xs text-amber-800 dark:(bg-amber-500/10 text-amber-100)">
          <label class="flex items-center justify-between gap-3">
            <span>指定解密器(函数名)</span>
            <input
              v-model="options.designDecoderName"
              class="w-48 rounded border border-amber-200 bg-white px-2 py-1 text-sm focus:(outline-none ring-1 ring-amber-400) dark:(border-amber-500/40 bg-zinc-900)"
              type="text"
              placeholder="例如: _0xabc123"
            >
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-[11px] text-zinc-600 dark:text-zinc-300">注入执行代码</span>
            <textarea
              v-model="options.setupCode"
              class="min-h-28 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm leading-relaxed focus:(outline-none ring-1 ring-amber-400) dark:(border-amber-500/40 bg-zinc-900)"
              placeholder="// 需要在执行前注入的代码"
            />
          </label>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <label class="flex flex-col gap-1 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2 shadow-sm dark:(border-zinc-800/70 bg-zinc-900/70)">
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-300">解密器嵌套深度</span>
          <input
            v-model.number="options.inlineWrappersDepth"
            class="rounded border border-zinc-200 bg-white px-2 py-1 text-right focus:(outline-none ring-1 ring-amber-400) dark:(border-zinc-700 bg-zinc-950)"
            type="number"
            min="1"
            step="1"
          >
        </label>

        <label class="flex flex-col gap-1 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2 shadow-sm dark:(border-zinc-800/70 bg-zinc-900/70)">
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-300">执行次数</span>
          <input
            v-model.number="options.execCount"
            class="rounded border border-zinc-200 bg-white px-2 py-1 text-right focus:(outline-none ring-1 ring-amber-400) dark:(border-zinc-700 bg-zinc-950)"
            type="number"
            min="1"
            max="5"
            step="1"
          >
        </label>
      </div>

      <div class="grid gap-2 text-sm">
        <label class="flex items-center justify-between gap-3 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2 shadow-sm dark:(border-zinc-800/70 bg-zinc-900/70)">
          <span>移除解密器</span>
          <input v-model="options.isRemoveDecoder" type="checkbox" class="h-4 w-4 accent-amber-500">
        </label>
        <label class="flex items-center justify-between gap-3 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-2 shadow-sm dark:(border-zinc-800/70 bg-zinc-900/70)">
          <span>强力清除(二次执行)</span>
          <input v-model="options.isStrongRemove" type="checkbox" class="h-4 w-4 accent-amber-500">
        </label>
      </div>
    </div>
  </dialog>
</template>
