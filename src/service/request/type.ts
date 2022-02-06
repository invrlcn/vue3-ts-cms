import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ICNIntercepts<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface ICNRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ICNIntercepts<T>
  showLoading?: boolean
}

export { ICNIntercepts, ICNRequestConfig }
