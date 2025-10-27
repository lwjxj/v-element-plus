import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMessage } from './method.ts'

export const rAF = async () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        resolve(null)
        await nextTick()
      })
    })
  })
}

describe('createMessage', () => {
  test('调用方法应该创建对应的Message组件', async () => {
    const instance = createMessage({ message: 'hello world', duration: 0 })
    await rAF()
    console.log('html:', document.body.innerHTML)
    expect(document.querySelector('.vk-message')).toBeTruthy()
    instance.destroy()
    await rAF()
    console.log('html2:', document.body.innerHTML)
    expect(document.querySelector('.vk-message')).toBeFalsy()
  })

  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello word', duration: 0 })
    createMessage({ message: 'hello word2', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.vk-message')
    expect(elements.length).toBe(2)
  })

  test('创建多个实例应该设置正确的offset', async () => {})
})
