import type { VNode } from 'vue'
import type { TooltipProps } from '../Tooltip/types'

export interface MenuOption {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
  hideAfterClick?: boolean
}

export interface DropdownEmits {
  (e: 'select', value: MenuOption): void
  (e: 'visible-change', value: boolean): void
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}
