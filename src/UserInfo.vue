<template>
  <v-container>
    <!-- 返回按钮, 放在左上角，并响应屏幕尺寸 -->
    <v-btn icon @click="goToWuMap" class="back-btn">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <!-- 用户信息卡片 -->
    <v-card class="mx-auto my-4 pa-4" max-width="400">
      <v-card-title class="d-flex align-center">
        <v-avatar size="56" class="me-4">
          <v-img src="https://via.placeholder.com/150" alt="User Avatar"></v-img>
        </v-avatar>
        <h2>{{ nickname }}</h2>
      </v-card-title>
    </v-card>

    <!-- 操作按钮 -->
    <v-card class="mx-auto my-4 pa-4" max-width="400">
      <v-card-actions class="d-flex flex-column">
        <v-btn color="primary" block class="my-btn my-2" @click="goToUserComments">
          我的评论
        </v-btn>
        <v-btn color="cyan" block class="my-btn my-2" @click="goToUserPics">
          我的图片
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- 底部悬浮按钮 -->
    <v-btn fab dark bottom right @click="logout" class="logout-btn">
      <v-icon>mdi-logout"></v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nickname: '用户昵称', // 这里可以用实际数据替换
    };
  },
  methods: {
    goToUserComments() {
      this.$router.push('/usercomments');
    },
    goToUserPics() {
      this.$router.push('/userpics');
    },
    goToWuMap() {
      this.$router.push('/WuMap');
    },
    logout() {
      // 这里添加删除后台登录时间戳的逻辑
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin: 10px;
}

.logout-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

/* 返回按钮样式 */
.back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
}

/* 按钮字体颜色为白色 */
.my-btn {
  min-width: 150px;
  min-height: 50px;
  color: white;
  transition: transform 0.3s ease;
}

/* 按钮悬浮效果 */
.my-btn:hover {
  transform: scale(1.05);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .back-btn {
    top: 8px;
    left: 8px;
  }

  .my-btn {
    min-width: 120px;
    min-height: 40px;
  }

  .logout-btn {
    bottom: 8px;
    right: 8px;
  }
}
</style>
