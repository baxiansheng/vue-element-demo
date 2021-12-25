<template>
  <el-container style="height: 100vh">
    <div><Menu :isCollapse="isCollapse" /></div>

    <el-container>
      <el-header
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 5px;
        "
      >
        <i
          :class="isCollapse ? 'el-icon-s-unfold icon' : 'el-icon-s-fold icon'"
          v-on:click="isCollapse = !isCollapse"
        ></i>
        <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </div>
      </el-header>

      <el-main :style="{ height: scrollerHeight }">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.icon {
  cursor: pointer;
  font-size: 28px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
</style>

<script>
import Menu from "./Menu.vue";

export default {
  components: {
    Menu,
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(200).fill(item),
      isCollapse: false,
      asideFlag: true,
    };
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 60 + "px";
    },
  },
  mounted() {},
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
