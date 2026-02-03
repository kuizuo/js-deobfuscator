<script setup lang="ts">
import { defaultOptions, options } from '#imports'

const dialog = ref<HTMLDialogElement>()

const decoderMethods = [
  { value: 'stringArray', label: '字符串数组长度（适用于绝大多数场景）' },
  { value: 'callCount', label: '解密函数调用次数（需确保调用次数足够）' },
  { value: 'evalCode', label: '注入自定义解密代码（需手动提取代码）' },
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

const mangleModes = [
  { value: 'off', label: '关闭' },
  { value: 'hex', label: 'Hex (_0x)' },
  { value: 'short', label: '短变量名' },
  { value: 'all', label: '全部变量' },
  { value: 'custom', label: '自定义正则' },
] as const

const isCustomMangle = computed(() => options.value.mangleMode === 'custom')

const keywordsStr = computed({
  get: () => options.value.keywords.join(', '),
  set: (v: string) => {
    options.value.keywords = v.split(',').map(s => s.trim()).filter(Boolean)
  },
})

function open() {
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function resetOptions() {
  const confirmed = window.confirm('确定要恢复默认配置吗？已修改的设置将被重置。')
  if (!confirmed)
    return
  const { setupCode: _discard, ...rest } = defaultOptions
  options.value = { ...rest, setupCode: '' }
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
    class="min-w-96 overflow-visible rounded-xl border border-zinc-200/70 bg-white/95 p-0 shadow-xl backdrop:backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/90"
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
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center gap-1 rounded-lg border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm transition hover:border-amber-400 hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
          title="恢复默认配置"
          @click="resetOptions"
        >
          <div class="i-ri:refresh-line" />
          重置
        </button>
        <button class="i-ri:close-line text-lg text-zinc-500 hover:text-zinc-800 dark:text-zinc-300" @click="close" />
      </div>
    </div>
    <hr class="border-zinc-200 dark:border-zinc-800">
    <div class="space-y-4 px-5 py-4 text-sm text-zinc-800 dark:text-zinc-100">
      <div class="space-y-2">
        <label class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">解密器定位方式</span>
          </div>
          <select
            v-model="options.decoderLocationMethod"
            class="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option v-for="method in decoderMethods" :key="method.value" :value="method.value">
              {{ method.label }}
            </option>
          </select>
        </label>

        <div v-if="isCallCount" class="flex items-center justify-between gap-3 rounded-lg bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-100">
          <span>调用次数</span>
          <input
            v-model.number="options.decoderCallCount"
            class="w-24 rounded border border-amber-200 bg-white px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-amber-500/40 dark:bg-zinc-900"
            type="number"
            min="1"
            step="1"
          >
        </div>

        <div v-if="isEvalCode" class="space-y-2 rounded-lg bg-amber-50/70 px-3 py-3 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-100">
          <label class="flex items-center justify-between gap-3">
            <span>指定解密器(函数名)</span>
            <input
              v-model="options.decoderNames"
              class="w-48 rounded border border-amber-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-amber-500/40 dark:bg-zinc-900"
              type="text"
              placeholder="例如: _0xabc123"
            >
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-[11px] text-zinc-600 dark:text-zinc-300">注入执行代码</span>
            <textarea
              v-model="options.setupCode"
              class="min-h-28 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-amber-500/40 dark:bg-zinc-900"
              placeholder="// 需要在执行前注入的代码"
            />
          </label>
        </div>
      </div>

      <div class="space-y-2 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-3 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900/70">
        <div class="flex items-center gap-2">
          <label class="flex cursor-pointer items-center gap-2">
            <input
              v-model="options.isMarkEnable"
              type="checkbox"
              class="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-400 dark:border-zinc-600 dark:bg-zinc-800"
            >
            <span class="text-sm font-medium">启用关键字标记</span>
          </label>
          <Tooltip text="在反混淆后的代码中高亮标记指定关键字，便于快速定位关键逻辑（如 sign、token 等），用英文逗号分隔">
            <span class="i-ri:question-line h-4 w-4 cursor-help text-zinc-400" />
          </Tooltip>
        </div>
        <div v-if="options.isMarkEnable" class="space-y-1">
          <label class="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            <span>关键字列表</span>
          </label>
          <input
            v-model="keywordsStr"
            type="text"
            class="w-full rounded border border-zinc-200 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="debugger, sign, token"
          >
        </div>
      </div>

      <div class="space-y-2 rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-3 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900/70">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium">变量名优化 (mangle)</span>
          <select
            v-model="options.mangleMode"
            class="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option v-for="mode in mangleModes" :key="mode.value" :value="mode.value">
              {{ mode.label }}
            </option>
          </select>
        </div>
        <div v-if="isCustomMangle" class="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
          <label class="flex items-center gap-2">
            <span class="whitespace-nowrap">正则</span>
            <input
              v-model="options.manglePattern"
              class="flex-1 rounded border border-zinc-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="例如: _0x[a-f\\d]+"
            >
          </label>
          <label class="flex items-center gap-2">
            <span class="whitespace-nowrap">Flags</span>
            <input
              v-model="options.mangleFlags"
              class="flex-1 rounded border border-zinc-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="如: gim"
            >
          </label>
        </div>
      </div>
    </div>
  </dialog>
</template>
