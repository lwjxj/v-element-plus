<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from './types.ts'
import { computed } from 'vue'
import { size } from 'lodash-es'

defineOptions({
  name: 'VkSwitch',
  inheritAttrs: false
})

const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchEmits>()

const checked = computed(() => props.modelValue)
</script>

<template>
  <div
    class="vk-switch"
    :class="{ [`vk-switch--${size}`]: size, 'is-disabled': disabled, 'is-checked': checked }"
  >
    <input
      type="checkbox"
      class="vk-switch__input"
      role="switch"
      :name="name"
      :disabled="disabled"
    />
    <div class="vk-switch__core">
      <div class="vk-switch__core-action"></div>
    </div>
  </div>
</template>

<style scoped></style>
