<template>
  <teleport v-if="isCreatedTeleport" :to="`#${teleportComponentId}`">
    <div ref="modal" v-show="!disabled" class="vue-universal-modal">
      <div class="vue-universal-modal-content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, onUnmounted } from 'vue'
import type { Provide } from './index'
import { PLUGIN_NAME } from './index'

interface Options {
  transition: number | false;
  closeKeyCode: number | false;
  closeDimmedClick: boolean;
  scrollLock: boolean;
  style: object;
}

export default defineComponent({
  props: {
    close: { // Close function
      type: Function
    },
    options: { // Modal options
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: { // Hidden by just use v-show
      type: Boolean,
      default: false
    }
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup ({ close, options }) {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as Provide

    const modal = ref(null)

    console.log(close)

    options = {
      transition: 300,
      closeKeyCode: 27,
      closeDimmedClick: true,
      scrollLock: true,
      style: {},
      ...options
    } as Options

    const closeKeyEvent = (event: KeyboardEvent) => {
      if (close && event.keyCode === options.closeKeyCode) {
        close()
      }
    }

    onMounted(() => {
      if (close && options.closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }
    })

    onUnmounted(() => {
      if (close && options.closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
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

<style scoped lang="scss">
.modal-enter-active, .modal-leave-active {
  opacity: 1;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.vue-universal-modal {
  -webkit-overflow-scrolling: touch;
  position: fixed;
  overflow-y: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(#000, 0.8);
  text-align: left;
}

.vue-universal-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}
</style>
