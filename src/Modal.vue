<template>
  <teleport v-if="isCreatedTeleport" :to="`#${teleportComponentId}`">
    <div ref="modal" v-show="disabled" class="vue-universal-modal">
      <div class="vue-universal-modal-content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, onUnmounted } from 'vue'
import type { PluginOptions } from './index'
import { PLUGIN_NAME } from './index'

export default defineComponent({
  emits: ['close'],
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          hide: { // trigger hide
            click: { // when click at dimmed
              type: 'dom'
            },
            key: { // keyup event
              type: 'dom',
              code: 27
            }
          }
        }
      }
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup ({ disabled, options }, { emit }) {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as PluginOptions

    const modal = ref(null)

    console.log(disabled)

    console.log(emit)

    const keyEvent = (event: KeyboardEvent) => {
      console.log(options.hide.key.code)
      if (event.keyCode === options.hide.key.code) {
        console.log(document.getElementById(teleportComponentId))
        console.log(modal.value)
        console.log('esc')
        emit('close')
      }
    }

    onMounted(() => {
      console.log(options)
      if (options.hide.key) {
        document.addEventListener('keyup', keyEvent)
      }
    })

    onUnmounted(() => {
      if (options.hide.key) {
        document.removeEventListener('keyup', keyEvent)
      }
    })

    return {
      modal,
      isCreatedTeleport,
      teleportComponentId
    }
  }
})
</script>
