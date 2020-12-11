<template>
  <div id="app">
    <div class="router-view">
      <!-- <h1>app</h1> -->
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

<style>
#app,
.router-view {
  height: 100%;
}

h1 {
  text-align: center;
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, .2)
}


</style>
