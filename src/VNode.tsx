import { h, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const count = ref(0)
    return () => {
      // return h('h1', 'count:': count.value + props.msg)
      return <h1>{'count: ' + count.value + props.msg}</h1>
    }
  },
})
