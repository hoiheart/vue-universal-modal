<template>
  <VueUniversalModal />
  <ModalAlert />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalAlert from './components/ModalAlert.vue'

export default defineComponent({
  name: 'App',
  components: {
    ModalAlert
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
