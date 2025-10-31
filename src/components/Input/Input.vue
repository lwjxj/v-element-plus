<script setup lang="ts">
import type { InputProps } from './types.ts'

defineOptions({
  name: 'VKInput'
})

withDefaults(defineProps<InputProps>(), { type: 'text' })
</script>

<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  ></div>
</template>

<style scoped></style>
