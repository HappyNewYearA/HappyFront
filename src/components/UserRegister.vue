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
                v-model="nickname"
                label="昵称"
                required
                :counter="20"
                maxlength="20"
              ></v-text-field>
              <v-text-field
                v-model="phonenum"
                label="手机号"
                required
                @keypress="onlyNumber"
                :rules="[rules.phone]"
                :counter="11"
                maxlength="11"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="togglePasswordVisibility"
                :type="showPassword ? 'text' : 'password'"
                label="密码"
                required
                :counter="20"
                maxlength="20"
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
export default {
  data() {
    return {
      nickname: '',
      password: '',
      phonenum: '',
      showPassword: false,
      rules: {
        phone: value => {
          const phoneRegex = /^[0-9]{11}$/;
          return phoneRegex.test(value) || '手机号必须是11位数字';
        }
      }
    };
  },
  methods: {
    register() {
      // 在这里处理注册逻辑
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
