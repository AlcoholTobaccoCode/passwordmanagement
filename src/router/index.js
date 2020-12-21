import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '@/router/Register/index'
import Root from '@/router/Root/index'
import Test from '@/router/Test/index'
import Login from '@/router/Login/index'
// import RegisterPaged from '@/views/Register/register.vue'
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/root'
  },
  Register, //* 注册管理密码模块
  Root, //* 根模块
  Login, //* 登录模块
  Test, //* 测试模块
];

const router = new VueRouter({
  routes,
  // mode: 'history',
  // linkActiveClass: 'active'
});

//* 全局路由守卫
router.beforeEach((to, from, next) => {
  debugger
  // let storeName = 'registerPsw';
  // const dataInfo =  this.db[storeName].readAll().catch(err => {
  //   console.info(err.message)
  // })
  // console.info(dataInfo)
  // return
  let nextPath = {
    register: "next({path: '/register',})",
    root: "next({path: '/root',})",
    login: "next({path: '/login',})"
  };

  const adminPsw = JSON.parse(localStorage.getItem('adminPsw'));
  if (!adminPsw && to.name !== 'register') { //* 校验管理密码, 如果没有管理密码跳转至注册页
    eval(nextPath.register);
  } else if (adminPsw) { //* 如果有密码存在
    if (to.name !== 'register' && adminPsw.status) {
      next();
      return false;
    } else if (to.name !== 'login') {
      eval(nextPath.login); //* 进入登录模块
    } else if (to.name === 'login') {
      // eval(nextPath.login); //* 进入登录模块
      next();
      return false;
    } else {
      next();
      return false;
    }
    if (!adminPsw.status) { //* 且登录状态为 false
      eval(nextPath.login); //* 进入登录模块
      return false;
    } else {
      eval(nextPath.root); //* 进入 根 模块
      return false;
    }
  } else if (adminPsw && to.name === 'register') { //* 如果有密码存在, 且登录状态为 false, 则直接进入 login
    eval(nextPath.login);
      return false;
  } else if (to.name === 'register') {
    next();
      return false;
  } else if (!adminPsw && to.name !== 'register') {
    eval(nextPath.login);
      return false;
  }

  /* if (adminPsw) {
    if (adminPsw.status) {
      next();
    }
  } else {
    next({
      path: '/register',
    });
  } */
  //  else if(adminPsw.psw && !adminPsw.status) {
  //   next({
  //     path: '/login',
  //   });
  // } 
})

/* const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
} */

export default router