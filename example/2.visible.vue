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
    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    return {
      isShow,
      showModal,
      closeModal
    }
  }
})
</script>
