<template>
  <h3 :class="style.h3">7. event (please see console)</h3>
  <div>
    <button :class="style.button" @click="showModal">Show modal</button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/main/example/7.event.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
  <Modal
    v-model="isShow"
    :close="closeModal"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
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

    function beforeEnter() {
      console.log('before enter');
    }

    function afterEnter() {
      console.log('after enter');
    }

    function beforeLeave() {
      console.log('before leave');
    }

    function afterLeave() {
      console.log('after leave');
    }

    return {
      isShow,
      showModal,
      closeModal,
      style,
      beforeEnter,
      afterEnter,
      beforeLeave,
      afterLeave,
    };
  },
});
</script>
