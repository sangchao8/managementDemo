//封装axios
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
/*import router from '../router';*/
/*import store from '../store/index';*/

/*let vueobj = new Vue()*/
Vue.use(VueAxios)
Vue.prototype.$axios=axios
/*const toSignin = function (msg) {
    store.dispatch("clearUserInfo");

    var message = msg ? msg : "登录过期，即将前往登录页面";
    vueobj.$message.error({showClose: true, message: message, duration: 3000, onClose: function () {
            router.replace({path: '/', query: {redirect: router.currentRoute.fullPath}
            });
        }});
}*/

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
/*const errorHandle = (status, other) => {
  // 状态码判断
  if(status!=200){
    switch (status) {
      case 400:
        vueobj.$message.error({showClose: true, message: "请求参数有误！", duration: 3000});
        break;
      // 401: 未登录状态，跳转登录页
      case 401:
        //vueobj.$message.error({showClose: true, message: "session过期，即将前往登录页面！", duration: 3000});
        toSignin();
        break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
        vueobj.$message.error({showClose: true, message: "没有操作权限！", duration: 3000});
        break;
      // 404请求不存在
      case 404:
        vueobj.$message.error({showClose: true, message: "请求不存在", duration: 3000});
        break;
      // case 500:
      //   vueobj.$message.error({showClose: true, message: "请求失败，服务器内部错误", duration: 3000});
      //   break;
      case 504:
        vueobj.$message.error({showClose: true, message: "与服务器连接失败！", duration: 3000});
        break;
      case 200:
      default:
        console.log(other);
    }}
  }*/
// 创建axios实例
var instance = axios.create({ timeout: 5000 * 360})

// 响应拦截器
/*instance.interceptors.request.use(
  config => {
        if (sessionStorage.getItem('token')) { //判断token是否存在
      config.headers.accessToken = sessionStorage.getItem('token') //将token设置成请求头
    }else{
          router.replace({
            path: '/' // 到登录页重新获取token
          })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    errorHandle(response.data.code,"信息错误")
    return response
  },
  error => {
    return Promise.reject(error)
  }
)*/



export default instance
