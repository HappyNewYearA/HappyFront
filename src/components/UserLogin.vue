<template>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6">
          <v-card>
            <!-- 添加校徽图片 -->
            <v-img
              src="@/assets/whusym.png"
              class="logo"
              @click="handleImageClick"
            ></v-img>
            <v-card-title>用户登录</v-card-title>
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
                <div class="button-container">
                  <v-btn @click="login" color="primary" dark>登录</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="goToRegister" color="secondary" dark>注册</v-btn>
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
        clickCount: 0
      }
    },
    methods: {
      login() {
        // 登录逻辑
      },
      goToRegister() {
        this.$router.push('/register');
      },
      handleImageClick() {
        this.clickCount++;
        if (this.clickCount === 12) {
          this.$router.push('/admin-login');
        }
      }
    },
    watch: {
      clickCount(newCount) {
        if (newCount > 12) {
          this.clickCount = 1; // 重置点击计数
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .logo {
    display: block;
    margin: 0 auto;
    max-width: 200px; /* 根据需要调整图片大小 */
    width: 100%;
    height: auto;
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
  