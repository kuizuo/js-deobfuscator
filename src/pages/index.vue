<script lang="ts" setup>
import { IConfig, configData, defaultConfig } from '~/data/config'

let nextId = ref(0)
const configList = reactive<IConfig[]>([
  ...defaultConfig.map((c) => ({ ...configData.find((config) => config.name === c.name), ...c, id: ++nextId.value })),
])
</script>

<template>
  <div class="container mx-auto px-4">
    <p font="semibold">一个JavaScript解混淆工具,去除常见混淆手段</p>
    <DeObfuscator :config-list="configList"></DeObfuscator>
    <Config :config-list="configList"></Config>
  </div>
</template>
