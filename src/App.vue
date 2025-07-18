<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'

const openedValue = ref(['a'])

onMounted(() => {
  setTimeout(() => {
    openedValue.value = ['a', 'b']
  }, 2000)
})
</script>

<template>
  <h2>按钮</h2>
  <Button type="primary">按钮</Button>
  <Button type="success">按钮</Button>
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
    <Collapse v-model="openedValue">
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
</template>

<style scoped></style>
