
export default {
  path: '/test',
  component: ()=>
    import ('@/views/Test/index.vue'),
  name: 'Test',
  meta: {
    title: ''
  },
}