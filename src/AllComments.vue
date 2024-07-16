<template>
    <div>
      <v-btn @click="goBack" color="primary">返回</v-btn>
      <h1>全部评论</h1>
      <div v-if="loading">加载中...</div>
      <div v-else>
        <CommentCard
          v-for="comment in comments"
          :key="comment.commentid"
          :comment="comment"
          @deleted="removeComment"
        />
      </div>
    </div>
  </template>

  <script>
  import CommentCard from '@/components/CommentCard.vue';
  
  export default {
    components: {
      CommentCard,
    },
    data() {
      return {
        comments: [],
        loading: true,
      };
    },
    async created() {
      try {
        const response = await fetch('/api/admin/allcomments');
        if (!response.ok) {
          throw new Error('无法获取评论数据');
        }
        this.comments = await response.json();
      } catch (error) {
        console.error('加载评论失败:', error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      removeComment(commentid) {
        this.comments = this.comments.filter(comment => comment.commentid !== commentid);
      },
      goBack() {
        this.$router.push('/adminmain');
      }
    }
  };
  </script>

  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>