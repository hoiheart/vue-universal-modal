<template>
  <h3 :class="style.h3">
    4. modal in modal
  </h3>
  <div>
    <button
      :class="style.button"
      @click="showModal('modal1')"
    >
      Show modal1
    </button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/master/example/4.modal.on.modal.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
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
      <button
        :class="style.button"
        @click="emitClose"
      >
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { style } from './style'

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
      closeModal,
      style
    }
  }
})
</script>
