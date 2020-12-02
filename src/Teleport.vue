<template>
  <div
    :id="teleportComponentId"
    ref="teleportRef"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { PLUGIN_NAME } from './index'

import type { Provide } from './index'

export default defineComponent({
  setup () {
    const { teleportComponentId, teleportRef } = inject(PLUGIN_NAME) as Provide

    return {
      teleportComponentId,
      teleportRef
    }
  }
})
</script>
