<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.tsx'
import type { MenuOption } from '@/components/Dropdown/types.ts'

const openedValue = ref(['a'])
let setTimeoutId: ReturnType<typeof setTimeout>
const trigger = ref<'hover' | 'click'>('click')
const tooltipRef = ref<HTMLElement>()

const menuOptions: MenuOption[] = [
  {
    key: 'a',
    label: h('b', 'this is bold')
  },
  {
    key: 'b',
    label: 'b',
    divided: true
  },
  {
    key: 'c',
    label: 'c',
    disabled: true
  }
]

onMounted(() => {
  setTimeoutId = setTimeout(() => {
    openedValue.value = ['a']
    // trigger.value = 'hover'
  }, 2000)
})

onUnmounted(() => {
  clearTimeout(setTimeoutId)
})
</script>

<template>
  <h2>Button</h2>
  <Button type="primary" @click="tooltipRef?.show()">按钮</Button>
  <Button type="success" @click="tooltipRef?.hide()">按钮</Button>
  <Button type="warning">按钮</Button>
  <Button type="danger">按钮</Button>
  <Button type="info">按钮</Button>

  <Button type="primary" size="large">按钮</Button>
  <Button type="primary" size="small">按钮</Button>
  <Button type="primary" round>按钮</Button>
  <Button type="primary" circle>按钮</Button>
  <Button type="primary" plain>按钮</Button>
  <Button type="primary" disabled>按钮</Button>
  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button><br /><br />

  <div style="margin-top: 50px">
    <h2>Collapse</h2>
    <Collapse v-model="openedValue" accordion>
      <Item name="a" title="标题1">
        <div>这是标题1</div>
      </Item>
      <Item name="b" title="标题2">
        <div>这是标题2</div>
      </Item>
      <Item name="c" title="标题3" disabled>
        <div>这是标题3</div>
      </Item>
    </Collapse>

    <p style="margin-top: 20px">{{ openedValue }}</p>
  </div>

  <div style="margin-top: 50px">
    <h2>Tooltip</h2>
    <Tooltip
      ref="tooltipRef"
      content="hello world"
      :trigger="trigger"
      placement="right"
      :open-delay="100"
      :close-delay="100"
    >
      <Button type="primary" style="margin: 10px">按钮</Button>
    </Tooltip>
  </div>

  <div style="margin-top: 50px">
    <h2>Dropdown</h2>
    <Dropdown placement="bottom" :trigger="trigger" :menu-options="menuOptions">
      <button style="margin-bottom: 10px">Dropdown</button>
    </Dropdown>
  </div>
</template>

<style scoped></style>
