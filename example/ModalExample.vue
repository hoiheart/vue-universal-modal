<template>
  <Modal
    v-slot="{ emitClose }"
    :options="options"
  >
    <div class="modal">
      <h1>{{ title }}</h1>
      <p>
        Vue Universal Modal
      </p>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    const options = {
      // transition: false
    }

    return {
      options
    }
  }
})
</script>

<style scoped lang="scss">
.modal {
  width: 50%;
  padding: 50px;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
}

h1 {
  margin-top: 0;
}
</style>
