// 项目钟我们大多数时候都会把对应的接口请求封装成api来调用
import service from '../service.js'

// 登录接口
export function login (data) {
   return service({
      method: 'post',
      url: '/login',
      data
   })
}