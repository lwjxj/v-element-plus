import { defineComponent, ref, computed, Fragment } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types.ts'
import type { TooltipInstance } from '../Tooltip/types'
import Tooltip from '../Tooltip/Tooltip.vue'

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
    popperOptions: {
      type: Object as PropType<Options>
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      default: () => []
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { emit, slots, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)

    const visibleChange = (visible: boolean) => {
      emit('visible-change', visible)
    }

    const itemClick = (e: MenuOption) => {
      if (e.disabled) return
      emit('select', e)
      if (props.hideAfterClick) tooltipRef.value?.hide()
    }

    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment>
            {item.divided ? <li role="separator" class="divider-placeholder" /> : ''}
            <li
              class={{
                'vk-dropdown__item:': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })

    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })
    return () => (
      <div class="vk-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popper-options={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          on-visible-change={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="vk-dropdown__menu">{options.value}</ul>
          }}
        </Tooltip>
      </div>
    )
  }
})
