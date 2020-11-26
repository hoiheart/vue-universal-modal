<template>
  <h1>Vue Universal Modal Examples</h1>
  <Example1 />
  <Example2 />
  <Example3 />
  <Example4 />
  <Example5 />
  <VueUniversalModal />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Example1 from './1.basic.vue'
import Example2 from './2.visible.vue'
import Example3 from './3.options.vue'
import Example4 from './4.modal.on.modal.vue'
import Example5 from './5.custom.animation.vue'

export default defineComponent({
  components: {
    Example1,
    Example2,
    Example3,
    Example4,
    Example5
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  -webkit-text-size-adjust: none;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 16px;
  color: #2c3e50;
}

#app {
  padding: 30px;
}

h1 {
  margin: 0 0 30px;
  font-size: 26px;
  font-weight: 500;
}

h2 {
  margin: 20px 0 10px;
  font-size: 20px;
  font-weight: 500;
}

p {
  margin: 10px 0;
}

button {
  transition: 0.3s;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 5px;
  color: #1890ff;
  background: #fff;
  border: 1px solid #1890ff;
  outline: none;
  cursor: pointer;
}
button:focus,
button:hover {
  border-color: #015baf;
  color: #015baf;
}

.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
