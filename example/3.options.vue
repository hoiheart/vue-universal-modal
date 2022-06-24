<template>
  <h3 :class="style.h3">3. options</h3>
  <ul :class="style.ul">
    <li>transition: false</li>
    <li>closeClickDimmed: false</li>
    <li>closeKeyCode: false</li>
    <li>styleModalContent: { justifyContent: 'flex-start' }</li>
  </ul>
  <div>
    <button :class="style.button" @click="showModal('modal1')">
      Show modal
    </button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/main/example/3.options.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
  <Modal
    v-model="isShowModal.modal1"
    :close="() => closeModal('modal1')"
    :options="options"
    :style="{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }"
  >
    <div class="modal">
      <p>modal1</p>
      <button :class="style.button" class="mr-2" @click="showModal('modal2')">
        open modal2
      </button>
      <button :class="style.button" @click="() => closeModal('modal1')">
        close
      </button>
    </div>
  </Modal>
  <Modal
    v-model="isShowModal.modal2"
    :close="() => closeModal('modal2')"
    :options="options"
  >
    <div class="modal">
      <p>modal2</p>
      <button :class="style.button" @click="() => closeModal('modal2')">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { style } from './style';

export default defineComponent({
  setup() {
    const isShowModal = reactive({
      modal1: false,
      modal2: false,
    });

    const options = {
      transition: false,
      closeClickDimmed: false,
      closeKeyCode: false,
      styleModalContent: { justifyContent: 'flex-start' },
    };

    function showModal(key: 'modal1' | 'modal2') {
      isShowModal[key] = true;
    }

    function closeModal(key: 'modal1' | 'modal2') {
      isShowModal[key] = false;
    }

    return {
      isShowModal,
      options,
      showModal,
      closeModal,
      style,
    };
  },
});
</script>
