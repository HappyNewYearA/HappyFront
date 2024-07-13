// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/WuMap.vue';
import Search from '../components/Search.vue';
import User from '../components/User.vue';
import SpotDetail from '../components/SpotDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/user', component: User },
  { path: '/spot/:name', component: SpotDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;