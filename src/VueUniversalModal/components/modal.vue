<template>
  <teleport v-if="isCreatedTeleport" :to="`#${teleportComponentId}`">
    <div v-if="display" v-show="visible" class="modal">
      <button @click="remove"></button>
      <slot
        :setDisplay="setDisplay"
        :setVisible="setVisible"
      ></slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import type { Options } from '../index'
import { PLUGIN_NAME } from '../index'

export default defineComponent({
  setup () {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as Options

    const display = ref(true)
    const setDisplay = (value: boolean) => (display.value = value)

    const visible = ref(true)
    const setVisible = (value: boolean) => (visible.value = value)

    return {
      display,
      isCreatedTeleport,
      setDisplay,
      setVisible,
      visible,
      teleportComponentId
    }
  },
  methods: {
    add () {
      this.setDisplay(true)
    },
    hide () {
      this.setVisible(false)
    },
    remove () {
      console.log('remove')
      this.setDisplay(false)
    },
    show () {
      this.setVisible(true)
    }
  }
})
</script>
