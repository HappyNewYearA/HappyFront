<template>  
  <div class="map-container" v-dragscroll>  
    <img :src="require('@/assets/wuhan-university-map.jpg')" alt="Wuhan University Map" class="map-image" />       
    <div v-for="spot in spots" :key="spot.name" class="spot-marker" :style="{ left: spot.x, top: spot.y }" @click="selectSpot(spot)">  
      {{ spot.name }}  
    </div>  
    <div class="actions">  
      <button @click="goToUserinfo" class="action-button">用户</button>  
      <button @click="goToSearchPage" class="action-button">搜索</button>  
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'WuMap',  
  data() {  
    return {  
      spots: [  
        { name: '珞珈山', x: '72%', y: '54%' },  
        { name: '樱花城堡', x: '45%', y: '33%' },  
        { name: '人文馆', x: '30%', y: '60%' },  
        { name: '牌坊', x: '30%', y: '55%' },  
        { name: '万林艺术博物馆', x: '40%', y: '45%' },  
        { name: '周恩来故居', x: '80%', y: '58%' },  
        { name: '老图书馆', x: '43%', y: '27%' },  
        { name: '宋卿体育馆', x: '34%', y: '37%' },  
        { name: '凌波门栈道', x: '75%', y: '10%' },  
        { name: '行政楼', x: '55%', y: '43%' },  
      ],  
    };  
  },  
  methods: {  
    goToUserinfo() {  
      this.$router.push('/userinfo');  
    },  
    goToSearchPage() {  
      this.$router.push('/searchspot');  
    },  
    selectSpot(spot) {  
      this.$router.push({ path: `/spot/${spot.name}` });  
    },  
  },  
};  
</script>  
  
<style scoped>  
.map-container {  
  position: relative;  
  width: 100%;  
  height: 100vh;  
  overflow: auto;  
  cursor: grab;  
  touch-action: none; /* 防止触摸事件被解释为滚动事件 */  
}  

.map-image {  
  width: auto;  
  height: auto;  
  max-width: none; /* 确保图片没有被默认样式限制 */  
}  
  
.spot-marker {  
  position: absolute;  
  cursor: pointer;  
  background-color: rgba(0, 123, 255, 0.8);  
  color: white;  
  padding: 5px 10px;  
  border-radius: 5px;  
  transform: translate(-50%, -50%);  
  white-space: nowrap;  
  font-size: 2vw;  
}  
  
@media (max-width: 768px) {  
  .spot-marker {  
    font-size: 3vw;  
  }  
}  
  
.actions {  
  position: fixed;  
  bottom: 20px;  
  right: 20px;  
  display: flex;  
  flex-direction: column;  
}  
  
.action-button {  
  margin-top: 10px;  
  width: 4vw;  
  height: 4vw;  
  background-color: #007bff;  
  color: white;  
  border: none;  
  border-radius: 50%;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);  
  cursor: pointer;  
}  
  
@media (max-width: 768px) {  
  .action-button {  
    width: 8vw;  
    height: 8vw;  
  }  
}  
</style>