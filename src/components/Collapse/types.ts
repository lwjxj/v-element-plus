import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[]
  accordion?: boolean
}

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
