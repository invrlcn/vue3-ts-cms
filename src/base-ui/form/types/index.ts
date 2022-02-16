type FormType = 'input' | 'password' | 'select' | 'datepicker'

interface IFormItem {
  filed: string,
  type: FormType,
  label: string,
  rules?: any[],
  placeholder?: any,
  // 针对select
  options?: any[],
  // 针对特殊的属性
  otherOptions?: any,
  // 密码框是否隐藏
  isHidden?: boolean
}
interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}

export { IFormItem, IForm }