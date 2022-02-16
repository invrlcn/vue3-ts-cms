import { ref } from 'vue'
import type PageModal from '@/components/page-modal'

type CallbackFn = () => void

export function usePageModal(addCb?: CallbackFn, editCb?: CallbackFn) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  // 新增
  const handleAddData = (title: string) => {
    defaultInfo.value = {}
    modalRef.value!.dialogVisible = true
    if (modalRef.value) {
      modalRef.value.title = title
    }
    addCb && addCb()
  }

  // 编辑
  const handleEditData = (item: any, title: string) => {
    defaultInfo.value = { ...item }
    modalRef.value!.dialogVisible = true
    if (modalRef.value) {
      modalRef.value.title = title
    }
    editCb && editCb()
  }
  return [modalRef, defaultInfo, handleAddData, handleEditData]
}