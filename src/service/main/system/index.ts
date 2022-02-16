import cnRequest from "../../index";

export function getPageListData(url: string, queryInfo: any) {
  return cnRequest.post<any>({
    url: url,
    data: queryInfo
  })
}

export function createPageData(url: string, addData: any) {
  return cnRequest.post<any>({
    url: url,
    data: addData
  })
}

export function editPageData(url: string, editData: any) {
  return cnRequest.patch<any>({
    url: url,
    data: editData
  })
}

export function deletePageData(url: string) {
  return cnRequest.delete<any>({
    url: url
  })
}