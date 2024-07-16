import Vue from 'vue';
import Router from 'vue-router';
import AdminMain from '@/components/adminmain.vue';
import AllComments from '@/components/AllComments.vue';
import AllPics from '@/components/AllPics.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AdminMain',
      component: AdminMain
    },
    {
      path: '/allcomments',
      name: 'AllComments',
      component: AllComments
    },
    {
      path: '/allpics',
      name: 'AllPics',
      component: AllPics
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue') // 假设有一个Login.vue页面
    }
  ]
});
