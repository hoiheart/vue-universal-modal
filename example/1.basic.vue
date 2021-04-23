<template>
  <h3 :class="style.h3">
    1. basic
  </h3>
  <div>
    <button
      :class="style.button"
      @click="showModal"
    >
      Show modal
    </button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/master/example/1.basic.vue"
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
  >
    <div class="modal">
      <p>
        Hello
      </p>
      <button
        :class="style.button"
        @click="closeModal"
      >
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { style } from './style'

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
      closeModal,
      style
    }
  }
})
</script>
