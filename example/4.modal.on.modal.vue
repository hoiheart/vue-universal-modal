<template>
  <h2>4. modal in modal</h2>
  <p>
    <button @click="showModal1">
      Show modal1
    </button>
  </p>
  <Modal
    v-if="isShowModal1"
    v-slot="{ emitClose }"
    :close="closeModal1"
  >
    <div class="modal">
      <p>
        modal1
      </p>
      <button
        :style="{ marginRight: '10px' }"
        @click="showModal2"
      >
        open modal2
      </button>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
  <Modal
    v-if="isShowModal2"
    v-slot="{ emitClose }"
    :close="closeModal2"
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShowModal1 = ref(false)
    const isShowModal2 = ref(false)
    return { isShowModal1, isShowModal2 }
  },
  methods: {
    showModal1 () {
      this.isShowModal1 = true
    },
    closeModal1 () {
      this.isShowModal1 = false
    },
    showModal2 () {
      this.isShowModal2 = true
    },
    closeModal2 () {
      this.isShowModal2 = false
    }
  }
})
</script>
