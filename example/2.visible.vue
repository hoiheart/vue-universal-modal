<template>
  <h3 :class="style.h3">
    2. change v-show (always mounted)
  </h3>
  <div>
    <button
      :class="style.button"
      @click="showModal"
    >
      Show modal
    </button>
    <a
      href="https://github.com/hoiheart/vue-universal-modal/blob/master/example/2.visible.vue"
      target="_blank"
      :class="style.button"
      class="ml-2"
    >
      Source
    </a>
  </div>
  <Modal
    v-slot="{ emitClose }"
    :close="closeModal"
    :disabled="!isShow"
  >
    <div class="modal">
      <p>
        change v-show
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
