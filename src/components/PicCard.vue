<template>
    <v-card>
      <v-img :src="pic.url" height="200px"></v-img>
      <v-card-actions>
        <v-btn color="red" @click="deletePic(pic.picid)">删除</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      pic: {
        type: Object,
        required: true
      }
    },
    methods: {
      async deletePic(picid) {
        try {
          // 发送请求到后台删除图片（将display属性设置为0）
          await fetch(`/api/pics/${picid}/delete`, { method: 'POST' });
          this.$emit('deleted', picid);
        } catch (error) {
          console.error('删除图片失败:', error);
        }
      }
    }
  };
  </script>
  