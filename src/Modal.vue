<template>
  <teleport
    v-if="isCreatedTeleport"
    :to="`#${teleportComponentId}`"
    :disabled="state.closed"
  >
    <transition
      :name="CLASS_NAME"
      appear
      @after-leave="setClose"
    >
      <div
        v-show="state.show"
        :id="id"
        ref="modal"
        :class="[ CLASS_NAME, state.className ]"
        :style="{ transition, ...mergeOptions.styleModal }"
        role="dialog"
        aria-modal="true"
        :aria-label="!ariaLabelledby && 'Modal window'"
        :aria-labelledby="ariaLabelledby"
        tabindex="-1"
      >
        <div
          :class="`${CLASS_NAME}-content`"
          :style="{ transition, ...mergeOptions.styleModalContent }"
          @click.self="onClickDimmed"
        >
          <slot :emitClose="emitClose" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, onMounted, onUnmounted, watch } from 'vue'
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
    close: {
      type: Function,
      required: true,
      default: () => {
        return undefined
      }
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    },
    ariaLabelledby: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { teleportComponentId, isCreatedTeleport } = inject(PLUGIN_NAME) as Provide

    const modal = ref(null)

    const state = reactive({
      show: !props.disabled,
      closed: props.disabled,
      className: props.class
    })

    watch(() => props.disabled, () => {
      state.show = !props.disabled
      state.closed = props.disabled
    })

    const mergeOptions = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      styleModal: {},
      styleModalContent: {},
      ...props.options
    } as Options

    const { closeClickDimmed, closeKeyCode } = mergeOptions
    const transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false

    function emitClose () {
      state.show = false
    }

    function onClickDimmed () {
      if (closeClickDimmed) {
        state.show = false
      }
    }

    function closeKeyEvent (event: KeyboardEvent) {
      if (event.keyCode === closeKeyCode) {
        state.show = false
      }
    }

    function setClose () {
      props.close()
      state.closed = true
    }

    onMounted(() => {
      if (closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }

      // set aria focus
      let activeElement: Element | null
      function setAriaFocus (value: boolean) {
        if (value) {
          activeElement = document.activeElement;
          (modal.value as unknown as HTMLElement).focus()
        } else {
          if (activeElement) (activeElement as HTMLElement).focus()
        }
      }

      if (state.show) setAriaFocus(state.show)
      watch(() => state.show, (value) => {
        setAriaFocus(value)
      })
    })

    onUnmounted(() => {
      if (closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
      }
    })

    return {
      CLASS_NAME,
      teleportComponentId,
      isCreatedTeleport,
      modal,
      state,
      emitClose,
      setClose,
      onClickDimmed,
      mergeOptions,
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
  z-index: 52;
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
