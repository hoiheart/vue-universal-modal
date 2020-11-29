<template>
  <h2>6. wai-aria</h2>
  <p>
    <button @click="showModal('modal1')">
      Show modal1
    </button>
  </p>
  <Modal
    v-if="isShowModal.modal1"
    id="aria-modal1"
    v-slot="{ emitClose }"
    class="aria-modal aria-modal1"
    aria-labelledby="heading-modal1"
    :close="() => closeModal('modal1')"
  >
    <div class="modal">
      <h2 id="heading-modal1">
        wai-aria1
      </h2>
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
    id="aria-modal2"
    v-slot="{ emitClose }"
    class="aria-modal aria-modal2"
    aria-labelledby="heading-modal2"
    :close="() => closeModal('modal2')"
  >
    <div class="modal">
      <h2 id="heading-modal2">
        wai-aria2
      </h2>
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

<style lang="scss">
#aria-modal1,
#aria-modal2 {
  &:focus {
    border: 15px solid #fff;
  }
}
</style>

<style scoped lang="scss">
button:focus {
  background-color: #1890ff;
  color: #fff;
}
</style>
