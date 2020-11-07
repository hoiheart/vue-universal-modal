<template>
  <div class="hello">
    <h1>Vue Universal Modal</h1>
    <p>
      show: {{ show }}
    </p>
    <button @click="showModal">Show modal</button>
  </div>
  <ModalExample v-if="show" @hide="hideModal" />
  <ModalExample :visible="show" @hide="hideModal" />
  <ModalExample2 :disabled="show" @hide="hideModal" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ModalExample from './ModalExample.vue'
import ModalExample2 from './ModalExample2.vue'

export default defineComponent({
  name: 'Example',
  components: {
    ModalExample,
    ModalExample2
  },
  setup () {
    const show = ref(false)

    return {
      show
    }
  },
  methods: {
    showModal () {
      this.show = true
    },
    hideModal () {
      this.show = false
    }
  }
})
</script>
