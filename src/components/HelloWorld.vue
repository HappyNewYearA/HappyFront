<template>
  <v-container>
    <h2>上传图片</h2>
    <v-btn @click="selectImage">上传图片</v-btn>
    <input
      type="file"
      ref="fileInput"
      accept="image/jpeg, image/png"
      style="display: none"
      @change="uploadImage"
    />
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('上传成功:', response.data);
        this.$emit('upload-success', response.data); // 可根据需要自定义成功后的操作
      } catch (error) {
        console.error('上传失败:', error);
        this.$emit('upload-failed', error); // 可根据需要自定义失败后的操作
      }
    },
  },
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
