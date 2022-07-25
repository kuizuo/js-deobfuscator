<script lang="ts" setup>
import { CodeEditor } from '~/components/CodeEditor'
import DeobfuscatorWorker from '~/utils/ast/deobfuscator?worker'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'
import { IConfig } from '~/data/config'
import { Message } from './Message'

const props = defineProps<{
  configList: IConfig[]
}>()

const { clipboardRef, copiedRef } = useCopyToClipboard()

const jscode = ref('')
const result = ref('')

let start = 0
let end = 0
const worker = new DeobfuscatorWorker()

worker.onmessage = ({ data }) => {
  if (data.type === 'error') {
    Message({
      message: data.message,
      type: 'error',
    })
    return
  }

  end = Date.now()
  Message({ message: `还原完毕，用时${end - start}ms`, type: 'success' })
  ;(start = 0), (end = 0)
  result.value = data.code
}

async function run() {
  if (!jscode.value) {
    Message({ message: '请输入代码', type: 'error' })
    return
  }
  start = Date.now()
  Message({ message: '正在还原，请稍等', type: 'info' })
  worker.postMessage({ code: jscode.value })
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
    Message({ message: '复制成功！', type: 'success' })
  }
}
</script>

<template>
  <section>
    <div class="p-2 flex justify-center gap-20 flex-col" lg="flex-row">
      <div class="min-w-1/2" h="125">
        <h3 text="center lg" font="semibold">输入</h3>
        <CodeEditor v-model:value="jscode" />
        <div class="flex gap-4 justify-center">
          <Button @click="run()">还原</Button>
          <Button @click="clear">清空</Button>
        </div>
      </div>

      <!-- <div w="125" h="125">
        <h3 text="center lg" font="semibold">配置</h3>
        <Config class="border-4 rounded-md"></Config>
      </div> -->

      <div class="min-w-1/2" h="125">
        <h3 text="center lg" font="semibold">输出</h3>
        <CodeEditor v-model:value="result" />
        <div class="flex gap-4 justify-center">
          <Button @click="copy" tooltip="复制成功">复制</Button>
          <Button @click="download">下载</Button>
        </div>
      </div>
    </div>
  </section>
</template>
