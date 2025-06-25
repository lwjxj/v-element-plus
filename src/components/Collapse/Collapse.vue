<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType } from './types'
import type { CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'VkCollapse',
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>([])

const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  },
)

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
