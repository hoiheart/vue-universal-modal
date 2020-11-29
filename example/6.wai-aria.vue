<template>
  <h2>6. wai-aria</h2>
  <p>
    <button @click="showModal1">
      Show modal1
    </button>
  </p>
  <Modal
    v-if="isShowModal1"
    id="aria-modal1"
    v-slot="{ emitClose }"
    class="aria-modal aria-modal1"
    aria-labelledby="heading-modal1"
    :close="closeModal1"
  >
    <div class="modal">
      <h2 id="heading-modal1">
        wai-aria1
      </h2>
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
    id="aria-modal2"
    v-slot="{ emitClose }"
    class="aria-modal aria-modal2"
    aria-labelledby="heading-modal2"
    :close="closeModal2"
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

<style lang="scss">
#aria-modal1,
#aria-modal2 {
  &:focus {
    border: 5px solid #fff;
  }
}
</style>

<style scoped lang="scss">
button:focus {
  background-color: #1890ff;
  color: #fff;
}
</style>
