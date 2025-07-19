import { describe, expect, test } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    /*const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a'],
      },
      slots: {
        default: h(CollapseItem, { name: 'a', title: 'Title A' }),
      },
      global: {
        stubs: ['Icon'],
      },
    })
    console.log(wrapper.html())*/

    const wrapper = mount(() => (
      <Collapse modelValue={['a']}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
    ))

    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__wrapper')
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    const disabledHeader = headers[2]
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    // expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
})
