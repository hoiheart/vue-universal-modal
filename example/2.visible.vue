<template>
  <h2>2. change v-show (always mounted)</h2>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-slot="{ emitClose }"
    :close="closeModal"
    :disabled="!isShow"
  >
    <div class="modal">
      <p>
        change v-show
      </p>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(true)
    return { isShow }
  },
  methods: {
    showModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    }
  }
})
</script>
