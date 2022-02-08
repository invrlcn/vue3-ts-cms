import CNRequest from '../index'

import { IAccount, ILoginResult, IDataType } from './types'

enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

function accountLoginRequest(account: IAccount) {
  return CNRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

function requestUserInfoById(id: number) {
  return CNRequest.get<IDataType>(
    {
      url: LoginApi.LoginUserInfo + id,
      showLoading: false
    }
  )
}

function requestUserMenusByRoleId(id: number) {
  return CNRequest.get<IDataType>(
    {
      url: LoginApi.UserMenus + id + '/menu',
      showLoading: false
    }
  )
}

export {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
}