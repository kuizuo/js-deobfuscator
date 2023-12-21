<script setup lang="ts">
import json5 from 'json5'
import { options } from '#imports'

const dialog = ref<HTMLDialogElement>()

function openDialog() {
  dialog.value?.showModal()
}

function handleDialogClick(evt: MouseEvent) {
  if (evt.target === evt.currentTarget)
    dialog.value?.close()
}

const keywordsValue = ref(JSON.stringify(options.value.keywords))

watchEffect(() => {
  try {
    options.value.keywords = json5.parse(keywordsValue.value)
  }
  catch (error) {
    console.error(error)
    options.value.keywords = []
  }
})
</script>

<template>
  <div flex items-center justify-center>
    <button class="i-ri:settings-line" @click="openDialog" />
    <dialog ref="dialog" min-h-130 rounded p0 @click="handleDialogClick">
      <div py2 text-center text-lg font-bold>
        反混淆配置
        <button
          class="i-ri:close-line"
          float-right
          p4
          @click="dialog?.close()"
        />
      </div>
      <hr>

      <div px-4 py-2 w-40vw>
        <div flex="~ col gap-2" text-base w-full>
          <div class="border-b border-gray-200 text-lg">
            解密配置
          </div>
          <label class="inline-flex items-center gap-2">
            <div class="flex-1">
              <span mr-2>解密器定位方式</span>
              <select
                v-model="options.decoderLocationMethod"
                class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:bg-gray-700"
              >
                <option value="callCount">调用次数</option>
                <option value="stringArray">字符串数组长度</option>
                <option value="evalCode">执行解密代码</option>
              </select>
            </div>

            <div v-if="options.decoderLocationMethod === 'callCount'">
              调用次数
              <input
                v-model="options.decoderCallCount"
                class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:bg-gray-700"
                type="number" w-16 min="1" step="1"
              >
            </div>

            <div v-if="options.decoderLocationMethod === 'stringArray'">
              字符串数组长度
              <input
                v-model="options.stringArraylength"
                class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:bg-gray-700"
                type="number" w-16 min="1" step="1"
              >
            </div>
            <div v-if="options.decoderLocationMethod === 'evalCode'" class="inline-flex items-center gap-2">
              <span>指定解密器(函数名)</span>
              <input
                v-model="options.designDecoderName" class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:bg-gray-700"
                w-32
                type="input"
              >
            </div>
          </label>

          <CodeEditor
            v-if="options.decoderLocationMethod === 'evalCode'"
            v-model="options.setupCode"
            class="!h-40"
            language="javascript"
          />

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否移除解密器(后续用不到)</span>
            <input v-model="options. isRemoveDecoder" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">解密器嵌套函数深度</span>
            <input
              v-model="options.inlineWrappersDepth"
              class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:bg-gray-700"
              type="number" w-16 min="1" step="1"
            >
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">混淆花指令还原执行次数</span>
            <input
              v-model="options.execCount"
              class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:(bg-gray-700 disabled-bg-gray-900) disabled:bg-gray-100"
              type="number" w-16 min="1" max="5" step="1"
            >
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">强力清除(会对解混淆后的代码再次执行)</span>
            <input v-model="options.isStrongRemove" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">调试模式</span>
            <input v-model="options.isDebug" type="checkbox">
          </label>

          <div class="border-b border-gray-200 text-lg mt-2">
            输出配置
          </div>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否压缩代码 (将不会有任何注释)</span>
            <input v-model="options.isMinifiedEnable" type="checkbox">
          </label>

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否优化变量名</span>
            <input v-model="options.mangle" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否标记关键标识符</span>
            <input v-model="options.isMarkEnable" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">标识符</span>
            <input
              v-model="keywordsValue" class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:(bg-gray-700 disabled-bg-gray-900) disabled:bg-gray-100"
              type="input"
            >
          </label>
        </div>
      </div>
    </dialog>
  </div>
</template>
