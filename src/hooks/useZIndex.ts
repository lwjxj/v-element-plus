import { ref, computed } from 'vue'

const zIndex = ref(0)
const useZIndex = (initValue = 2000) => {
  const initZIndex = ref(initValue)
  const currentZIndex = computed(() => zIndex.value + initZIndex.value)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initZIndex,
    currentZIndex,
    nextZIndex
  }
}

export default useZIndex
