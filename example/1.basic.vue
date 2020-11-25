<template>
  <h2>1. basic</h2>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-if="isShow"
    v-slot="{ emitClose }"
    :close="closeModal"
  >
    <div class="modal">
      <p>
        Hello
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
  name: 'Example',
  setup () {
    const isShow = ref(false)
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
