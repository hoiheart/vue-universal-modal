<template>
  <teleport
    v-if="isCreatedTeleport"
    :to="`#${teleportComponentId}`"
    :disabled="closed"
  >
    <transition
      :name="CLASS_NAME"
      appear
      @after-leave="setClose"
    >
      <div
        v-show="show"
        ref="modal"
        :class="[ CLASS_NAME ]"
        :style="{ transition, ...styleModal }"
      >
        <div
          :class="`${CLASS_NAME}-content`"
          :style="{ transition, ...styleModalContent }"
          @click.self="onClickDimmed"
        >
          <slot :emitClose="emitClose" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { PLUGIN_NAME, CLASS_NAME } from './index'

import type { Provide } from './index'

interface Options {
  transition: number | false;
  closeKeyCode: number | false;
  closeClickDimmed: boolean;
  styleModal: object;
  styleModalContent: object;
}

export default defineComponent({
  props: {
    close: { // Close function
      type: Function,
      required: true,
      default: () => {
        return undefined
      }
    },
    options: { // Modal options
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: { // Handle visibility
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { teleportComponentId, isCreatedTeleport } = inject(PLUGIN_NAME) as Provide

    const modal = ref(null)
    const show = ref(false)
    const closed = ref(false)

    watchEffect(() => {
      show.value = !props.disabled
      closed.value = props.disabled
    })

    const options = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      styleModal: {},
      styleModalContent: {},
      ...props.options
    } as Options

    const { closeClickDimmed, closeKeyCode, styleModal, styleModalContent } = options
    const transition = options.transition ? options.transition / 1000 + 's' : false

    const emitClose = () => {
      show.value = false
    }

    const onClickDimmed = () => {
      if (closeClickDimmed) {
        show.value = false
      }
    }

    const closeKeyEvent = (event: KeyboardEvent) => {
      if (event.keyCode === closeKeyCode) {
        show.value = false
      }
    }

    const setClose = () => {
      props.close()
      closed.value = true
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
      CLASS_NAME,
      emitClose,
      closed,
      show,
      setClose,
      isCreatedTeleport,
      modal,
      onClickDimmed,
      styleModal,
      styleModalContent,
      teleportComponentId,
      transition
    }
  }
})
</script>

<style lang="scss">
.vue-universal-modal-leave-from,
.vue-universal-modal-enter-to {
  opacity: 1;
}

.vue-universal-modal-enter-from,
.vue-universal-modal-leave-to {
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
  z-index: 51;
  background-color: rgba(#000, 0.8);
  text-align: left;

  &:not(:last-child) {
    z-index: 50;
    background: none !important;
  }
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
