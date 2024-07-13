<template>
    <div class="spot-detail">
      <h1>{{ spot.name }}</h1>
      <p>详细信息待补充...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SpotDetail',
    data() {
      return {
        spot: null,
      };
    },
    created() {
      const spotName = this.$route.params.name;
      this.spot = this.getSpotDetails(spotName);
    },
    methods: {
      getSpotDetails(spotName) {
        const spots = [
          { name: '万林艺术博物馆', description: '这是景点的描述' },
          { name: '凌波门栈道', description: '这是景点的描述' },
          { name: '行政楼', description: '这是景点的描述' },
          { name: '周恩来故居', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '珞珈山', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '老图书馆', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '人文馆', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '樱花城堡', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '牌坊', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          { name: '宋卿图书馆', description: '这是景点的描述' },  { name: '万林艺术博物馆', description: '这是景点1的描述' },
          
        ];
        return spots.find((spot) => spot.name === spotName) || { name: '未知景点' };
      },
    },
  };
  </script>
  
  <style scoped>
  .spot-detail {
    padding: 20px;
  }
  </style>