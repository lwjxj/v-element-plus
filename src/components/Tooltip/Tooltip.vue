<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside.ts'
import { debounce } from 'lodash-es'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  manual: false,
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNodeRef = ref<HTMLElement>()
const popperNodeRef = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions
  }
})

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const openDebounce = debounce(open, props.openDelay)
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const closeDebounce = debounce(close, props.closeDelay)
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}

watch(
  () => props.manual,
  (newVal) => {
    if (newVal) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      // clear events
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerNodeRef.value && popperNodeRef.value) {
        popperInstance = createPopper(
          triggerNodeRef.value,
          popperNodeRef.value,
          popperOptions.value
        )
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

const popperContainerNodeRef = ref<HTMLElement>()
useClickOutside(popperContainerNodeRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeDebounce()
  }
})

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<template>
  <div class="vk-tooltip" ref="popperContainerNodeRef" v-on="outerEvents">
    <div ref="triggerNodeRef" class="vk-tooltip__trigger" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNodeRef" class="vk-tooltip__popper">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vk-tooltip__trigger {
  width: fit-content;
}
</style>
