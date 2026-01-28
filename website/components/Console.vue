<script setup lang="ts">
import { Pane } from 'splitpanes'
import type { ConsoleLogEntry } from '~/types/logger'

const props = withDefaults(defineProps<{
  logs: ConsoleLogEntry[]
  size: number
  collapsed: boolean
}>(), {
  logs: () => [],
  size: 24,
  collapsed: false,
})

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'clear'): void
}>()

const logContainer = shallowRef<HTMLDivElement>()
const timeFormatter = new Intl.DateTimeFormat('zh-CN', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function formatTime(value: number) {
  return timeFormatter.format(new Date(value))
}

watch(
  () => props.logs.length,
  async () => {
    if (props.collapsed)
      return

    await nextTick()
    const container = logContainer.value
    if (container)
      container.scrollTo({ top: container.scrollHeight })
  },
)

watch(
  () => props.collapsed,
  async (collapsed) => {
    if (!collapsed) {
      await nextTick()
      const container = logContainer.value
      if (container)
        container.scrollTo({ top: container.scrollHeight })
    }
  },
)
</script>

<template>
  <Pane
    :size="size"
    :min-size="collapsed ? 0 : 10"
    class="min-h-0"
  >
    <div
      class="flex flex-col rounded-lg border border-zinc-200/80 bg-white/90 shadow-sm dark:(border-zinc-800/80 bg-zinc-950/60)" :class="[
        collapsed ? 'h-auto' : 'h-full',
      ]"
    >
      <div class="flex items-center justify-between gap-3 border-b border-zinc-200/70 px-3 py-2 text-xs font-medium text-zinc-700 dark:(border-zinc-800/70 text-zinc-200)">
        <div class="flex items-center gap-2">
          <div class="i-ri:terminal-box-line text-lg text-amber-500" />
          <span class="font-semibold">控制台</span>
          <span class="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">实时查看 Deob 日志</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="logs.length"
            class="inline-flex items-center gap-1 rounded-md border border-zinc-200/70 bg-white/90 px-2 py-1 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
            title="清空日志"
            @click="emit('clear')"
          >
            <div class="i-ri:delete-bin-6-line text-sm" />
            <span>清空</span>
          </button>
          <button
            class="inline-flex items-center gap-1 rounded-md border border-zinc-200/70 bg-white/90 px-2 py-1 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:(border-amber-400 text-amber-700) dark:(border-zinc-700 bg-zinc-900/80 text-zinc-200)"
            title="展开或收起"
            @click="emit('toggle')"
          >
            <div :class="collapsed ? 'i-ri:layout-bottom-line' : 'i-ri:arrow-down-s-line'" class="text-sm" />
            <span>{{ collapsed ? '展开' : '收起' }}</span>
          </button>
        </div>
      </div>
      <div
        v-if="!collapsed"
        ref="logContainer"
        class="min-h-0 flex-1 overflow-auto rounded-b-lg bg-gradient-to-b from-zinc-950/70 via-zinc-950/80 to-black px-3 py-2 font-mono text-[12px] leading-6 text-zinc-100 shadow-inner dark:(from-zinc-950/80 via-zinc-900/80 to-black)"
      >
        <template v-if="logs.length">
          <div
            v-for="entry in logs"
            :key="entry.id"
            class="mb-2 last:mb-0 rounded-md bg-white/5 p-2 shadow-inner ring-1 ring-white/5"
          >
            <div class="text-[10px] uppercase tracking-wide text-emerald-400/80">
              {{ formatTime(entry.timestamp) }}
            </div>
            <pre class="mt-1 whitespace-pre-wrap break-words">{{ entry.message }}</pre>
          </div>
        </template>
        <div
          v-else
          class="flex h-full items-center justify-center text-xs text-zinc-500 dark:text-zinc-400"
        >
          运行解混淆后，这里会显示日志输出
        </div>
      </div>
    </div>
  </Pane>
</template>
