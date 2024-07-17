<template>
  <div class="admin-main">
    <button @click="goToAllComments">全部评论</button>
    <button @click="goToAllPics">全部图片</button>
    <button @click="logout">登出</button>
  </div>
</template>

<script>
export default {
  name: 'AdminMain',
  methods: {
    goToAllComments() {
      this.$router.push('/allcomments');
    },
    goToAllPics() {
      this.$router.push('/allpics');
    },
    logout() {
      // 假设手机号存储在本地存储中
      const phoneNumber = localStorage.getItem('phoneNumber');
      if (phoneNumber) {
        // 发送手机号字符串到后台进行登出操作
        fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber })
        }).then(response => {
          if (response.ok) {
            // 登出成功后，可以清除本地存储并跳转到登录页面
            localStorage.removeItem('phoneNumber');
            this.$router.push('/login');
          } else {
            console.error('登出失败');
          }
        }).catch(error => {
          console.error('请求错误:', error);
        });
      }
    }
  }
}
</script>

<style scoped>
.admin-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
