<template>
  <transition name="fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div :class="customClass" v-show="visible" :style="styles">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, PropType, ref } from 'vue'
import type { MessageType } from './message'

const { id, message, type, duration, center, onClose, offset } = defineProps({
  id: { type: String, default: '' },
  message: { type: String, default: '' },
  type: { type: String as PropType<MessageType>, default: 'info' },
  duration: { type: Number, default: 3000 },
  center: { type: String, default: '' },
  onClose: { type: Function as PropType<() => void> },
  offset: { type: Number, default: 15 },
})

const customClass = computed(() => ['kz-message', type, center ? 'is-center' : ''])
const visible = ref(false)
let timer: any = null
const startTimer = () => {
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}
onMounted(() => {
  startTimer()
  visible.value = true
})

onUnmounted(() => {
  clearTimeout(timer)
})

const styles = computed(() => ({
  top: `${offset}px`,
}))
</script>

<style scoped>
.kz-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  background: #409eff;
  min-width: 300px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  display: flex;
  color: #fff;
  transition: all 0.4s linear;
}

.info {
  background-color: #409eff;
}
.success {
  background-color: #67c23a;
}
.warning {
  background-color: #e6a23c;
}
.error {
  background-color: #f56c6c;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
