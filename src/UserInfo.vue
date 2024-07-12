<template>//用户信息展示页面
    <v-container>
      <v-btn icon @click="goToDisplayAll">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-row>
        <v-col>
          <h2>{{ nickname }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="goToUserComments">评论</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="goToUserPics">图片</v-btn>
        </v-col>
      </v-row>
      <v-btn fab dark bottom right @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nickname: '用户昵称' // 这里可以用实际数据替换
      };
    },
    methods: {
      goToUserComments() {
        this.$router.push('/usercomments');
      },
      goToUserPics() {
        this.$router.push('/userpics');
      },
      goToDisplayAll() {
        this.$router.push('/displayall');
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
  </style>
  