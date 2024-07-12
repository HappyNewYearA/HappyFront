<template>//用户查看自身发布图片页面
    <v-container>
      <h2>用户图片</h2>
      <v-row>
        <v-col v-for="pic in pics" :key="pic.picid" cols="12" sm="6" md="4">
          <PicCard :pic="pic" @deleted="removePic"></PicCard>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PicCard from './components/PicCard.vue';
  
  export default {
    components: {
      PicCard
    },
    data() {
      return {
        pics: [
          // 示例数据
          { picid: 1, url: 'https://example.com/pic1.jpg' },
          { picid: 2, url: 'https://example.com/pic2.jpg' },
          // 可以从后台获取实际数据
        ],
      };
    },
    methods: {
      removePic(picid) {
        this.pics = this.pics.filter(pic => pic.picid !== picid);
      }
    }
  };
  </script>
  