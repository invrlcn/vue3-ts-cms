import type { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //require.context webpack方法: 查找文件 1. 路径 2.是否递归查找 3.正则匹配
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach(key => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        // 如果有children继续递归查询
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const firstMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (firstMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: firstMenu.name })
        return firstMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }