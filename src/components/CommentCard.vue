<template>
  <v-card>
    <v-card-title>{{ comment.text }}</v-card-title>
    <v-card-subtitle>
      {{ comment.scene }} - {{ comment.user }} - {{ comment.time }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="red" @click="deleteComment(comment)">删除</v-btn>
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
    async deleteComment(comment) {
      try {
        // 发送请求到后台删除评论（发送五个包）
        const data = {
          commentid: comment.commentid,
          text: comment.text,
          user: comment.user,
          scene: comment.scene,
          time: comment.time
        };
        await fetch('/api/comments/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        this.$emit('deleted', comment.commentid);
      } catch (error) {
        console.error('删除评论失败:', error);
      }
    }
  }
};
</script>
