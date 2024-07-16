import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/UserLogin.vue';
import AdminLogin from '@/AdminLogin.vue';
import UserRegister from '@/UserRegister.vue';
import UserInfo from '@/UserInfo.vue';
import UserComments from '@/UserComments.vue';
import UserPics from '@/UserPics.vue';
import WuMap from '@/WuMap.vue';
import SearchSpot from '@/SearchSpot.vue';
import SpotDetail from '@/SpotDetail.vue';

const routes = [
  { path: '/login', component: UserLogin },
  { path: '/admin-login', component: AdminLogin },
  { path: '/register', component: UserRegister },
  { path: '/userinfo', component: UserInfo },
  { path: '/usercomments', component: UserComments },
  { path: '/userpics', component: UserPics },
  { path: '/wumap', component: WuMap },
  { path: '/searchspot', component: SearchSpot },
  { path: '/spotdetail', component: SpotDetail },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
