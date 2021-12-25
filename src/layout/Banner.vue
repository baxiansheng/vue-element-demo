<template>
  <div
    style="
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #7295b8;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    "
  >
    <router-link key="collapse" class="sidebar-logo-link" to="/">
      <img
        width="40px"
        height="40px"
        src="../assets/ouc.jpg"
        alt="ouc-ico"
        style="vertical-align: middle"
      />
      <h1 v-if="!isCollapse" class="sidebar-title">Demo Of OUC</h1>
    </router-link>
  </div>
</template>
<style>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-link {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.sidebar-title {
  display: inline-block;
  margin-left: 10px;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(200).fill(item),
    };
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 60 + "px";
    },
  },
  mounted() {},
  created() {},
};
</script>
