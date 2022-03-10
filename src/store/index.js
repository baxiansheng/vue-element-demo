import Vue from 'vue'
import Vuex from 'vuex'
import { login } from "@/api/auth.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      token: '',
      icon: '',
    },
    routers: []
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    login ({ commit }, data) {
      login(data).then((res)=>{
        // 根据响应，执行操作
        commit('setUserInfo', res.data)
      })
    }
  },
  modules: {
  }
})
