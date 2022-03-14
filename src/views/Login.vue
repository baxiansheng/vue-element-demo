<template>
  <div>
    <div class="login-main">
      <el-card class="login-main-card">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入用户名/邮箱/手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.login-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.login-main-card {
  width: 500px;
}
.login-main-title {
  padding-bottom: 15px;
  font-size: 30px;
}
</style>
<script>
import { Message } from "element-ui";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm)
            .then((res) => {
              this.$router.push("/");
              this.$notify({
                title: "登录成功",
                message: "欢迎 " + res,
                type: "success",
                offset: 65,
              });
            })
            .catch((err) => {
              Message({
                message: err.message,
                type: "error",
                duration: 5 * 1000,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
