
export default {
  path: '/root',
  component: ()=>
    import ('@/views/Root/index.vue'),
  name: 'root',
  meta: {
    title: '管理密码'
  },
}