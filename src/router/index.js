import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: function () {
      return import("../views/Setting.vue");
    },
  },
  {
    path: "/document",
    name: "Document",
    component: function () {
      return import("../views/Document.vue");
    },
  },
  {
    path: "/carousel",
    name: "Carousel",
    component: function () {
      return import("../views/application/Carousel.vue");
    },
  },
  {
    path: "/table",
    name: "Table",
    component: function () {
      return import("../views/application/Table.vue");
    },
  },
  {
    path: "/form",
    name: "Form",
    component: function () {
      return import("../views/application/Form.vue");
    },
  },
  {
    path: "/card",
    name: "Card",
    component: function () {
      return import("../views/application/Card.vue");
    },
  },
  {
    path: "/request",
    name: "Request",
    component: function () {
      return import("../views/application/Request.vue");
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
