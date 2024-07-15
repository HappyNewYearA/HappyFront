<template>
  <v-container class="admin-login-container">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>管理员登录</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="phone"
                label="手机号"
                required
                @keypress="onlyNumber"
                :rules="[rules.phone]"
                :counter="11"
                maxlength="11"
                :error-messages="phoneErrors"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
                :error-messages="passwordErrors"
              ></v-text-field>
              <v-btn @click="togglePasswordVisibility" color="white" text>
                {{ showPassword ? '隐藏密码' : '显示密码' }}
              </v-btn>
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
import axios from 'axios';
import { VSnackbar } from 'vuetify/lib';

export default {
  data() {
    return {
      phone: '',
      password: '',
      showPassword: false,
      phoneErrors: [],
      passwordErrors: [],
      snackbar: false,
      snackbarMessage: '',
      rules: {
        phone: value => {
          const phoneRegex = /^[0-9]{11}$/;
          return phoneRegex.test(value) || '手机号必须是11位数字';
        }
      }
    };
  },
  methods: {
    async login() {
      this.clearErrors();

      if (!this.isFormValid()) {
        return;
      }

      const loginData = {
        phone_num: this.phone,
        password: this.password,
        user_type: 1 // 管理员类型
      };

      try {
        const response = await axios.get('/api/admin-login', {
          params: {
            phone_num: this.phone,
            password: this.password
          }
        });
        if (response.data.message === "adminsuccess") {
          // 设置管理员标识
          localStorage.setItem('logging_status', 1);
          localStorage.setItem('if_manager', true);
          // 重定向到管理员主页
          this.$router.push('/adminmain');
        } else if (response.data.message === "NotExist") {
          this.showSnackbar('该手机号未注册');
        } else if (response.data.message === "NoMatch") {
          this.showSnackbar('密码错误');
        } else {
          this.showSnackbar('登录失败');
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        this.showSnackbar('登录请求失败');
      }
    },
    goToUserLogin() {
      this.$router.push('/login');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    onlyNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    },
    isFormValid() {
      let isValid = true;

      if (this.phone.trim() === '') {
        this.phoneErrors.push('手机号不能为空');
        isValid = false;
      } else if (!this.rules.phone(this.phone)) {
        this.phoneErrors.push('手机号必须是11位数字');
        isValid = false;
      }

      if (this.password.trim() === '') {
        this.passwordErrors.push('密码不能为空');
        isValid = false;
      }

      return isValid;
    },
    clearErrors() {
      this.phoneErrors = [];
      this.passwordErrors = [];
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    }
  },
  watch: {
    phone() {
      this.phoneErrors = [];
    },
    password() {
      this.passwordErrors = [];
    }
  },
  components: {
    VSnackbar
  }
};
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

