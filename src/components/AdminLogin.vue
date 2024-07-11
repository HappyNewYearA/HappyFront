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
                  label="密码"
                  type="password"
                  required
                ></v-text-field>
                <div class="button-container">
                  <v-btn @click="login" color="primary" dark>登录</v-btn>
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
        password: ''
      }
    },
    methods: {
      login() {
        // 登录逻辑
      },
      goToUserLogin() {
        this.$router.push('/login');
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
  </style>
  