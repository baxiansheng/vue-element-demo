import Vue from "vue";
import Vuex from "vuex";
import { login, logout } from "@/api/auth.js";
import tagsView from "./tagsView";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: "",
      token: "",
      icon: "",
    },
    routers: [],
    // tagsView: {
    //   visitedViews: [{ name: "加密系统" }, { name: "解密系统" }],
    //   cachedViews: [],
    // },
  },
  mutations: {
    setUserInfo(state, data) {
      const { username, token, icon } = data;
      state.userInfo.username = username;
      state.userInfo.token = token;
      state.userInfo.icon = icon;
    },
    clearUserInfo(state) {
      state.userInfo.username = "";
      state.userInfo.token = "";
      state.userInfo.icon = "";
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
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            commit("clearUserInfo");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {
    tagsView,
  },
});
