import cnRequest from "@/service";

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

function getCategoryGoodsCount() {
  return cnRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
function getCategoryGoodsSale() {
  return cnRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
function getCategoryGoodsFavor() {
  return cnRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
function getAddressGoodsSale() {
  return cnRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
}