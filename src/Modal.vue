<template>
  <teleport
    v-if="isCreatedTeleport"
    :to="`#${teleportComponentId}`"
  >
    <transition
      :name="CLASS_NAME"
      appear
      @after-leave="close"
    >
      <div
        v-show="show"
        ref="modal"
        :class="[CLASS_NAME, { active: show }]"
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
import { defineComponent, inject, ref, onMounted, onUnmounted, watch, watchEffect } from 'vue'
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
    const show = ref(!props.disabled)

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

    watch(() => props.disabled, (val) => {
      show.value = !val
    })

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

    const setOrder = () => {
      if (show.value) {
        const latestModal = document.querySelector<HTMLDivElement>(`.${CLASS_NAME}[data-latest]`)
        delete latestModal?.dataset.latest

        const el = modal.value

        if (el) {
          (el as HTMLElement).dataset.modified = Date.now().toString();
          (el as HTMLElement).dataset.latest = ''
        }
      } else {
        const el = modal.value

        if (el) {
          delete (el as HTMLElement).dataset.modified
          delete (el as HTMLElement).dataset.latest
        }

        const activeModals = document.querySelectorAll<HTMLDivElement>(`.${CLASS_NAME}[data-modified]`)
        let latestModal: HTMLDivElement | null = null

        Array.from(activeModals).map((item) => {
          if (!latestModal) {
            latestModal = item
          } else {
            const a = new Date(Number(latestModal.dataset.modified))
            const b = new Date(Number(item.dataset.modified))

            if (b > a) latestModal = item
          }
        })

        if (latestModal) {
          (latestModal as HTMLDivElement).dataset.latest = ''
        }
      }
    }

    onMounted(() => {
      if (closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }

      watchEffect(() => setOrder)
    })

    onUnmounted(() => {
      if (closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
      }
    })

    return {
      CLASS_NAME,
      emitClose,
      isCreatedTeleport,
      modal,
      onClickDimmed,
      show,
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
