<template>
  <Modal :visible="true" :options="options" @close="close">
    <h1>Modal</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <button @click="close">close</button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  emits: ['hide'],
  methods: {
    close () {
      this.$emit('hide')
    }
  }
})
</script>
