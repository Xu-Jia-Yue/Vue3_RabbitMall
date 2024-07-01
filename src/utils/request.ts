import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})
// axios请求拦截器
instance.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
)
// axios响应拦截器
instance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
)

export default instance
