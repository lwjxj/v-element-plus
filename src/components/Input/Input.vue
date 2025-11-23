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
  >
    <!--  input  -->
    <template v-if="type !== 'textarea'">
      <!--  prepend slot  -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend"></slot>
      </div>

      <div class="vk-input__wrapper">
        <!--  prefix slot  -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="append"></slot>
        </span>
        <input class="vk-input__inner" :type="type" :disabled="disabled" />
        <!--  suffix slot  -->
        <span v-if="$slots.suffix" class="vk-input__suffix">
          <slot name="append"></slot>
        </span>
      </div>

      <!--  append slot  -->
      <div v-if="$slots.append" class="vk-input__prepend">
        <slot name="append"></slot>
      </div>
    </template>

    <!--  textarea  -->
    <template v-else>
      <textarea class="vk-textarea__wrapper" :disabled="disabled" />
    </template>
  </div>
</template>

<style scoped></style>
