<script setup lang="ts">
import { isDark, toggleDark } from '~/hooks/web/useTheme'
</script>

<template>
  <nav p="x-8 y-4" m="b-4" border="b gray-400/10" flex="~ gap-2 " align="items-center">
    <RouterLink to="/" flex="~ gap-2" align="items-center">
      <img src="/favicon.svg" h="10" />
      <div font="mono" text="left sm" m="r-6" class="leading-1em">JS<br />Deobfuscator</div>
    </RouterLink>

    <div flex="auto" />
 
    <div flex="~ gap-4" align="items-center">
      <RouterLink to="/example">
        <div font="medium" text="sm" hover="opacity-100 text-teal-600">示例代码</div>
      </RouterLink>
      <RouterLink to="/help">
        <div font="medium" text="sm" hover="opacity-100 text-teal-600">帮助说明</div>
      </RouterLink>

      <button
        display="inline-block"
        cursor="pointer"
        select="none"
        opacity="75"
        transition="duration-200 ease-in-out"
        hover="opacity-100 text-teal-600"
        @click="toggleDark()"
      >
        <Icon v-if="isDark" icon="carbon:moon" size="24" />
        <Icon v-else icon="carbon:sun" size="24" />
      </button>
      <a
        href="https://github.com/kuizuo/js-de-obfuscator"
        target="_blank"
        title="GitHub"
        display="inline-block"
        cursor="pointer"
        select="none"
        opacity="75"
        transition="duration-200 ease-in-out"
        hover="opacity-100 text-teal-600"
      >
        <Icon icon="carbon:logo-github" size="24" />
      </a>
    </div>
  </nav>
</template>
