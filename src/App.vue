<template>
  <div id="app">
    <score-board />
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue';

export default {
  name: 'app',
  components: {
    ScoreBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo-img {
  width: 70%;
}
</style>
