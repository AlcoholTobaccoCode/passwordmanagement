<template>
  <div id="app">
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style scoped>
#app,
.router-view {
  height: 100%;
}


</style>
