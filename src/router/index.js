import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './login/index'
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login'
  }, {
    path: '/',
    component:()=> {
      import ('@/views/Login/login.vue')
    }
  },
  Login
];

const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass: 'active'
});

export default router