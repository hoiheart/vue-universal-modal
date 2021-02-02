<template>
  <h2 class="text-2xl font-bold mt-8 mb-4">
    Examples
  </h2>
  <Example1 />
  <Example2 />
  <Example3 />
  <Example4 />
  <Example5 />
  <Example6 />
  <Example7 />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Example1 from './1.basic.vue'
import Example2 from './2.visible.vue'
import Example3 from './3.options.vue'
import Example4 from './4.modal.on.modal.vue'
import Example5 from './5.custom.animation.vue'
import Example6 from './6.wai-aria.vue'
import Example7 from './7.event.vue'

export default defineComponent({
  components: {
    Example1,
    Example2,
    Example3,
    Example4,
    Example5,
    Example6,
    Example7
  }
})
</script>

<style lang="scss">
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
