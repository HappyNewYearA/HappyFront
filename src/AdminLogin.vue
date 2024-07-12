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
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                :append-icon-cb="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
                :counter="20"
                maxlength="20"
                :error-messages="passwordErrors"
              ></v-text-field>
              <v-btn @click="togglePasswordVisibility" color="white" text>
                {{ showPassword ? '隐藏密码' : '显示密码' }}
              </v-btn>
              <div class="button-container">
                <v-btn @click="register" color="primary" dark>注册</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="goToLogin" color="secondary" dark>返回登录</v-btn>
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

export default {
  data() {
    return {
      phone_num: '',
      code: '',
      showPassword: false,
      clickCount: 0,
      phoneErrors: [],
      passwordErrors: [],
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
      
      const registrationData = {
        phone_num: this.phone_num,
        code: this.code
      };

      try {
        const response = await axios.post('/api/register', registrationData);
        if (response.data.success) {
          if (response.data.message === 'adminsuccess') {
            // 设置登录状态和管理员标识
            localStorage.setItem('logging_status', 1);
            localStorage.setItem('if_manager', false);
            // 重定向到 adminmain.vue 页面
            this.$router.push('/adminmain');
          } else {
            // 处理注册成功但不是管理员的情况
            localStorage.setItem('logging_status', 1);
            localStorage.setItem('if_manager', false);
            this.$router.push('/displayall');
          }
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
      this.clickCount++;
      if (this.clickCount === 12) {
        this.$router.push('/admin-login');
        this.clickCount = 0; // 重置点击计数
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    onlyNumber(event) {
      // 限制输入只能为数字
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    },
    isFormValid() {
      let isValid = true;

      if (!this.rules.phone(this.phone_num)) {
        this.phoneErrors.push('手机号必须是11位数字');
        isValid = false;
      }

      if (this.code.trim() === '') {
        this.passwordErrors.push('密码不能为空');
        isValid = false;
      }

      return isValid;
    },
    clearErrors() {
      this.phoneErrors = [];
      this.passwordErrors = [];
    }
  },
  watch: {
    clickCount(newCount) {
      if (newCount > 12) {
        this.clickCount = 0; // 重置点击计数
      }
    },
    phone_num() {
      this.phoneErrors = [];
    },
    code() {
      this.passwordErrors = [];
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
