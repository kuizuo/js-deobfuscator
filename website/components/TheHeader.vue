<script setup lang="ts"></script>

<template>
  <div flex="~ wrap" items-center justify-between p2>
    <div flex="~ gap4">
      <div flex="~ gap1" items-center>
        <div i-vscode-icons:file-type-js-official w-10 h-10 />
        <h1 text-sm font-semibold font-mono>
          JS <br>Deobfuscator
        </h1>
      </div>
    </div>

    <div flex="~ gap-3">
      <button @click="toggleDark">
        <div i-ri:sun-line dark:i-ri:moon-line />
      </button>
      <a
        href="https://github.com/sxzz/ast-explorer"
        target="_blank"
        flex
        items-center
      >
        <div i-ri:github-line />
      </a>
    </div>
  </div>
</template>
