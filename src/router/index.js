import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

import Container from "../layout/Container.vue";

const routes = [
  {
    path: "/redirect",
    component: Container,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Container,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: Home,
        name: "Home",
        meta: { title: "主页", affix: true },
      },
    ],
  },
  {
    path: "/about",
    component: Container,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/About.vue");
        },
        name: "About",
        meta: { title: "关于" },
      },
    ],
  },
  {
    path: "/setting",
    component: Container,
    redirect: "/setting/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/Setting.vue");
        },
        name: "Setting",
        meta: { title: "设置" },
      },
    ],
  },
  {
    path: "/document",
    component: Container,
    redirect: "/document/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/Document.vue");
        },
        name: "Document",
        meta: { title: "文档" },
      },
    ],
  },
  {
    path: "/carousel",
    component: Container,
    redirect: "/carousel/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Carousel.vue");
        },
        name: "Carousel",
        meta: { title: "滚动" },
      },
    ],
  },
  {
    path: "/table",
    component: Container,
    redirect: "/table/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Table.vue");
        },
        name: "Table",
        meta: { title: "表格" },
      },
    ],
  },
  {
    path: "/form",
    component: Container,
    redirect: "/form/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Form.vue");
        },
        name: "Form",
        meta: { title: "表单" },
      },
    ],
  },
  {
    path: "/card",
    component: Container,
    redirect: "/card/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Card.vue");
        },
        name: "Card",
        meta: { title: "卡片" },
      },
    ],
  },
  {
    path: "/request",
    component: Container,
    redirect: "/request/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Request.vue");
        },
        name: "Request",
        meta: { title: "请求" },
      },
    ],
  },
  {
    path: "/detect",
    component: Container,
    redirect: "/detect/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Detect.vue");
        },
        name: "Detect",
        meta: { title: "检测" },
      },
    ],
  },
  {
    path: "/series",
    component: Container,
    redirect: "/series/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Series.vue");
        },
        name: "Series",
        meta: { title: "时序" },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  }
  const { token } = store.state.userInfo;
  if (to.path !== "/login" && token === "") {
    next(`/login`);
  } else {
    next();
  }
});

export default router;
