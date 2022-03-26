<template>
  <el-main>
    <Tabs />
  </el-main>
  <github-corner url="https://github.com/kuizuo/js-de-obfuscator"></github-corner>
</template>

<script setup lang="ts">
import Tabs from './components/Tabs.vue'
import GithubCorner from './components/GithubCorner.vue'
</script>

<style>
.el-main {
  margin: 0 auto;
  max-width: 1280px;
}

::-webkit-scrollbar {
  width: 7px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgb(0 0 0 / 5%);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(144 147 153 / 30%);
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgb(0 0 0 / 20%);
}
</style>
