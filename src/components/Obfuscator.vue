<script lang="ts" setup>
import { computed, CSSProperties, onMounted, reactive, ref, unref, nextTick, toRaw } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import draggable from 'vuedraggable'
import 'splitpanes/dist/splitpanes.css'
import { ElMessage } from 'element-plus'
import { CodeEditor } from '~/components/CodeEditor'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'
import { AstEnc } from '~/utils/ast/enc'

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
  content?: string
}

const configData: Config[] = [
  {
    name: '标识符混淆',
    value: 'identifier',
    content: `
    var a = "kuizuo" 转
    var OOOOOo = "kuizuo"`,
  },
  {
    name: '字符串混淆',
    value: 'flowerCode',
    content: `
    var a = "kuizuo" 转
    var arr = ["a3VpenVv"];
    var a = atob(arr[0])`,
  },
  {
    name: '花指令',
    value: 'stringEncrypt',
    content: `
    var c = a + b 转
    function z(x, y){ return x + y }
    var c = z(a, b)`,
  },
  {
    name: '数值混淆',
    value: 'numericEncrypt',
    content: `
    var a = 1 转
    var a = 454996 ^ 454997;`,
  },
  {
    name: '代码压缩',
    value: 'compact',
    content: `将代码压缩成一行`,
  },
  {
    name: '移除注释',
    value: 'removeComments',
    content: `将代码中的注释移除`,
  },
]

const defaultConfig = [
  { name: '标识符混淆', value: 'renameIdentifier' },
  { name: '字符串混淆', value: 'flowerCode' },
  { name: '花指令', value: 'stringEncrypt' },
  { name: '数值混淆', value: 'numericEncrypt' },
  { name: '代码压缩', value: 'compact' },
  { name: '移除注释', value: 'removeComments' },
]

let nextId = ref(0)
const configList = reactive<Config[]>([...defaultConfig.map((c) => ({ ...c, id: ++nextId.value }))])

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

function obfuscator() {
  try {
    const identifierString = ref('Oo0')
    let start = Date.now()

    let _configList = toRaw(configList).filter((c) => {
      if (!c.disable) return true
    })

    let setting = {
      jscode: toRaw(jscode.value),
      identifierArr: identifierString.value.split(''),
      configList: _configList,
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

function clear() {
  jscode.value = ''
}

function download() {
  if (result.value) {
    downloadByData(result.value, '混淆.js')
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
  <el-alert center title="本混淆对js代码进行简单混淆，想要更好的混淆(限制)效果不妨使用https://www.obfuscator.io/" type="warning" :closable="false"></el-alert>
  <splitpanes :horizontal="horizontal" class="default-theme bg-white">
    <pane min-size="50" max-size="75">
      <el-tabs type="card" v-model="activeName" stretch style="padding: 5px">
        <el-tab-pane label="复制粘贴JavaScript代码" name="jscode">
          <div :style="codeEditStyle">
            <CodeEditor v-model:value="jscode" />
          </div>
          <el-space class="btn-group">
            <el-button type="success" size="small" @click="obfuscator">混淆</el-button>
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
                  <el-button style="width: 100px" @click="addConfig(item)">{{ item.name }}</el-button>
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

.el-tabs {
  height: 100%;
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
