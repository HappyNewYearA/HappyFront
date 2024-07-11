<template>
  <v-container class="admin-login-container">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>管理员登录</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="用户名"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
              ></v-text-field>
              <v-btn @click="togglePasswordVisibility" color="white" text>
                {{ showPassword ? '隐藏密码' : '显示密码' }}
              </v-btn>
              <div class="button-container">
                <v-btn @click="login(1)" color="primary" dark>登录</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="goToUserLogin" color="secondary" dark>返回用户登录</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    login(userType) {
      // 发送用户类型
      this.$emit('usertype', userType);
      // 在实际应用中，可以在这里处理登录逻辑
      console.log('User type:', userType);
    },
    goToUserLogin() {
      this.$router.push('/login');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style scoped>
.admin-login-container {
  background-color: #f5f5f5; /* 设置背景为灰色 */
  min-height: 100vh; /* 使背景颜色覆盖整个页面 */
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 根据需要调整按钮与输入框之间的间距 */
}

v-spacer {
  width: 20px; /* 调整按钮之间的间距 */
}

.v-input__append-inner {
  color: black !important; /* 设置眼睛图标为黑色 */
}
</style>
