import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ICNIntercepts, ICNRequestConfig } from './type'
import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/loading/src/loading.type'

const DEFAULT_LOADING = true

class CNRequest {
  instance: AxiosInstance
  interceptors?: ICNIntercepts
  showLoading: boolean
  loading?: any

  constructor(config: ICNRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器: 响应成功拦截')
        // 将loading移除
        this.loading?.close()

        const data = res.data
        switch (data.returnCode) {
          case '200':
            console.log('请求成功', data)
            break;
          case '-1001':
            console.log('请求失败~, 错误信息')
            break;
          default: data
        }
        return data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')
        this.loading?.close()
        switch (err.returnCode) {
          case '403':
            console.log('拒绝访问', err)
            break;
          case '404':
            console.log('请求路径错误，请重新输入~')
            break;
          case '500':
            console.log('服务器错误')
            break;
          case '503':
            console.log('服务器繁忙，请稍后再试~')
            break;
          default: err
        }
        return err
      }
    )
  }
  // request(config: ICNRequestConfig) {
  //   this.instance.request(config).then((res) => {
  //     // 单个请求数据处理
  //     if (config.interceptors?.requestInterceptor) {
  //       config = config.interceptors.requestInterceptor(config)
  //     }
  //     // 2.判断是否需要显示loading

  //     this.instance.request(config).then((res) => {
  //       if (config.interceptors?.responseInterceptor) {
  //         res = config.interceptors.responseInterceptor(res)
  //       }
  //     })
  //   })
  // }
  request<T>(config: ICNRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求数据处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        // 2.将showLoading设置true, 这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
        // 3.将结果resolve返回出去
        resolve(res)
      }).catch((err) => {
        // 将showLoading设置true, 这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
        reject(err)
        return err
      })
    })
  }

  get<T>(config: ICNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: ICNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: ICNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ICNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default CNRequest
