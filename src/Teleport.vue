<template>
  <div
    :id="teleportComponentId"
    class="vue-universal-modal-teleport"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { Provide } from './index'
import { PLUGIN_NAME } from './index'

export default defineComponent({
  setup () {
    const { teleportComponentId, isCreatedTeleport } = inject(PLUGIN_NAME) as Provide

    isCreatedTeleport.value = true

    return {
      teleportComponentId
    }
  }
})
</script>
