<template>
  <header
    class="flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl dark:(border-zinc-800/80 bg-zinc-900/70)"
  >
    <div class="flex items-center gap-3">
      <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-sm">
        <div class="i-vscode-icons:file-type-js-official text-2xl" />
      </div>
      <div>
        <p class="text-sm font-semibold leading-tight">
          JS Deobfuscator
        </p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          Paste obfuscated JavaScript on the left, get readable code on the right.
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="inline-flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-white/80 px-1.5 py-1.5 text-xs font-medium transition hover:(border-amber-400 text-amber-600) dark:(border-zinc-700 bg-zinc-900/80)"
        @click="toggleDark"
      >
        <div class="i-ri:sun-line text-base dark:i-ri:moon-line" />
      </button>
      <a
        class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition hover:from-amber-500 hover:to-orange-600"
        href="https://github.com/kuizuo/js-deobfuscator"
        target="_blank"
      >
        <div class="i-ri:github-line" />
        <span>GitHub</span>
      </a>
    </div>
  </header>
</template>
