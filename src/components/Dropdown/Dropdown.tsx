import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types.ts'

export default defineComponent({
  name: 'VKDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    closeAfterClick: {
      type: Boolean,
      default: true
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      default: () => []
    },
    popperOptions: {
      type: Object as PropType<Options>
    }
  }
})
