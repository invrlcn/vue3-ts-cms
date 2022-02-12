import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState,
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule