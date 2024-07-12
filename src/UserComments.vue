<template>//用户查看自身评论页面
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
  
  export default {
    components: {
      CommentCard
    },
    data() {
      return {
        comments: [
          // 示例数据
          { commentid: 1, text: '这是第一条评论' },
          { commentid: 2, text: '这是第二条评论' },
          // 可以从后台获取实际数据
        ],
      };
    },
    methods: {
      removeComment(commentid) {
        this.comments = this.comments.filter(comment => comment.commentid !== commentid);
      }
    }
  };
  </script>
  
  