import axios from 'axios'

// axios的实例对象
// 1.模拟get请求
axios.get('http://123.207.32.32:8000/main/multidata').then((res) => {
  // console.log(res.data)
})

// 2.get请求,并且传入参数
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'lcn',
      age: 18
    }
  })
  .then((res) => {
    // console.log(res.data)
  })

// 3/post请求
axios
  .post('http://httpbin.org/post', {
    name: 'bob',
    age: 18
  })
  .then((res) => {
    // console.log(res.data)
  })

// 额外补充的Promise中类型的使用
// Promise本身是可以有类型
new Promise<string>((resolve, reject) => {
  resolve('abc')
}).then((res) => {
  // console.log(res.length)
})

// 4.axios配置选项
// 4.1 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2. 每一个请求单独的配置
axios
  .get('/get', {
    params: {
      name: 'bob'
    },
    timeout: 5000,
    headers: {}
  })
  .then((res) => {
    // console.log(res)
  })

// post请求
axios
  .post('/post', {
    name: 'mary',
    timeout: 3000,
    headers: {}
  })
  .then((res) => {
    // console.log(res)
  })

// 5.axios.all -> 多个请求, 一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'bob' } }),
    axios.post('/post', { name: 'mary' })
  ])
  .then((res) => {
    // console.log(res[0].data)
    // console.log(res[1].data)
  })

// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数

axios.interceptors.request.use(
  (config) => {
    console.log(config)
    // 想做的一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求拦截失败')
    return err
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (config) => {
    console.log('响应拦截成功')
    return config
  },
  (err) => {
    console.log('响应拦截失败')
    return err
  }
)
