<template>
  <el-menu
    ref="menu"
    router
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#b3c0d1"
    text-color="#000"
    active-text-color="#409EFF"
    style="height: 100%; border: 0"
  >
    <Banner :isCollapse="isCollapse" />

    <el-menu-item index="/">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="application">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">应用</span>
      </template>
      <el-menu-item index="table">表格</el-menu-item>
      <el-menu-item index="form">表单</el-menu-item>
      <el-menu-item index="card">卡片</el-menu-item>
      <el-menu-item index="carousel">滚动</el-menu-item>
      <el-menu-item index="request">请求</el-menu-item>
    </el-submenu>
    <el-menu-item index="document">
      <i class="el-icon-document"></i>
      <span slot="title">文档</span>
    </el-menu-item>
    <el-menu-item index="setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
</style>

<script>
import Banner from "./Banner.vue";

export default {
  components: {
    Banner,
  },
  props: {
    isCollapse: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {},
};
</script>
