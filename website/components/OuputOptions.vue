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

      <div p-4 w-30vw>
        <div flex="~ col gap-2" text-base w-full>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">强力清除(会对解混淆后的代码再次执行,慎用)</span>
            <input v-model="options.isStrongRemove" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">执行解密函数</span>
            调用次数
            <input
              v-model="options.decryptFnCallCount"
              class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:(bg-gray-700 disabled-bg-gray-900) disabled:bg-gray-100"
              type="number" w-16 min="1" step="1" :disabled="!options.isDecryptFnEnabled"
            >
            <input v-model="options.isDecryptFnEnabled" type="checkbox">
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否移除解密函数(后续用不到)</span>
            <input v-model="options.isRemoveDecryptFn" type="checkbox">
          </label>

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">混淆花指令还原执行次数</span>
            <input
              v-model="options.execCount"
              class="pl-0.5 border border-gray-300 bg-white shadow-sm focus:(outline-none ring) dark:(bg-gray-700 disabled-bg-gray-900) disabled:bg-gray-100"
              type="number" w-16 min="1" max="5" step="1"
            >
          </label>

          <div class="border-b border-gray-200 text-lg mt-2">
            通用配置
          </div>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否计算二项式常量</span>
            <input v-model="options.isCalcBinaryEnable" type="checkbox">
          </label>

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否替换所有常量引用</span>
            <input v-model="options.isReplaceConstantEnable" type="checkbox">
          </label>

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否移除无用代码块</span>
            <input v-model="options.isRemoveUnusedBlock" type="checkbox">
          </label>

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否移除无用变量</span>
            <input v-model="options.isRemoveUnusedVariables" type="checkbox">
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

          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否输出到控制台</span>
            <input v-model="options.isLog" type="checkbox">
          </label>

          <div class="border-b border-gray-200 text-lg mt-2">
            输出配置
          </div>
          <label class="inline-flex items-center gap-2">
            <span class="flex-1">是否压缩代码 (将不会有任何注释)</span>
            <input v-model="options.isMinifiedEnable" type="checkbox">
          </label>
        </div>
      </div>

      <!-- 输入 解密函数 代码 -->
    </dialog>
  </div>
</template>
