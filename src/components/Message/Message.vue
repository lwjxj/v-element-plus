<script setup lang="ts">
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import type { MessageProps } from './types.ts'
import RenderVNode from '../../components/Common/RenderVNode.ts'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method.ts'
import useEventListener from '../../hooks/useEventListener.ts'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const instance = getCurrentInstance()
console.log('instance:', instance)

let timer: ReturnType<typeof setTimeout>
const startTimer = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

const clearTimer = () => {
  clearTimeout(timer)
}

const visible = ref(false)

const destroyComponent = () => {
  props.onDestroy!()
}

const updateHeight = () => {
  height.value = messageRef.value!.getBoundingClientRect().height
}

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
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

const keydown = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

onMounted(async () => {
  visible.value = true
  startTimer()
})

defineExpose({
  bottomOffset,
  visible
})
</script>

<template>
  <Transition name="fade-up" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      v-show="visible"
      ref="messageRef"
      class="vk-message"
      :class="{ [`vk-message--${type}`]: type, 'is-close': showClose }"
      role="alert"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="vk-message__content">
        <slot>
          <RenderVNode v-if="message" :v-node="message" />
        </slot>
      </div>

      <div v-if="showClose" class="vk-message__close" @click.stop="visible = false">
        <Icon icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
