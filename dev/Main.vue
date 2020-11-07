<template>
  <div>
    <h1>Vue Universal Modal</h1>
  </div>
  <div>
    <h2>Modal1 - basic</h2>
    <p>
      <button @click="showModal(0)">Show modal</button>
    </p>
    <ModalExample v-if="modalStatus[0]" title="Modal 1" @close="closeModal(0)" />
  </div>
  <div>
    <h2>Modal2 - style</h2>
    <p>
      <button @click="showModal(1)">Show modal</button>
    </p>
    <ModalExample :disabled="!modalStatus[1]" title="Modal 2" @close="closeModal(1)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ModalExample from './ModalExample.vue'

export default defineComponent({
  name: 'Example',
  components: {
    ModalExample
  },
  setup () {
    const modalStatus = reactive([
      false,
      false
    ])

    return {
      modalStatus
    }
  },
  methods: {
    showModal (index: number) {
      this.modalStatus[index] = true
    },
    closeModal (index: number) {
      this.modalStatus[index] = false
    }
  }
})
</script>
