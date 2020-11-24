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
