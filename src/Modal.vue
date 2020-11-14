<template>
  <teleport
    v-if="isCreatedTeleport"
    :to="`#${teleportComponentId}`"
  >
    <transition
      name="modal"
      appear
      @after-leave="close"
    >
      <div
        v-show="show"
        ref="modal"
        class="vue-universal-modal"
        :class="{ active: show }"
        :style="{ transition, ...styleModal }"
      >
        <div
          class="vue-universal-modal-content"
          :style="styleModalContent"
          @click.self="onClickDimmed"
        >
          <slot :emitClose="emitClose" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, onUnmounted, watch } from 'vue'
import type { Provide } from './index'
import { PLUGIN_NAME } from './index'

interface Options {
  transition: number | false;
  closeKeyCode: number | false;
  closeClickDimmed: boolean;
  scrollLock: boolean;
  styleModal: object;
  styleModalContent: object;
}

export default defineComponent({
  props: {
    close: { // Close function
      type: Function,
      required: true
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
  setup (props) {
    const { isCreatedTeleport, teleportComponentId } = inject(PLUGIN_NAME) as Provide

    const modal = ref(null)
    const show = ref(!props.disabled)

    const options = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      scrollLock: true,
      styleModal: {},
      styleModalContent: {},
      ...props.options
    } as Options

    const { closeClickDimmed, closeKeyCode, scrollLock, styleModal, styleModalContent } = options
    const transition = options.transition ? options.transition / 1000 + 's' : false

    watch(() => props.disabled, (val) => {
      show.value = !val
    })

    const emitClose = () => {
      show.value = false
    }

    const closeKeyEvent = (event: KeyboardEvent) => {
      if (event.keyCode === closeKeyCode) {
        show.value = false
      }
    }

    const onClickDimmed = () => {
      if (closeClickDimmed) {
        show.value = false
      }
    }

    onMounted(() => {
      if (closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }
    })

    onUnmounted(() => {
      if (closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
      }
    })

    return {
      modal,
      show,
      emitClose,
      isCreatedTeleport,
      onClickDimmed,
      scrollLock,
      styleModal,
      styleModalContent,
      teleportComponentId,
      transition
    }
  }
})
</script>

<style scoped lang="scss">
.modal-leave-from,
.modal-enter-to {
  opacity: 1;
}

.modal-enter-from,
.modal-leave-to {
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
