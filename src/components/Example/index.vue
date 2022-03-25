<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CodeEditor from '~/components/CodeEditor/src/CodeEditor.vue'
import obfuscatorCode from './js/obfuscatorCode.js?raw'
import deobfuscatorCode from './js/deobfuscatorCode.js?raw'

const codeStyle = ref('min-height: 500px; height: 500px')

const jscode = ref('')
const result = ref('')

onMounted(() => {
  jscode.value = obfuscatorCode
  result.value = deobfuscatorCode
})
</script>

<template>
  <p style="text-align: center">
    更多完整针对性还原代码:
    <a target="_blank" href="https://github.com/kuizuo/js-de-obfuscator/example/deobfuscator">点我查看</a>
  </p>

  <el-row :gutter="5">
    <el-col :md="12" :sm="24">
      混淆代码
      <div :style="codeStyle">
        <CodeEditor v-model:value="jscode" />
      </div>
    </el-col>
    <el-col :md="12" :sm="24">
      还原代码
      <div :style="codeStyle">
        <CodeEditor v-model:value="result" />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
