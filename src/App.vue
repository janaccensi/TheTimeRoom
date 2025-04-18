<template>
  <Room3D />
</template>

<script>
import Room3D from './components/Room3D.vue';

export default {
  name: 'App',
  components: {
    Room3D
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  overflow: hidden;
}
</style>