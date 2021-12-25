<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="school" label="学校" width="200"> </el-table-column>
    <el-table-column label="个人信息">
      <el-table-column prop="id" label="ID" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table-column>
  </el-table>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import { getUsers } from "@/api/user.js";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    getUsers().then((data) => {
      this.tableData = data;
    });
  },
};
</script>
