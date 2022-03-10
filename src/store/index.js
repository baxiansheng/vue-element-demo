import Vue from "vue";
import Vuex from "vuex";
import { login } from "@/api/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: "",
      token: "",
      icon: "",
    },
    routers: [],
  },
  mutations: {
    setUserInfo(state, data) {
      const { username, token, icon } = data;
      state.userInfo.username = username;
      state.userInfo.token = token;
      state.userInfo.icon = icon;
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            // 根据响应，执行操作
            commit("setUserInfo", res);
            resolve(res.username);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
