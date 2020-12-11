
export default {
  path: '/login',
  component: ()=>
    import ('@/views/Login/index.vue'),
  name: 'login',
  meta: {
    title: '使用管理密码登录'
  },
}