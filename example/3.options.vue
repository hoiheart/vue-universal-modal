<template>
  <h2>3. options</h2>
  <ul>
    <li>transition: false</li>
    <li>closeClickDimmed: false</li>
    <li>closeKeyCode: false</li>
    <li>styleModal: { backgroundColor: 'rgba(255, 255, 0, 0.3)' }</li>
    <li>styleModalContent: { justifyContent: 'flex-start' }</li>
  </ul>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-if="isShow"
    v-slot="{ emitClose }"
    :close="closeModal"
    :options="options"
  >
    <div class="modal">
      <p>
        options
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

    const options = {
      transition: false,
      closeClickDimmed: false,
      closeKeyCode: false,
      styleModal: { backgroundColor: 'rgba(255, 255, 0, 0.3)' },
      styleModalContent: { justifyContent: 'flex-start' }
    }

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    return {
      isShow,
      options,
      showModal,
      closeModal
    }
  }
})
</script>
