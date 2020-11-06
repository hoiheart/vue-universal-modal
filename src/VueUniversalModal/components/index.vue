<template>
  <div :id="teleportComponentId" class="vue-universal-modal-teleport"></div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import type { Options } from '../index'
import { PLUGIN_NAME } from '../index'

export default defineComponent({
  setup () {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as Options

    const keyEvent = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        console.log('esc')
      }
    }

    onMounted(() => {
      document.addEventListener('keyup', keyEvent)
    })

    onUnmounted(() => {
      document.removeEventListener('keyup', keyEvent)
    })

    return {
      isCreatedTeleport,
      teleportComponentId
    }
  },
  created () {
    this.isCreatedTeleport = true
  }
})
</script>
