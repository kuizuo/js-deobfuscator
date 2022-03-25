<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name">
      <keep-alive>
        <component :is="componentMap[activeName]"></component>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import Help from './Help.vue'
import Obfuscator from './Obfuscator.vue'
import DeObfuscator from './DeObfuscator.vue'
import Example from './Example/index.vue'

const activeName = ref('deobfuscator')

const tabs = ref([
  {
    title: 'js混淆',
    name: 'obfuscator',
  },
  {
    title: 'js还原',
    name: 'deobfuscator',
  },
  {
    title: 'js还原示例代码',
    name: 'example',
  },
  {
    title: '帮助说明',
    name: 'help',
  },
])

const componentMap = ref<any>({
  help: Help,
  example: Example,
  deobfuscator: DeObfuscator,
  obfuscator: Obfuscator,
})
</script>

<style lang="scss" scoped>
.el-tabs {
  ::v-deep(.el-tabs__content) {
    padding: 0px;
  }
}
</style>
