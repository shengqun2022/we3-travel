import { message } from 'antd'
import axios from 'axios'
import modal from 'antd/es/modal'
import { BASE_URL} from '../config/constant'
// 全局配置message 只能有一个错误error
message.config({
  maxCount: 1
})

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    async (config)=> {
      const promise = new Promise((resolve) => {
        config.headers['token'] = localStorage.getItem('token')
        resolve(config)
      })
      return promise
    },
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data 
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code
      // 如果没有 Code, 代表这不是项目后端开发的 API
      if (code === undefined) {
        return apiData
        // return Promise.reject(new Error("非本系统的接口"))
      } else {
        switch (code) {
        case 100:
          message.error(apiData.description)
          return Promise.reject(new Error(apiData.description))
        case 200:
          // code === 200 代表没有错误
          return apiData
        case 201:
          // code === 201 代表没有错误
          return apiData
        default:
          // 不是正确的 Code
          // alert(apiData.msg || 'Error')
          return Promise.reject(new Error('Error'))
        }
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      console.log(error,'error')
      const status = error.response.status
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          /* token 过期提示 */
          modal.error({
            title: '登录过期',
            content: '您的登录已过期，您可以关掉当前页面，从主应用重新登录',
            footer:null,
          });
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          message.error(error.response?.data?.description || error.response?.data?.error )
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          return Promise.reject(error.response)
      }
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service) {
  return function (config) {
    console.log(config,'config')
    const configDefault = {
      baseURL: BASE_URL,
      data: config.data,
      method: config.type || 'post'
    }
    return service(Object.assign(configDefault,config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
