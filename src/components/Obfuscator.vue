<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { CodeEditor } from '~/components/CodeEditor'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'
import { AstEnc } from '~/utils/ast/enc'

const activeName = ref('jscode')
const { clipboardRef, copiedRef } = useCopyToClipboard()
const codeStyle = ref('min-height: 500px; height: 500px')

const tableData = [
  {
    label: '标识符混淆',
    content: `
    var a = "kuizuo" 转
    var OOOOOo = "kuizuo"`,
  },
  {
    label: '字符串混淆',
    content: `
    var a = "kuizuo" 转 
    var arr = ["a3VpenVv"]; 
    var a = atob(arr[0])`,
  },
  {
    label: '花指令',
    content: `
    var c = a + b 转 
    function z(x, y){ return x + y } 
    var c = z(a, b)`,
  },
  {
    label: '数值混淆',
    content: `
    var a = 1 转
    var a = 454996 ^ 454997;`,
  },
  {
    label: '代码压缩',
    content: `将代码压缩成一行`,
  },
  {
    label: '移除注释',
    content: `将代码中的注释移除`,
  },
]

const jscode = ref('')
const result = ref('')

const config = ref({
  identifier: true,
  flowerCode: true,
  stringEncrypt: true,
  numericEncrypt: false,
  compact: false,
  removeComments: false,
})

const identifierString = ref('Oo0')

const obfuscator = () => {
  try {
    let start = Date.now()
    let setting = {
      jscode: jscode.value,
      identifierArr: identifierString.value.split(''),
      config: config.value,
    }

    let astEnc = new AstEnc(setting)

    const code = astEnc.run()

    result.value = code

    let end = Date.now()

    ElMessage.success({ message: `混淆完毕，用时${end - start}ms` })
    activeName.value = 'result'
  } catch (error) {
    console.error(error)
    ElMessage.error({ message: (error as Error).message })
  }
}

const clear = () => {
  jscode.value = ''
}

const download = () => {
  if (result.value) {
    downloadByData(result.value, '混淆.js')
  }
}

const copy = () => {
  clipboardRef.value = result.value
  if (unref(copiedRef)) {
    ElMessage.success('复制成功！')
  }
}
</script>


<template>
  <el-alert
    center
    title="本混淆对js代码进行简单混淆，想要更好的混淆(限制)效果不妨使用https://www.obfuscator.io/"
    type="warning"
    :closable="false"
  ></el-alert>
  <el-row :gutter="5">
    <el-col :md="12" :sm="24">
      <el-tabs type="card" v-model="activeName" stretch style="min-height: 600px; height: 600px">
        <el-tab-pane label="复制粘贴JavaScript代码" name="jscode">
          <div :style="codeStyle">
            <CodeEditor v-model:value="jscode" />
          </div>
          <el-space class="btn-group">
            <el-button type="success" size="small" @click="obfuscator">混淆</el-button>
            <el-button size="small" @click="clear">清空</el-button>
          </el-space>
        </el-tab-pane>
        <!-- <el-tab-pane label="上传JavaScript文件" name="upload">上传JavaScript文件</el-tab-pane> -->
        <el-tab-pane label="输出结果" name="result">
          <div :style="codeStyle">
            <CodeEditor v-model:value="result" readonly />
          </div>
          <el-space class="btn-group">
            <el-button type="primary" size="small" @click="download">下载</el-button>
            <el-button type="primary" size="small" @click="copy">复制</el-button>
          </el-space>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :md="12" :sm="24">
      <div>
        <p style="text-align: center">配置</p>
        <div class="config">
          <el-checkbox v-model="config.identifier" label="标识符混淆" />
          <el-checkbox v-model="config.flowerCode" label="花指令" />
          <el-checkbox v-model="config.stringEncrypt" label="字符串混淆" />
          <el-checkbox v-model="config.numericEncrypt" label="数值混淆" />
        </div>
        <div class="config">
          <el-checkbox v-model="config.compact" label="代码压缩" />
          <el-checkbox v-model="config.removeComments" label="移除注释" />
        </div>
        <div class="config">
          <el-input v-model="identifierString" size="small" style="width: 150px">
            <template #prepend>标识符</template>
          </el-input>
        </div>
        <p style="text-align: center">配置说明</p>

        <el-table :data="tableData" border style="width: 100%" size="small">
          <el-table-column prop="label" label="配置" width="180" />
          <el-table-column prop="content" label="说明" />
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.btn-group {
  margin-top: 5px;
  display: flex;

  justify-content: center;
}

.el-tabs {
  ::v-deep(.el-tabs__header) {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
}

.config {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.el-row > div:nth-child(2) {
  border-left: 1px solid var(--el-border-color-light);
}

@media (max-width: 992px) {
  .el-row > div:nth-child(2) {
    border-left: 0px solid var(--el-border-color-light);
  }
}
</style>
