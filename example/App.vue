<template>
  <Main />
  <VueUniversalModal />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from './Main.vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
