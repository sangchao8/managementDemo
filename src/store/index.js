import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"//刷新页面state数据消失

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      Value: '我是store里面的值'
  },
  getters: {
    getValue: function (state) {
      return state.Value;  //返回目前的城市名称
    }
  },
  mutations: {
    //显式的更改state里的数据
    setValue: function (state, name) {
      state.Value = name; //设置新的值
    }
  },
  actions: {
    //使用解构赋值，参数列表{commit,state}
    setValueName({commit,state},name){
      //commit 调用mutations的方法
      commit('setValue',name) //用于提交mutations方法，传递城市名称
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
