<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue'

const activeName = ref('deobfuscator')
const componentKey = ref(0)
const componentsList = [
  {
    title: 'js混淆',
    name: 'obfuscator',
    component: defineAsyncComponent(() => import('./Obfuscator.vue')),
  },
  {
    title: 'js还原',
    name: 'deobfuscator',
    component: defineAsyncComponent(() => import('./DeObfuscator.vue')),
  },
  {
    title: 'js还原示例代码',
    name: 'example',
    component: defineAsyncComponent(() => import('./Example/index.vue')),
  },
  {
    title: '帮助说明',
    name: 'help',
    component: defineAsyncComponent(() => import('./Help.vue')),
  },
]

const isComponent = computed(() => componentsList.find((c) => c.name === activeName.value)?.component)
</script>

<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane v-for="item in componentsList" :key="item.name" :label="item.title" :name="item.name">
      <keep-alive>
        <component :is="isComponent" v-if="activeName === item.name"></component>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.el-tabs {
  ::v-deep(.el-tabs__content) {
    padding: 0px;
  }
}
</style>
