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
export default {
  data() {
    return {
      phone: '',
      password: '',
      showPassword: false,
      clickCount: 0,
      phoneErrors: [],
      rules: {
        phone: value => {
          const phoneRegex = /^[0-9]{11}$/;
          return phoneRegex.test(value) || '手机号必须是11位数字';
        }
      }
    };
  },
  methods: {
    login(userType) {
      // 验证手机号输入不为空
      if (this.phone.trim() === '') {
        this.phoneErrors = ['手机号不能为空'];
        return;
      }

      // 发送用户类型
      this.$emit('usertype', userType);
      // 在实际应用中，可以在这里处理登录逻辑
      console.log('User type:', userType);
    },
    goToRegister() {
      this.$router.push('/register');
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
    }
  },
  watch: {
    clickCount(newCount) {
      if (newCount > 12) {
        this.clickCount = 0; // 重置点击计数
      }
    },
    phone() {
      // 清除错误提示
      this.phoneErrors = [];
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
