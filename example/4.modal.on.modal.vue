<template>
  <h2>4. modal in modal</h2>
  <p>
    <button @click="showModal('modal1')">
      Show modal1
    </button>
  </p>
  <Modal
    v-if="isShowModal.modal1"
    v-slot="{ emitClose }"
    :close="() => closeModal('modal1')"
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

    function showModal (key: 'modal1' | 'modal2') {
      isShowModal[key] = true
    }

    function closeModal (key: 'modal1' | 'modal2') {
      isShowModal[key] = false
    }

    return {
      isShowModal,
      showModal,
      closeModal
    }
  }
})
</script>
