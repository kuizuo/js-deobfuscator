<script setup lang="ts"></script>

<template>
  <main h="full" font="sans" text="center gray-700 dark:gray-200" class="relative">
    <TheNav />
    <router-view v-slot="{ Component }">
      <transition name="page-fade">
        <component :is="Component" absolute left-0 right-0 top-25 />
      </transition>
    </router-view>
  </main>
</template>
