import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import AdminLogin from '../components/AdminLogin.vue';
import UserRegister from '../components/UserRegister.vue';

const routes = [
  { path: '/login', component: UserLogin },
  { path: '/admin-login', component: AdminLogin },
  { path: '/register', component: UserRegister },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
