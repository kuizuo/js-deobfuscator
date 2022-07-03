<script lang="ts" setup>
import CodeEditor from '~/components/CodeEditor/src/CodeEditor.vue'
import obfuscatorCode from '~/data/js/obfuscatorCode.js?raw'
import deobfuscatorCode from '~/data/js/deobfuscatorCode.js?raw'

const jscode = ref('')
const result = ref('')

onMounted(() => {
  jscode.value = obfuscatorCode
  result.value = deobfuscatorCode
})

</script>

<template>
  <div class="container mx-auto px-4">
    <p class="text-centet">
      更多完整针对性还原代码:
      <a class="text-blue-400" target="_blank" href="https://github.com/kuizuo/js-de-obfuscator/example/deobfuscator">
        点我查看
      </a>
    </p>

    <div class="flex justify-center gap-20 flex-col" lg="flex-row">
      <div class="min-w-1/2" h="125">
        <h3 text="center lg" font="semibold">混淆代码</h3>
        <CodeEditor v-model:value="jscode" />
      </div>
      <div class="min-w-1/2" h="125">
        <h3 text="center lg" font="semibold">还原代码</h3>
        <CodeEditor v-model:value="result" />
      </div>
    </div>
  </div>
</template>
