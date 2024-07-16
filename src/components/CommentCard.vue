<template>
  <v-card>
    <v-card-title>{{ comment.text }}</v-card-title>
    <v-card-subtitle>
      {{ comment.scene }} - {{ comment.user }} - {{ comment.time }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="red" @click="deleteComment(comment.commentid)">删除</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deleteComment(commentid) {
      try {
        // 发送请求到后台删除评论（将display属性设置为0）
        await fetch(`/api/comments/${commentid}/delete`, { method: 'POST' });
        this.$emit('deleted', commentid);
      } catch (error) {
        console.error('删除评论失败:', error);
      }
    }
  }
};
</script>
