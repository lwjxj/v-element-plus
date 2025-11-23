import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态class,查看classes是否正确
    // 针对v-if是否渲染正确的标签和内容
    // 针对slot是否渲染正确的slot内容
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('vk-input--small')
    expect(wrapper.classes()).toContain('vk-input--text')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')
    // v-if
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    })

    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')

    // 更新值
    // 注意：setValue是组合事件，会触发input以及change事件
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')
    console.log('the events:', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])

    // v-model的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(wrapper.props('modelValue')).toBe('prop update')
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        clearable: true
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 一开始初始化时不应该显示icon图标
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    // 获取焦点后显示icon图标
    expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
    // 点击图标后值为空并且图标消失
    // 注意：这里不仅会触发clear事件，还会触发input和change事件
    await wrapper.find('.vk-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    // 点击清空值不仅会触发clear事件，还会触发input和change事件
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('显示密码样式', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '',
        showPassword: true
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 一开始输入框没值的时候不显示密码图标
    expect(wrapper.find('.vk-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    // 出现密码图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.vk-input__password')
    console.log(wrapper.html())
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击会切换成text类型，并且图标会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.vk-input__password').attributes('icon')).toBe('eye')
  })
})
