/*
登录注册模块
*/
import axios from '@/request/http'
import querystring from 'querystring'

const loginApi = {
  // 登录
  login (params) {
    return axios.post('/smstips/login', querystring.stringify(params))
  },
}

export default loginApi
