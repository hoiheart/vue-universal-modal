<template>
  <h2>5. custom animation</h2>
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

<style lang="scss" scoped>
/* Slide up transition when open modal */
.vue-universal-modal-enter-from,
.vue-universal-modal-enter-to,
.vue-universal-modal-leave-from,
.vue-universal-modal-leave-to {
  .modal {
    transition: 0.3s transform;
  }
}
.vue-universal-modal-enter-to .modal,
.vue-universal-modal-leave-from .modal {
  transform: translate3d(0, 0, 0);
}
.vue-universal-modal-enter-from .modal,
.vue-universal-modal-leave-to .modal {
  transform: translate3d(0, 50px, 0);
}
</style>
