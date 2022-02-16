import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      filed: 'url',
      type: 'input',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      filed: 'type',
      type: 'select',
      label: '菜单类型',
      placeholder: '请选择菜单类型',
      options: [
        { title: '一级菜单', value: 1 },
        { title: '二级菜单', value: 2 }
      ]
    },
    {
      filed: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  }
}