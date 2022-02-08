export const rules = {
  number: [
    {
      required: true,
      message: '手机号是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{0,11}$/,
      message: '手机号必须是11位数字~',
      trigger: 'blur'
    }
  ]
}