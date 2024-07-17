<!-- eslint-disable -->  
<template>  
  <div v-if="spot" class="spot-detail">  
    <!-- 左上角返回按钮 -->  
    <v-btn icon class="back-btn" @click="navigateBack">  
      <v-icon>mdi-arrow-left</v-icon>  
    </v-btn>  
    <!-- 景点名称和描述 -->  
    <h1>{{ spot.name }}</h1>  
    <p>{{ spot.description }}</p>  

    <!-- 图片轮播 -->  
    <v-carousel height="300px">  
      <!-- eslint-disable-next-line vue/no-unused-vars -->  
      <v-carousel-item v-for="(img, index) in spot.images" :key="index">  
        <v-img :src="img.url" :alt="`Image ${index + 1}`" height="300px"></v-img>  
      </v-carousel-item>  
    </v-carousel>  

    <!-- 右上角导航按钮 -->  
    <v-btn icon class="navigate-btn" @click="startNavigation">  
      <v-icon>mdi-send</v-icon>  
    </v-btn>  

    <!-- 相关评论区 -->  
    <div class="comments-section">  
      <h2>相关评论</h2>  
      <div v-for="comment in paginatedComments" :key="comment.commentid">  
        <comment-card :comment="comment" @deleted="removeComment"></comment-card>  
      </div>  
      <v-pagination  
        v-if="totalComments > commentsPerPage"  
        v-model="currentPage"  
        :length="totalPages"  
        :total-visible="5"  
      ></v-pagination>  
    </div>  

    <!-- 控制按钮 -->  
    <div class="controls">  
      <v-btn color="blue" @click="uploadComment">上传评论</v-btn>  
      <v-btn color="blue" @click="uploadImage">上传图片</v-btn>  
    </div>  
  </div>  
</template>  

<script>  
import { ref, computed, onMounted } from 'vue'  
import { useRoute, useRouter } from 'vue-router'  
import CommentCard from './components/CommentCard.vue'  
import PicCard from './components/PicCard.vue'  

export default {  
  name: 'SpotDetail',  
  components: {  
    CommentCard,  
    PicCard  
  },  
  setup() {  
    const spot = ref(null)  
    const route = useRoute()  
    const router = useRouter()  
    const currentPage = ref(1)  
    const commentsPerPage = ref(3) // 调整每页显示的评论数为 3  

    const getSpotDetails = (spotName) => {  
      const spots = [  
        {  
          name: '万林艺术博物馆',  
          description: '武汉大学内汇集艺术珍品的地方，展示着丰富的艺术文化底蕴。',  
          images: [{ url: 'image1.jpg' }, { url: 'image2.jpg' }],  
          comments: [  
            { commentid: 1, text: '评论1', scene: '万林艺术博物馆', user: '用户1', time: '2024-07-16' },  
            { commentid: 2, text: '评论2', scene: '万林艺术博物馆', user: '用户2', time: '2024-07-16' },  
            { commentid: 3, text: '评论3', scene: '万林艺术博物馆', user: '用户3', time: '2024-07-16' },  
            { commentid: 4, text: '评论4', scene: '万林艺术博物馆', user: '用户4', time: '2024-07-16' },  
            { commentid: 5, text: '评论5', scene: '万林艺术博物馆', user: '用户5', time: '2024-07-16' }  
          ]  
        }  ,
        {  
    name: '樱花城堡',  
    description: '武汉大学内樱花盛开时最美丽的角落，吸引许多游客和摄影爱好者。',  
    images: [{ url: 'yinghua_castle_1.jpg' }, { url: 'yinghua_castle_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '樱花城堡', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '樱花城堡', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  
  {  
    name: '人文馆',  
    description: '武汉大学内展示人文历史与文化的重要场所，深受师生喜爱。',  
    images: [{ url: 'renwen_guan_1.jpg' }, { url: 'renwen_guan_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '人文馆', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '人文馆', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '宋卿体育馆',  
    description: '武汉大学师生锻炼身体、享受体育乐趣的重要场所。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '宋卿体育馆', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '宋卿体育馆', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '行政楼',  
    description: '武汉大学的行政中心，管理着校园的各项事务。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '行政楼', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '行政楼', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '凌波门栈道',  
    description: '欣赏日出日落，坐看云卷云舒。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '凌波门栈道', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '凌波门栈道', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '珞珈山',  
    description: '武汉大学的标志性景点，俯瞰校园，风景优美。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '珞珈山', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '珞珈山', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '周恩来故居',  
    description: '武汉大学内保留完好的历史建筑，让人们缅怀这位伟大领袖的丰功伟绩。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '周恩来故居', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '周恩来故居', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '老图书馆',  
    description: '武汉大学的知识殿堂，汇集着丰富的图书资源和文献资料。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '老图书馆', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '老图书馆', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
  {  
    name: '牌坊',  
    description: '武汉大学的标志性建筑之一，见证着校园的历史沿革。',  
    images: [{ url: 'paifang_1.jpg' }, { url: 'paifang_2.jpg' }],  
    comments: [  
      { commentid: 1, text: '评论1', scene: '牌坊', user: '用户1', time: '2024-07-16' },  
      { commentid: 2, text: '评论2', scene: '牌坊', user: '用户2', time: '2024-07-16' }  
    ]  
  },  
      ]  
      return spots.find((spot) => spot.name === spotName) || { name: '未知景点', description: '暂无描述', images: [], comments: [] }  
    }  

      
      onMounted(() => {  
  const spotName = route.params.name;  
  spot.value = getSpotDetails(spotName);  
});  
      

    const paginatedComments = computed(() => {  
      const start = (currentPage.value - 1) * commentsPerPage.value  
      const end = start + commentsPerPage.value  
      return spot.value ? spot.value.comments.slice(start, end) : []  
    })  

    const totalComments = computed(() => (spot.value ? spot.value.comments.length : 0))  

    const totalPages = computed(() => Math.ceil(totalComments.value / commentsPerPage.value))  

    const uploadComment = () => {  
      alert('上传评论功能待实现')  
    }  

    const uploadImage = () => {  
      alert('上传图片功能待实现')  
    }  

    const removeComment = (commentid) => {  
      spot.value.comments = spot.value.comments.filter((comment) => comment.commentid !== commentid)  
    }  

    const removeImage = (picid) => {  
      spot.value.images = spot.value.images.filter((img) => img.picid !== picid)  
    }  

    const navigateBack = () => {  
      router.push( '/wumap' ) 
    }  

    const startNavigation = () => {  
      const { name } = spot.value  
      if ('AMap' in window) {  
        const AMap = window.AMap;  
        AMap.plugin('AMap.Driving', () => {  
          const driving = new AMap.Driving({  
            map: new AMap.Map('container', {  
              resizeEnable: true  
            })  
          })  

          // 假设从某个固定位置开始导航，比如学校的某个地址  
          const startLngLat = [116.397428, 39.90923] // 北京天安门的经纬度数据，实际应用中应进行相应替换  
          // 终点为景点位置，假设从 spot 中获取  
          const endLngLat = [116.397428, 39.90923] // 需要从 spot 中获取实际数据  

          // 导航的路径规划  
          driving.search(new AMap.LngLat(...startLngLat), new AMap.LngLat(...endLngLat), (status, result) => {  
            if (status === 'complete') {  
              console.log('导航规划成功：', result)  
            } else {  
              console.error('导航规划失败：', result)  
            }  
          })  
        })  
      } else {  
        alert('高德地图JS API没有加载')  
      }  
    }  

    return {  
      spot,  
      currentPage,  
      commentsPerPage,  
      paginatedComments,  
      totalComments,  
      totalPages,  
      uploadComment,  
      uploadImage,  
      removeComment,  
      removeImage,  
      navigateBack,  
      startNavigation  
    }  
  }  
}  
</script>  

<style scoped>  
.spot-detail {  
  padding: 20px;  
  position: relative;  
}  

.comments-section {  
  margin: 20px 0;  
}  

.controls {  
  display: flex;  
  justify-content: space-between;  
}  

.v-btn.icon.back-btn {  
  position: absolute;  
  top: 10px;  
  left: 10px;  
}  

.v-btn.icon.navigate-btn {  
  position: absolute;  
  top: 10px;  
  right: 10px;  
}  
</style>
