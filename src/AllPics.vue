<template>
    <div>
      <v-btn @click="goBack" color="primary">返回</v-btn>
      <h1>全部图片</h1>
      <div v-if="loading">加载中...</div>
      <div v-else>
        <PicCard
          v-for="pic in pics"
          :key="pic.picid"
          :pic="pic"
          @deleted="removePic"
        />
      </div>
    </div>
  </template>
  
  <script>
  import PicCard from '@/components/PicCard.vue';
  
  export default {
    components: {
      PicCard,
    },
    data() {
      return {
        pics: [],
        loading: true,
      };
    },
    async created() {
      try {
        const response = await fetch('/api/admin/image');
        if (!response.ok) {
          throw new Error('无法获取图片数据');
        }
        this.pics = await response.json();
      } catch (error) {
        console.error('加载图片失败:', error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      removePic(picid) {
        this.pics = this.pics.filter(pic => pic.picid !== picid);
      },
      goBack() {
        this.$router.push('/admin');
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
  
