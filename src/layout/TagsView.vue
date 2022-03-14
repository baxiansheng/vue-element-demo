<template>
  <div class="tags-view">
    <el-tag
      class="tags-view-tag"
      :key="tag.name"
      v-for="tag in visitedViews"
      closable
      size="medium"
      effect="plain"
      type="info"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<style>
.tags-view {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
}
.tags-view-tag {
  margin-left: 5px;
  color: wheat;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    visitedViews: function () {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    $route() {
      this.addTags();
    },
  },
  mounted() {},
  created() {},
  methods: {
    handleClose: (tag) => {
      console.log(tag);
    },
    addTags() {
      const { name } = this.$route;
      console.log(name);
      // if (name) {
      //   this.$store.dispatch("tagsView/addView", this.$route);
      // }
      return false;
    },
  },
};
</script>
