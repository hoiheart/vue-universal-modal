<template>
  <h3 :class="style.h3">5. custom animation</h3>
  <div>
    <button :class="style.button" @click="showModal">Show modal</button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/main/example/5.custom.animation.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
  <Modal v-model="isShow" :close="closeModal">
    <div class="modal">
      <p>Hello</p>
      <button :class="style.button" @click="closeModal">close</button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { style } from './style';

export default defineComponent({
  setup() {
    const isShow = ref(false);

    function showModal() {
      isShow.value = true;
    }

    function closeModal() {
      isShow.value = false;
    }

    return {
      isShow,
      showModal,
      closeModal,
      style,
    };
  },
});
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
