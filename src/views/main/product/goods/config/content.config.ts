export const contentTableConfig = {
  title: '商品列表',
  propList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100',
    },
    {
      prop: 'oldPrice',
      label: '旧价格',
      minWidth: '100',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '新价格',
      minWidth: '100',
      slotName: 'newPrice'
    },
    {
      prop: 'desc',
      label: '商品说明',
      minWidth: '150',
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '80',
      slotName: 'status'
    },
    {
      prop: 'imgUrl',
      label: '图片',
      minWidth: '150',
      slotName: 'imgUrl'
    },
    {
      prop: 'inventoryCount',
      label: '库存',
      minWidth: '100',
    },
    {
      prop: 'saleCount',
      label: '销售量',
      minWidth: '100',
    },
    {
      prop: 'favorCount',
      label: '喜欢数量',
      minWidth: '100',
    },
    {
      prop: 'address',
      label: '商品地址',
      minWidth: '100',
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '180',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: true

}