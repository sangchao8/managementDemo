import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/utils/global'//全局
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import api from './request/api/index'
import store from './store'
import router from './router'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

// 将各模块api挂载在vue实例上
Vue.prototype.$api = api
Vue.prototype.$axios=axios
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
