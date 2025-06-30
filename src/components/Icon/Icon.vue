<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'VKIcon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="props" />
  </i>
</template>

<style scoped></style>
