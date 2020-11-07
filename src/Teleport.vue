<template>
  <div :id="teleportComponentId" class="vue-universal-modal-teleport"></div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { PluginOptions } from './index'
import { PLUGIN_NAME } from './index'

export default defineComponent({
  setup () {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as PluginOptions

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
