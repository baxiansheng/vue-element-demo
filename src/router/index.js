import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

import Container from "../layout/Container.vue";

const routes = [
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
      },
    ],
  },
  {
    path: "/card",
    component: Container,
    redirect: "/table/index",
    children: [
      {
        path: "index",
        component: function () {
          return import("../views/application/Card.vue");
        },
        name: "Card",
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
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
