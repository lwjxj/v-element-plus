<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { InputProps, InputEmits } from './types.ts'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VKInput'
})

const props = withDefaults(defineProps<InputProps>(), { type: 'text' })
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

const handleChange = () => {
  emits('change', innerValue.value)
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)

const isFocus = ref(false)

const showClear = computed(
  () => innerValue.value && props.clearable && !props.disabled && isFocus.value
)

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
}

const handleClear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('input', '')
  emits('change', '')
}

const showPasswordArea = computed(() => innerValue.value && props.showPassword && !props.disabled)
const passwordVisible = ref(false)

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
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
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>

      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>

        <input
          class="vk-input__inner"
          v-model="innerValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          ref="inputRef"
          :disabled="disabled"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPassword" class="vk-input__suffix">
          <slot name="suffix" />
          <Icon v-if="showClear" icon="circle-xmark" class="vk-input__clear" @click="handleClear" />
          <Icon
            v-if="showPasswordArea && passwordVisible"
            icon="eye"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            v-if="showPasswordArea && !passwordVisible"
            icon="eye-slash"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        v-model="innerValue"
        class="vk-textarea__wrapper"
        ref="inputRef"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<style scoped></style>
