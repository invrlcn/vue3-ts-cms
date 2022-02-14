import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'

// import cnRequest from './service'
// import './service/axios_demo'

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// element-plus全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)
setupStore()
app.use(router)
app.use(store)

// app.use(ElementPlus)
app.mount('#app')

// cnRequest.request({
//   url: '/main/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独的请求拦截成功')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独的响应拦截成功')
//       return res
//     }
//   }
// })

// interface IDataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// 返回new Promise
// cnRequest.get<IDataType>({
//   url: '/main/multidata',
//   showLoading: true
// }).then(res => {
//   console.log(res.data)
// }).catch(err => {
//   console.log(err.returnCode)
// })

