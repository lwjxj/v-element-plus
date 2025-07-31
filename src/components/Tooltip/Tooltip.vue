<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { TooltipProps, TooltipEmits } from './types'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNodeRef = ref<HTMLElement>()
const popperNodeRef = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
attachEvents()

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
        popperInstance = createPopper(triggerNodeRef.value, popperNodeRef.value, {
          placement: props.placement
        })
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)
</script>

<template>
  <div class="vk-tooltip" v-on="outerEvents">
    <div ref="triggerNodeRef" class="vk-tooltip__trigger" v-on="events">
      <slot />
    </div>
    <div v-if="isOpen" ref="popperNodeRef" class="vk-tooltip__popper">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.vk-tooltip__trigger {
  width: fit-content;
}
</style>
