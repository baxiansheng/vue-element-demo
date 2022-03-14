<template>
  <el-container style="height: 100vh">
    <div><Menu :isCollapse="isCollapse" /></div>

    <el-container style="width: 100%">
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
        <div class="username-container">
          <el-dropdown>
            <div class="container-username">
              <el-avatar
                v-if="this.userIcon == ''"
                icon="el-icon-user-solid"
              ></el-avatar>
              <el-avatar v-else :src="this.userIcon"></el-avatar>
              <span style="margin-left: 5px">{{ this.username }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="goSetting">个人设置</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="handleLogout"
                  >退出登录</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <TagsView2 />
      <el-main :style="{ height: scrollerHeight }">
        <keep-alive :include="this.cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.username-container {
  width: 100px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-username {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.icon {
  cursor: pointer;
  font-size: 28px;
}
.el-header {
  background-color: #fff;
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
import TagsView2 from "./TagsView2.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Menu,
    TagsView2,
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
    username: function () {
      return this.$store.state.userInfo.username;
    },
    userIcon: function () {
      return this.$store.state.userInfo.icon;
    },
    cachedViews: function () {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
  mounted() {},
  created() {},
  methods: {
    ...mapActions(["logout"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    goSetting() {
      console.log("setting");
    },
  },
};
</script>
