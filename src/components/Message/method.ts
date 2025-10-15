import { render, h } from 'vue'
import type { MessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'

let seed = 1
const instances: MessageContext[] = []
export const createMessage = (props: MessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    const index = instances.findIndex((item) => item.id === id)
    if (index === -1) return
    instances.splice(index, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    id,
    onDestroy: destroy
  }
  const vNode = h(MessageConstructor, newProps)
  console.log('vNode:', vNode)
  render(vNode, container)
  document.body.appendChild(container.firstElementChild!)
  const vm = vNode.component!
  const instance = {
    id,
    vnode: vNode,
    vm,
    props: newProps
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => instances.at(-1)

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((item) => item.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
