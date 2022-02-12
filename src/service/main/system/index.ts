import cnRequest from "../../index";

export function getPageListData(url: string, queryInfo: any) {
  return cnRequest.post<any>({
    url: url,
    data: queryInfo
  })
}