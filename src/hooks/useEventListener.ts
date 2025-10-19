import { onMounted, onUnmounted, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'

const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) => {
  if (isRef(target)) {
    watch(target, (newVal, oldVal) => {
      oldVal?.removeEventListener(event, handler)
      newVal?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener
