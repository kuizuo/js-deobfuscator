<template>
  <el-row :gutter="5">
    <el-col :md="12" :sm="24">
      <el-tabs type="card" v-model="activeName" stretch style="min-height: 600px; height: 600px">
        <el-tab-pane label="复制粘贴JavaScript代码" name="jscode">
          <div :style="codeStyle">
            <CodeEditor v-model:value="jscode" />
          </div>
          <el-space class="btn-group">
            <el-button type="success" size="small" @click="handlClick">还原</el-button>
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
        <p style="text-align: center; font-size: 14px">混淆还原配置</p>
        <div class="config">
          <el-checkbox v-model="config.decFunctionString" label="解密函数还原" />
          <el-checkbox v-model="config.removeDecFunction" label="移除解密函数语句" />
          <el-checkbox v-model="config.stringflowerCode" label="字符串花指令" />
          <el-checkbox v-model="config.funcFlowerCode" label="函数花指令" />
          <el-checkbox v-model="config.switchFlat" label="switch流程平坦化" />
          <el-checkbox v-model="config.transformBinary" label="二项式计算" />
          <el-checkbox v-model="config.replaceLiteral" label="字面量引用替换" />
          <el-checkbox v-model="config.transformBoolean" label="布尔值还原" />
        </div>
        <p style="text-align: center; font-size: 14px">生成代码后配置</p>
        <div class="config">
          <el-checkbox v-model="config.changeObjectAccessMode" label="改变对象属性访问方式" />
          <el-checkbox v-model="config.removeUnusedValue" label="移除无用变量" />
          <el-checkbox v-model="config.removeUnusedBlock" label="移除无用代码块" />
          <el-checkbox v-model="config.compact" label="代码压缩" />
          <el-checkbox v-model="config.renameIdentifier" label="标识符重命名" />
          <el-checkbox v-model="config.addComments" label="添加注释" />
        </div>
        <div class="config">
          <el-space>
            解密函数调用次数
            <el-input-number v-model="config.decFunctionCallCount" :min="20" :max="180" size="small"> </el-input-number>
            <el-input v-model="config.keyWords" size="small" style="width: 100%">
              <template #prepend>关键词</template>
            </el-input>
          </el-space>
        </div>
        <p style="text-align: center">配置说明</p>
        <p style="text-align: center; font-size: 12px">了解混淆的不用说明都会懂，不了解混淆的说明了也不会懂</p>

        <el-table :data="tableData" border style="width: 100%" size="small">
          <el-table-column prop="label" label="配置" width="180" />
          <el-table-column prop="content" label="说明" />
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref, unref } from 'vue'
import { CodeEditor } from '~/components/CodeEditor'
import { AstDec } from '~/utils/ast/dec'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'

const activeName = ref('jscode')
const { clipboardRef, copiedRef } = useCopyToClipboard()

const codeStyle = ref('min-height: 500px; height: 500px')

const tableData = [
  {
    label: '解密函数还原',
    content: `
    _0x3028('0x1c', '\x73\x4c\x64\x6e') 转 
    "kuizuo"
    `,
  },
  {
    label: '解密函数调用次数',
    content: `
根据混淆后的大数组的长度而定,对于千行以上代码,调用次数一般都为100次以上
    `,
  },
  {
    label: '移除解密函数语句',
    content: `
    移除解密函数所定义的语句(有可能会导致运行出错,依情况使用)
    `,
  },
  {
    label: '字符串花指令',
    content: `
    var _0x52627b = {
      'QqaUY': "attribute",
    }
    _0x52627b["QqaUY"] 转 "attribute"`,
  },
  {
    label: '函数花指令',
    content: `
    var _0x52627b = {
      'nWchU': function (_0x4cf812, _0x337d52) {
        return _0x4cf812 == _0x337d52;
      }
    }
    _0x52627b["nWchU"](_0x2efae8["length"], 8) 转 _0x2efae8["length"] == 8
    `,
  },
  {
    label: 'Switch流程平坦化',
    content: `
    针对switch流程混淆还原成正常执行流程语句`,
  },
  {
    label: '二项式计算',
    content: `
    'de' + 'bugger' 转 debugger
    和 1 + 2 转 3`,
  },
  {
    label: '字面量引用替换',
    content: `
    var a = "kuizuo"; b = a 转 b = "kuizuo"
    将字符串和数值常量直接替换对应的变量引用地方`,
  },
  {
    label: '布尔值还原',
    content: `将 !![] 转化为true ![] 转为false（!0 !1同理）`,
  },
  // {
  //   label: '转正常字符',
  //   content: `将所有十六进制编码与Unicode编码转为正常字符() 以及将0x123转化为291 `,
  // },
  {
    label: '改变对象属性访问方式',
    content: `将console['log']() 转 console.log()`,
  },
  {
    label: '移除无用变量',
    content: `var _0x12345 = 100; _0x12345未使用过直接移除`,
  },
  {
    label: '移除无用代码块',
    content: `if(false){ } 这类代码直接移除 `,
  },
  {
    label: '代码压缩',
    content: `将代码压缩成一行,防止检测代码格式化无法运行`,
  },
  {
    label: '标识符重命名',
    content: `针对OOOoo0而言，_0xabc就好看一丢丢(实际用处不大)`,
  },
  {
    label: '添加注释',
    content: `如setInterval,debugger,password 前加上// TOLOOK 注释`,
  },
]

const jscode = ref('')
const result = ref('')

// 还原默认配置

const config = ref({
  decFunctionString: true,
  decFunctionCallCount: 100,
  removeDecFunction: false,
  stringflowerCode: true,
  funcFlowerCode: true,
  switchFlat: false,
  replaceLiteral: true,
  transformBinary: true,
  unaryExpression: false,
  changeObjectAccessMode: false,
  transformBoolean: true,
  removeUnusedValue: false,
  removeUnusedBlock: false,
  compact: false,
  addComments: true,
  keyWords: 'debugger,CryptoJS,password',
  renameIdentifier: false,
})

const deobfuscator = async () => {
  try {
    let start = Date.now()
    let setting = {
      jscode: jscode.value,
      config: config.value,
    }

    let astDec = new AstDec(setting)

    ElMessage.success({ message: `正在还原,请稍等` })
    const code = astDec.run()

    result.value = code

    let end = Date.now()

    ElMessage.success({ message: `还原完毕，用时${end - start}ms` })
    activeName.value = 'result'
  } catch (error) {
    console.error(error)
    ElMessage.error({ message: (error as Error).message })
  }
}

const handlClick = function () {
  deobfuscator()
}

const clear = () => {
  jscode.value = ''
}

const download = () => {
  if (result.value) {
    downloadByData(result.value, '还原.js')
  }
}

const copy = () => {
  clipboardRef.value = result.value
  if (unref(copiedRef)) {
    ElMessage.success('复制成功！')
  }
}
</script>

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

  .el-checkbox {
    margin-right: 20px;
  }
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
