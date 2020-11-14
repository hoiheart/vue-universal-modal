<template>
  <div :id="teleportComponentId" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { PLUGIN_NAME } from './index'

import type { Provide } from './index'

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
