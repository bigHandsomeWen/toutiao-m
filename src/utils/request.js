import axios from 'axios'
import store from '@/store'
// 加载解决大数字问题的包
import jsonBig from 'json-bigint'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',

  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { tokenKey } = store.state
  // 添加请求头
  if (tokenKey && tokenKey.token) {
    config.headers.Authorization = `Bearer ${tokenKey.token}`
  }
  return config
}, err => Promise.reject(err))

// 在响应拦截器中解决 token 过期问题
request.interceptors.response.use(response => {
  return response
}, async error => {
  // 判断状态码是否为404
  if (error.response && error.response.status === 404) {
    const token = store.state.tokenKey
    // 判断全局 token 中是否有 refresh_token
    if (!token && !token.refresh_token) {
      // 没有 refresh_token 跳转到登录页面
      router.push('/login')
      return
    }
    // 有 refresh_token
    try {
      // 调接口
      const { data: res } = await axios({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${token.refresh_token}`
        }
      })
      // 请求成功 将返回的 token 值更新到全局变量容器中
      store.commit('setTokenKey', {
        token: res.data.token,
        refresh_token: token.refresh_token
      })
      // 把之前失败的用户请求继续发出去
      // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
      // return 把 request 的请求结果继续返回给发请求的具体位置
      return request(error.config)
    } catch (err) {
      // 跳转到登录页面
      router.push('/login')
    }
  }
  return Promise.reject(error)
})

export default request
