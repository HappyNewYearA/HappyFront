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
          <v-card-title>用户注册</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="昵称"
                required
                :counter="20"
                maxlength="20"
                :error-messages="nameErrors"
              ></v-text-field>
              <v-text-field
                v-model="phone_num"
                label="手机号"
                required
                @keypress="onlyNumber"
                :rules="[rules.phone]"
                :counter="11"
                maxlength="11"
                :error-messages="phoneErrors"
              ></v-text-field>
              <v-text-field
                v-model="code"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
                :counter="20"
                maxlength="20"
                :error-messages="codeErrors"
              ></v-text-field>

              <div class="button-container">
                <v-btn @click="goToLogin" color="secondary" dark>返回登录</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="primary" dark>注册</v-btn>
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
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  data() {
    return {
      name: '',
      code: '',
      phone_num: '',
      showPassword: false,
      phoneErrors: [],
      nameErrors: [],
      codeErrors: [],
      rules: {
        phone: value => {
          const phoneRegex = /^[0-9]{11}$/;
          return phoneRegex.test(value) || '手机号必须是11位数字';
        }
      }
    };
  },
  methods: {
    async register() {
      this.clearErrors();

      if (!this.isFormValid()) {
        return;
      }

      const registerData = {
        name: this.name,
        code: this.code,
        phone_num: this.phone_num,
        logging_status: 1, // 设置登录状态为1
        if_manager: false // 默认管理员标识为 false
      };

      try {
        const response = await axios.post('/api/register', registerData);
        if (response.data.success) {
          // 重定向到 DisplayAll.vue 页面
          this.$router.push('/displayall');
        } else {
          // 处理注册失败的情况
          console.log('注册失败:', response.data.message);
        }
      } catch (error) {
        console.error('注册请求失败:', error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    handleImageClick() {
      // 处理点击校徽图片事件
    },
    onlyNumber(event) {
      // 限制输入只能为数字
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    clearErrors() {
      this.phoneErrors = [];
      this.nameErrors = [];
      this.codeErrors = [];
    },
    isFormValid() {
      let isValid = true;

      if (this.phone_num.trim() === '') {
        this.phoneErrors.push('手机号不能为空');
        isValid = false;
      }

      if (this.code.trim() === '') {
        this.codeErrors.push('密码不能为空');
        isValid = false;
      }

      if (this.name.trim() === '') {
        this.nameErrors.push('昵称不能为空');
        isValid = false;
      }

      return isValid;
    }
  },
  watch: {
    phone_num() {
      // 清除错误提示
      this.phoneErrors = [];
    },
    code() {
      // 清除错误提示
      this.codeErrors = [];
    },
    name() {
      // 清除错误提示
      this.nameErrors = [];
    }
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

