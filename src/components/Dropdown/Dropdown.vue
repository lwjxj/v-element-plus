<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { TooltipInstance } from '../Tooltip/types'
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVNode from '@/components/Common/RenderVNode.ts'

defineOptions({
  name: 'VkDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()

const visibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}

const optionClick = (e: MenuOption) => {
  if (e.disabled) return
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

const tooltipRef = ref() as Ref<TooltipInstance>

defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  hide: tooltipRef.value?.hide
})
</script>

<template>
  <div class="vk-dropdown">
    <Tooltip
      ref="tooltipRef"
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul>
          <template v-for="menuOption in menuOptions" :key="menuOption.key">
            <li v-if="menuOption.divided" role="separator" class="divider-placeholder"></li>
            <li
              class="vk-dropdown__item"
              :class="{ 'is-disabled': menuOption.disabled, 'is-divided': menuOption.divided }"
              :id="`dropdown-item-${menuOption.key}`"
              @click="optionClick(menuOption)"
            >
              <RenderVNode :vNode="menuOption.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped></style>
