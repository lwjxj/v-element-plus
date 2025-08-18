import { defineComponent } from 'vue'

const RenderVNode = defineComponent({
  name: 'RenderVNode',
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVNode
