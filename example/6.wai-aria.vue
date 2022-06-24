<template>
  <h3 :class="style.h3">
    6. wai-aria
  </h3>
  <div>
    <button
      :class="style.button"
      @click="showModal('modal1')"
    >
      Show modal1
    </button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/main/example/6.wai-aria.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
  <Modal
    id="aria-modal1"
    v-model="isShowModal.modal1"
    class="border-8 border-white-700 focus:border-blue-700"
    aria-labelledby="heading-modal1"
    :close="() => closeModal('modal1')"
  >
    <div class="modal">
      <h2 id="heading-modal1">
        wai-aria1
      </h2>
      <button
        :class="style.button"
        class="mr-2"
        @click="showModal('modal2')"
      >
        open modal2
      </button>
      <button
        :class="style.button"
        @click="() => closeModal('modal1')"
      >
        close
      </button>
    </div>
  </Modal>
  <Modal
    id="aria-modal2"
    v-model="isShowModal.modal2"
    class="border-8 border-white-700 focus:border-blue-700"
    aria-labelledby="heading-modal2"
    :close="() => closeModal('modal2')"
  >
    <div class="modal">
      <h2 id="heading-modal2">
        wai-aria2
      </h2>
      <button
        :class="style.button"
        @click="() => closeModal('modal2')"
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
