<template>
  <teleport :to="`#${teleportComponentId}`">
    <div class="modal">
      <slot></slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { Options } from '../index'
import { PLUGIN_NAME } from '../index'

export default defineComponent({
  setup () {
    const { teleportComponentId } = inject(PLUGIN_NAME) as Options

    return {
      teleportComponentId
    }
  }
})
</script>
