<script lang="ts" setup>
import { CodeEditor } from '~/components/CodeEditor'
import { Deobfuscator } from '~/utils/ast/deobfuscator'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'
import { downloadByData } from '/@/utils/file/download'
import { IConfig } from '~/data/config'

const props = defineProps<{
  configList: IConfig[]
}>()

const { configList } = toReactive(props)
const { clipboardRef, copiedRef } = useCopyToClipboard()

const jscode = ref('')
const result = ref('')

async function deobfuscator() {
  try {
    let start = Date.now()

    let _configList = toRaw(configList).filter((c) => {
      if (!c.disable) return true
    })

    // TODO: 放到WebWorker中执行
    const deob = new Deobfuscator(
      jscode.value,
      [],
      {
        minified: false,
        jsescOption: { minimal: true },
        compact: false,
        comments: true,
      },
      false,
    )

    deob.run()

    const code = deob.getCode()
    result.value = code

    let end = Date.now()

    ElMessage.success({ message: `还原完毕，用时${end - start}ms` })
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
</script>

<template>
  <section>
    <div class="p-2 flex justify-center gap-20 flex-col" lg="flex-row">
      <div class="min-w-1/2" h="125">
        <h3 text="center lg" font="semibold">输入</h3>
        <CodeEditor v-model:value="jscode" />
        <div class="flex gap-4 justify-center">
          <Button @click="deobfuscator()">还原</Button>
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
