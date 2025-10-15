<script setup lang="ts">
import { ref, onMounted, watch, computed, getCurrentInstance, nextTick } from 'vue'
import type { MessageProps } from './types.ts'
import RenderVNode from '@/components/Common/RenderVNode.ts'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method.ts'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20
})

const instance = getCurrentInstance()
console.log('instance:', instance)

const startTimer = () => {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

const visible = ref(false)

watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy!()
  }
})

const messageRef = ref<HTMLDivElement>()
// 计算偏移高度
// div高度
const height = ref(0)
// 上一个实例下面的坐标数字，第一个实例下面的坐标数字为0
const lastOffset = computed(() => getLastBottomOffset(props.id!))
// 这个元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的offset，也就是它最底端bottom的值
const bottomOffset = computed(() => topOffset.value + height.value)

const cssStyle = computed(() => ({
  top: topOffset.value + 'px'
}))

onMounted(async () => {
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  bottomOffset
})
</script>

<template>
  <div
    v-show="visible"
    ref="messageRef"
    class="vk-message"
    :class="{ [`vk-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    :style="cssStyle"
  >
    <div class="vk-message__content">
      <slot>
        {{ offset }} -{{ topOffset }}-{{ height }}-{{ bottomOffset }}
        <RenderVNode v-if="message" :v-node="message" />
      </slot>
    </div>

    <div v-if="showClose" class="vk-message__close" @click.stop="visible = false">
      <Icon icon="xmark" />
    </div>
  </div>
</template>

<style scoped>
.vk-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid orange;
}
</style>
