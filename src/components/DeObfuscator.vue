<script lang="ts" setup>
import { computed, CSSProperties, nextTick, onMounted, reactive, ref, toRaw, unref } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import draggable from 'vuedraggable'
import 'splitpanes/dist/splitpanes.css'
import { ElMessage, ElLoading } from 'element-plus'
import { CodeEditor } from '~/components/CodeEditor'
import { AstDec } from '~/utils/ast/dec'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'

const activeName = ref('jscode')
const { clipboardRef, copiedRef } = useCopyToClipboard()

const PaneRef = ref<HTMLElement>()
const horizontal = computed(() => screenWidth.value < 992)
const screenWidth = ref(1920)
const contentHeight = ref(600)

const codeEditStyle = computed((): CSSProperties => {
  const height = `${contentHeight.value}px`

  return {
    minHeight: height,
    height: height,
  }
})

const jscode = ref('')
const result = ref('')

interface Config {
  id?: number
  name: string
  value?: string
  disable?: boolean
}

const configData = [
  {
    name: '重解析AST',
    value: 'reParse',
    content: '对于遍历后生成的节点,需要重新解析才能获取最新节点',
  },
  {
    name: '寻找解密函数',
    value: 'findDecFunction',
    label: '调用次数',
    arguments: '100',
    content: `
      找到调用最频繁的函数即解密函数，调用次数根据混淆后的大数组的长度而定,对于千行以上代码,一般都为100次以上
    `,
  },
  {
    name: '解密函数还原',
    value: 'doDecStringFuncFlower',
    content: `
    _0x3028('0x1c', '\x73\x4c\x64\x6e') 转
    "kuizuo"
    `,
  },
  {
    name: '移除解密函数语句',
    value: 'removeDecFunction',
    content: `
    移除解密函数所定义的语句(有可能会导致运行出错,依情况使用)
    `,
  },
  {
    name: '字符串花指令',
    value: 'stringflowerCode',
    content: `
    var _0x52627b = {
      'QqaUY': "attribute",
    }
    _0x52627b["QqaUY"] 转 "attribute"`,
  },
  {
    name: '函数花指令',
    value: 'funcFlowerCode',
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
    name: 'Switch流程平坦化',
    value: 'switchFlat',
    content: `
    针对switch流程混淆还原成正常执行流程语句`,
  },
  {
    name: '二项式计算',
    value: 'transformBinary',
    content: `
    'de' + 'bugger' 转 debugger
    和 1 + 2 转 3`,
  },
  {
    name: '字面量引用替换',
    value: 'replaceLiteral',
    content: `
    var a = "kuizuo"; b = a 转 b = "kuizuo"
    将字符串和数值常量直接替换对应的变量引用地方`,
  },
  {
    name: '布尔值还原',
    value: 'unaryExpression',
    content: `将 !![] 转化为true ![] 转为false（!0 !1同理）`,
  },
  {
    name: '改变对象属性访问方式',
    value: 'changeObjectAccessMode',
    content: `将console['log']() 转 console.log()`,
  },
  {
    name: '转正常字符串',
    value: 'hexUnicodeToString',
    content: `将所有十六进制编码与Unicode编码转为正常字符() 以及将0x123转化为291`,
  },
  {
    name: '移除无用变量',
    value: 'transformBoolean',
    content: `var _0x12345 = 100; _0x12345未使用过直接移除`,
  },
  {
    name: '移除无用代码块',
    value: 'removeUnusedValue',
    content: `if(false){ } 这类代码直接移除 `,
  },
  {
    name: '代码压缩',
    value: 'compact',
    content: `将代码压缩成一行,防止检测代码格式化无法运行`,
  },
  {
    name: '标识符重命名',
    value: 'renameIdentifier',
    content: `针对OOOoo0而言，_0xabc就好看一丢丢(实际用处不大)`,
  },
  {
    name: '添加注释',
    value: 'addComments',
    label: '关键词',
    arguments: 'debugger,CryptoJS,password',
    content: `如setInterval,debugger,password 前加上// TOLOOK 注释`,
  },
]

// 正常流程
const defaultConfig = [
  { name: '寻找解密函数', arguments: '100' },
  { name: '解密函数还原' },
  { name: '解密函数调用次数' },
  { name: '字符串花指令' },
  { name: '函数花指令' },
  { name: '重解析AST' },
  { name: 'Switch流程平坦化', disable: true },
  { name: '二项式计算' },
  { name: '字面量引用替换' },
  { name: '布尔值还原' },
  { name: '改变对象属性访问方式' },
  { name: '转正常字符串' },
  { name: '移除无用变量' },
  { name: '移除无用代码块' },
  { name: '移除解密函数语句', disable: true },
  { name: '代码压缩' },
  { name: '添加注释', arguments: 'debugger,CryptoJS,password' },
]

let nextId = ref(0)
const configList = reactive<Config[]>([...defaultConfig.map((c) => ({ ...configData.find((config) => config.name === c.name), ...c, id: ++nextId.value }))])

const drag = ref(false)
const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

onMounted(() => {
  window.onresize = () => {
    screenWidth.value = window.innerWidth
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect
      contentHeight.value = cr.height < contentHeight.value ? contentHeight.value : cr.height
    }
  })

  resizeObserver.observe(PaneRef.value!)
})

async function deobfuscator() {
  try {
    let start = Date.now()

    let _configList = toRaw(configList).filter((c) => {
      if (!c.disable) return true
    })

    let astDec = new AstDec({
      jscode: jscode.value,
      configList: _configList,
    })

    // ElMessage.success({ message: `正在还原,请稍等...` })

    // const loading = ElLoading.service({
    //   lock: true,
    //   fullscreen: true,
    //   text: '正在还原,请稍等...',
    //   background: 'rgba(0, 0, 0, 0.7)',
    // })

    let code = await astDec.run()
    // loading.close()
    
    result.value = code

    let end = Date.now()

    ElMessage.success({ message: `还原完毕，用时${end - start}ms` })

    activeName.value = 'result'
  } catch (error) {
    console.error(error)
    ElMessage.error({ message: (error as Error).message })
  }
}

function clear() {
  jscode.value = ''
}

function download() {
  if (result.value) {
    downloadByData(result.value, '还原.js')
  }
}

function copy() {
  clipboardRef.value = result.value
  if (unref(copiedRef)) {
    ElMessage.success('复制成功！')
  }
}

function addConfig(config: Config) {
  configList.push({
    ...config,
    id: nextId.value++,
  })
}

function removeConfig(config: Config) {
  configList.splice(
    configList.findIndex((item) => item.id === config.id),
    1,
  )
}

function disableConfig(config: Config) {
  let index = configList.findIndex((item) => item.id === config.id)
  configList[index].disable = !configList[index].disable
}

function clearConfig() {
  configList.length = 0
}

function reset() {
  configList.length = 0
  configList.push(...defaultConfig)
}

function exportConfig() {
  clipboardRef.value = JSON.stringify(configList.map((c) => ({ name: c.name, value: c.value })))
  if (unref(copiedRef)) {
    ElMessage.success('复制成功！')
  }
}
</script>

<template>
  <splitpanes :horizontal="horizontal" class="default-theme bg-white">
    <pane min-size="50" max-size="75">
      <el-tabs type="card" v-model="activeName" stretch style="padding: 5px">
        <el-tab-pane label="复制粘贴JavaScript代码" name="jscode">
          <div :style="codeEditStyle">
            <CodeEditor v-model:value="jscode" />
          </div>
          <el-space class="btn-group">
            <el-button type="success" size="small" @click="deobfuscator">还原</el-button>
            <el-button size="small" @click="clear">清空</el-button>
          </el-space>
        </el-tab-pane>
        <!-- <el-tab-pane label="上传JavaScript文件" name="upload">上传JavaScript文件</el-tab-pane> -->
        <el-tab-pane label="输出结果" name="result">
          <div :style="codeEditStyle">
            <CodeEditor v-model:value="result" readonly />
          </div>
          <el-space class="btn-group">
            <el-button type="primary" size="small" @click="download">下载</el-button>
            <el-button type="primary" size="small" @click="copy">复制</el-button>
          </el-space>
        </el-tab-pane>
      </el-tabs>
    </pane>
    <pane>
      <div ref="PaneRef" style="padding: 5px">
        <el-row :gutter="5">
          <el-col :span="16">
            <el-card :body-style="{ padding: '5px' }" shadow="none">
              <template #header>
                <span>配置列表</span>
                <el-icon :size="20" style="float: right; cursor: pointer" @click="clearConfig">
                  <svg t="1648222322164" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1403" width="200" height="200">
                    <path
                      d="M810.667 170.667H661.333L618.667 128H405.333l-42.666 42.667H213.333V256h597.334M256 810.667A85.333 85.333 0 0 0 341.333 896h341.334A85.333 85.333 0 0 0 768 810.667v-512H256v512z"
                      fill=""
                      p-id="1404"
                    ></path>
                  </svg>
                </el-icon>
                <el-icon :size="20" style="float: right; cursor: pointer" @click="reset">
                  <svg t="1648227074399" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2198" width="200" height="200">
                    <path
                      d="M808 602.9c-23.6 164.2-181.8 285.5-358.7 248.3C336.9 827.6 245.6 736.8 222 624.4c-40.3-192 92-361.8 290.4-361.8v99.2l248-148.8-248-148.8v99.2c-248 0-438 222.4-388.6 476.5 30.1 154.7 155 279.4 309.7 309.5C668 995 875.6 833.9 906.2 616.1c4.2-29.6-19.7-55.8-49.5-55.8h0.1c-24.7 0-45.3 18.2-48.8 42.6z"
                      p-id="2199"
                    ></path>
                  </svg>
                </el-icon>
              </template>
              <draggable
                v-model="configList"
                class="list-group"
                v-bind="dragOptions"
                :component-data="{
                  tag: 'ul',
                  type: 'transition-group',
                  name: !drag ? 'flip-list' : null,
                }"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
              >
                <template #item="{ element }">
                  <li :class="`list-group-item ${element.disable ? 'disable' : ''}`" :key="element.id">
                    {{ element.name }}
                    <el-input
                      v-if="element.arguments ?? ''"
                      size="small"
                      v-model="element.arguments"
                      draggable="false"
                      :style="{
                        width: element.arguments.length < 10 ? '100px' : '250px',
                        marginLeft: '5px',
                      }"
                      @onfocus="drag = false"
                    >
                      <template #prepend style="padding: 0 5px">{{ element.label }}</template>
                    </el-input>
                    <span style="display: flex; float: right; vertical-align: middle">
                      <el-icon :size="20" color="#9e9e9e" @click="disableConfig(element)">
                        <svg t="1648222342906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2198" width="200" height="200">
                          <path d="M304 176h80v672h-80zM712 176h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" p-id="2199"></path>
                        </svg>
                      </el-icon>
                      <el-icon :size="20" color="#9e9e9e" @click="removeConfig(element)">
                        <svg t="1648222322164" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1403" width="200" height="200">
                          <path
                            d="M810.667 170.667H661.333L618.667 128H405.333l-42.666 42.667H213.333V256h597.334M256 810.667A85.333 85.333 0 0 0 341.333 896h341.334A85.333 85.333 0 0 0 768 810.667v-512H256v512z"
                            fill=""
                            p-id="1404"
                          ></path>
                        </svg>
                      </el-icon>
                    </span>
                  </li>
                </template>
              </draggable>
            </el-card>
            <!-- <el-button @click="exportConfig">导出配置</el-button> -->
          </el-col>
          <el-col :span="6">
            <div style="display: flex; flex-direction: column; gap: 5px">
              <div v-for="item in configData">
                <el-tooltip class="box-item" :content="item.content" placement="left-start">
                  <el-button style="width: 150px" @click="addConfig(item)">{{ item.name }}</el-button>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </pane>
  </splitpanes>
</template>

<style scoped lang="scss">
.btn-group {
  margin-top: 5px;
  display: flex;

  justify-content: center;
}

:deep(.el-input-group__prepend) {
  padding: 0 5px;
}

.el-tabs {
  ::v-deep(.el-tabs__header) {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
}

.bg-white {
  .splitpanes__pane {
    background-color: white;
  }

  :deep(.splitpanes__splitter) {
    background-color: #eee;
  }
}

.list-group {
  min-height: 20px;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}
.list-group-item {
  cursor: grab;
  position: relative;
  display: block;
  padding: 0.25rem 0.25rem;
  color: #468847;
  background-color: #dff0d8;
  border-color: #d3e8c0;
  border-bottom-width: 1px;
  border-style: none none solid;
}

.disable {
  color: #b94a48;
  background-color: #f2dede;
}

.list-group-item i {
  cursor: pointer;
}

:deep(.el-card__header) {
  padding: 5px;
}
</style>
