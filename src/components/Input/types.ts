export interface InputProps {
  type: string
  modelValue: string
  size?: 'small' | 'large'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  placeholder?: string
  readonly?: boolean
  autoComplete?: string
  autoFocus?: boolean
  form?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void // 值变化就会触发
  (e: 'change', value: string): void // 值变化并且失去焦点时触发
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}
