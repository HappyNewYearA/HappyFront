<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-card>
          <!-- 添加校徽图片 -->
          <v-img
            src="@/assets/whusym.png"
            class="logo"
          ></v-img>
          <v-card-title>用户登录</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="phone"
                label="手机号"
                required
                :rules="[rules.phone]"
                :counter="11"
                maxlength="11"
                :error-messages="phoneErrors"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                :append-icon-cb="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
                :error-messages="passwordErrors"
              ></v-text-field>
              <v-btn @click="togglePasswordVisibility" color="white" text>
                {{ showPassword ? '隐藏密码' : '显示密码' }}
              </v-btn>
              <div class="button-container">
                <v-btn @click="login(0)" color="primary" dark>登录</v-btn>
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
    async login(userType) {
      this.clearErrors();

      if (!this.isFormValid()) {
        return;
      }

      const loginData = {
        phone_num: this.phone,
        code: this.password,
        logging_status: 1 // 设置登录状态为1
      };

      try {
        const response = await axios.post('/api/login', loginData);
        if (response.data.message === "usersuccess") {
          // 设置管理员标识
          localStorage.setItem('logging_status', 1);
          localStorage.setItem('if_manager', false);
          // 重定向到 DisplayAll.vue 页面
          this.$router.push('/displayall');
        } else if (response.data.message === "NotExist") {
          this.showSnackbar('该手机号未注册');
        } else if (response.data.message === "NoMatch") {
          this.showSnackbar('密码错误');
        } else {
          // 处理其他登录失败的情况
          this.showSnackbar('登录失败');
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        this.showSnackbar('登录请求失败');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    clearErrors() {
      this.phoneErrors = [];
      this.passwordErrors = [];
    },
    isFormValid() {
      let isValid = true;

      if (this.phone.trim() === '') {
        this.phoneErrors.push('手机号不能为空');
        isValid = false;
      }

      if (this.password.trim() === '') {
        this.passwordErrors.push('密码不能为空');
        isValid = false;
      }

      return isValid;
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

.v-input__append-inner {
  color: black !important; /* 设置眼睛图标为黑色 */
}
</style>

