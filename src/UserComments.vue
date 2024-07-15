<template>
  <v-container>
    <h2>评论</h2>
    <v-row>
      <v-col v-for="comment in comments" :key="comment.commentid" cols="12" sm="6" md="4">
        <CommentCard :comment="comment" @deleted="removeComment"></CommentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentCard from './components/CommentCard.vue';
import axios from 'axios';  // 使用 axios 库来从后端获取数据

export default {
  components: {
    CommentCard
  },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get('/api/comments');  // 修改为实际后端接口
        this.comments = response.data.map((comment, index) => ({
          commentid: index + 1,  // 假设comment_result没有commentid，需要生成一个唯一标识符
          text: comment.Content,
          scene: comment.Scene_name,
          user: comment.User_name,
          time: comment.Create_time
        }));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    },
    removeComment(commentid) {
      this.comments = this.comments.filter(comment => comment.commentid !== commentid);
    }
  },
  created() {
    this.fetchComments();
  }
};
</script>

  
  