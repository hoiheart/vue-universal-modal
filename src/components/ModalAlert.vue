<template>
  <Modal #default="{ setDisplay }">
    <h1>Modal</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <button @click="close(setDisplay)">close</button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    close (fn) {
      fn(false)
    }
  }
})
</script>
