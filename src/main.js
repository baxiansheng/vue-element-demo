import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./style/index.css";
import axios from "axios";
import * as echarts from "echarts";

Vue.config.productionTip = false;

Vue.prototype.axios = axios;

Vue.prototype.echarts = echarts;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
