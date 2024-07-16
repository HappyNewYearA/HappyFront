<template>  
  <div class="search-container">  
    <v-btn icon @click="goToWuMap" class="back-btn">  
      <v-icon>mdi-arrow-left</v-icon>  
    </v-btn>  
    <div class="search-box">  
      <input   
        type="text"   
        v-model="query"   
        placeholder="搜索景点"   
        class="search-input"  
      />  
      <button @click="search" class="search-button">搜索</button>  
    </div>  
    <ul v-if="filteredSpots.length > 0" class="results-list">  
      <li   
        v-for="spot in filteredSpots"   
        :key="spot.name"   
        @click="selectSpot(spot)"  
        class="results-item"  
      >  
        {{ spot.name }}  
      </li>  
    </ul>  
  </div>  
</template>  

<script>  
export default {  
  data() {  
    return {  
      query: '',  
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
  computed: {  
    filteredSpots() {  
      return this.query  
        ? this.spots.filter((spot) =>  
            spot.name.toLowerCase().includes(this.query.toLowerCase())  
          )  
        : [];  
    },  
  },  
  methods: {  
    search() {  
      console.log('搜索:', this.query);  
    },  
    selectSpot(spot) {  
      this.$router.push({ path: `/spot/${spot.name}` });  
    },  
    goToWuMap() {  
      this.$router.push('/wumap'); // 返回到 WuMap 页面  
    }  
  },  
};  
</script>  

<style scoped>  
.search-container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  margin: 20px;  
}  

.back-btn {  
  position: absolute;  
  top: 16px;  
  left: 16px;  
  z-index: 1000; /* 保证返回按钮在最上层 */  
}  

.search-box {  
  display: flex;  
  flex-direction: row;  
  align-items: center;  
  justify-content: center;  
  margin-bottom: 20px;  
}  

.search-input {  
  padding: 10px;  
  font-size: 16px;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
  outline: none;  
  margin-right: 10px;  
  transition: border-color 0.3s;  
}  

.search-input:focus {  
  border-color: #007bff;  
}  

.search-button {  
  padding: 10px 15px;  
  font-size: 16px;  
  color: white;  
  background-color: #007bff;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
  transition: background-color 0.3s;  
}  

.search-button:hover {  
  background-color: #0056b3;  
}  

.results-list {  
  list-style: none;  
  padding: 0;  
  width: 100%;  
  max-width: 400px;  
}  

.results-item {  
  padding: 10px;  
  font-size: 16px;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
  margin-bottom: 10px;  
  transition: background-color 0.3s, box-shadow 0.3s;  
  cursor: pointer;  
}  

.results-item:hover {  
  background-color: #f1f1f1;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  
}  

/* 响应式调整 */  
@media (max-width: 600px) {  
  .back-btn {  
    top: 8px;  
    left: 8px;  
  }  
}  
</style>