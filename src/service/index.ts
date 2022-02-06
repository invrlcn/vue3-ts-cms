// service统一出口
import CNRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
const cnRequest = new CNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        let resolve = config?.headers?.Authorization
        resolve = `Bearer ${token}`
      }
      console.log('拦截请求成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('拦截请求失败')
      return err
    },
    responseInterceptor: (res) => {
      console.log('拦截响应成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('拦截响应失败')
      return err
    }
  }
})

export default cnRequest
