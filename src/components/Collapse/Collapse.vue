<script setup lang="ts">
import { ref, provide } from 'vue'
import type { NameType } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'VkCollapse',
})

const activeNames = ref<NameType[]>([])

const handleItemClick = (name: NameType) => {
  const index = activeNames.value.indexOf(name)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(name)
  }
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="vk-collapse">
    <slot />
  </div>
</template>

<style scoped></style>
