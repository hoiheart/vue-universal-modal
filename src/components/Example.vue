<template>
  <div class="hello">
    <h1>Vue Universal Modal</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>
  <ModalAlert />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalAlert from './ModalAlert.vue'

export default defineComponent({
  name: 'Example',
  components: {
    ModalAlert
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
