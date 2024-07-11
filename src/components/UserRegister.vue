<template>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>用户注册</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="phone"
                  label="手机号"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="密码"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="nickname"
                  label="昵称"
                  required
                ></v-text-field>
                <div class="button-container">
                  <v-btn @click="register" color="primary" dark>注册</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="goToLogin" color="secondary" dark>登录</v-btn>
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
        phone: '',
        password: '',
        nickname: ''
      }
    },
    methods: {
      register() {
        // 注册逻辑
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  /* 如果需要，可以在这里添加样式 */
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
  