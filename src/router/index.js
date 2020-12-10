import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './login/index'
import LoginPaged from '@/views/Login/login.vue'
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login'
  }, {
    path: '/',
    name: 'login',
    meta: {
      title: '设置管理密码'
    },
    component: LoginPaged
  },
  Login
];

const router = new VueRouter({
  routes,
  // mode: 'history',
  // linkActiveClass: 'active'
});

export default router