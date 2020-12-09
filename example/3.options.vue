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
    <button @click="showModal('modal1')">
      Show modal
    </button>
  </p>
  <Modal
    v-if="isShowModal.modal1"
    v-slot="{ emitClose }"
    :close="() => closeModal('modal1')"
    :options="options"
  >
    <div class="modal">
      <p>
        modal1
      </p>
      <button
        :style="{ marginRight: '10px' }"
        @click="showModal('modal2')"
      >
        open modal2
      </button>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
  <Modal
    v-if="isShowModal.modal2"
    v-slot="{ emitClose }"
    :close="() => closeModal('modal2')"
    :options="options"
  >
    <div class="modal">
      <p>
        modal2
      </p>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const isShowModal = reactive({
      modal1: false,
      modal2: false
    })

    const options = {
      transition: false,
      closeClickDimmed: false,
      closeKeyCode: false,
      styleModal: { backgroundColor: 'rgba(255, 255, 0, 0.3)' },
      styleModalContent: { justifyContent: 'flex-start' }
    }

    function showModal (key: 'modal1' | 'modal2') {
      isShowModal[key] = true
    }

    function closeModal (key: 'modal1' | 'modal2') {
      isShowModal[key] = false
    }

    return {
      isShowModal,
      options,
      showModal,
      closeModal
    }
  }
})
</script>
