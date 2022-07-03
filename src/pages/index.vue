<script lang="ts" setup>
import { IConfig, configData, defaultConfig } from '~/data/config'

const nextId = ref(0)
const configList = reactive<IConfig[]>([...defaultConfig.map((c) => ({ ...configData.find((config) => config.name === c.name), ...c, id: ++nextId.value }))])
</script>

<template>
  <div class="container mx-auto px-4">
    <h2 font="semibold">一个JavaScript还原混淆工具</h2>
    <DeObfuscator :config-list="configList"></DeObfuscator>
    <!-- <Config :config-list="configList"></Config> -->
  </div>
</template>
