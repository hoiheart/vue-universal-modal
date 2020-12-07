<template>
  <teleport
    v-if="teleportRef"
    :to="teleportRef"
    :disabled="disabled"
  >
    <transition
      :name="CLASS_NAME"
      appear
      @after-leave="setClose"
    >
      <div
        v-show="show"
        :id="id"
        ref="modalRef"
        :class="[
          CLASS_NAME,
          className,
          { [`${CLASS_NAME}-show`]: show },
          { [`${CLASS_NAME}-latest`]: latest },
        ]"
        :style="{
          transitionDuration: transition,
          ...mergeOptions.styleModal
        }"
        role="dialog"
        aria-modal="true"
        :aria-label="!ariaLabelledby && 'Modal window'"
        :aria-labelledby="ariaLabelledby"
        tabindex="-1"
      >
        <div
          :class="`${CLASS_NAME}-content`"
          :style="{
            transitionDuration: transition,
            ...mergeOptions.styleModalContent
          }"
          @click.self="onClickDimmed"
        >
          <slot :emitClose="emitClose" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, getCurrentInstance, ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { PLUGIN_NAME, CLASS_NAME } from './index'

import type { Provide } from './index'

interface Options {
  transition: number | false;
  closeKeyCode: number | false;
  closeClickDimmed: boolean;
  styleModal: {[key: string]: string};
  styleModalContent: {[key: string]: string};
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
    const { teleportRef, visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME) as Provide
    const { uid } = getCurrentInstance() || {}
    const modalRef = ref(null)
    const show = ref(!props.disabled)
    const latest = computed(() => Boolean(uid === visibleModals.value[visibleModals.value.length - 1]))

    watch(() => props.disabled, () => {
      show.value = !props.disabled
    })

    function setVisibleModals () {
      if (!uid) return

      if (show.value && visibleModals.value.indexOf(uid) < 0) {
        addVisibleModals(uid)
      }

      if (!show.value && visibleModals.value.indexOf(uid) > -1) {
        removeVisibleModals(uid)
      }
    }
    watch(() => show.value, setVisibleModals)
    setVisibleModals()

    const mergeOptions = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      styleModal: {},
      styleModalContent: {},
      ...props.options
    } as Options
    const transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false

    const emitClose = function () {
      show.value = false
    }
    function onClickDimmed () {
      if (mergeOptions.closeClickDimmed) {
        show.value = false
      }
    }
    function closeKeyEvent (event: KeyboardEvent) {
      if (event.keyCode === mergeOptions.closeKeyCode && latest.value) {
        show.value = false
      }
    }
    function setClose () {
      props.close()
    }

    onMounted(() => {
      if (mergeOptions.closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }

      // wai-aria
      let activeElement: Element | null
      function setAriaFocus (value: boolean) {
        if (value) {
          activeElement = document.activeElement
          if (activeElement && modalRef.value) {
            (modalRef.value as unknown as HTMLElement).focus()
          }
        } else {
          if (activeElement) {
            (activeElement as HTMLElement).focus()
          }
        }
      }
      if (show.value) setAriaFocus(show.value)
      watch(() => show, (show) => {
        setAriaFocus(show.value)
      })
    })

    onUnmounted(() => {
      if (mergeOptions.closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
      }
    })

    return {
      CLASS_NAME,
      className: props.class,
      teleportRef,
      modalRef,
      show,
      latest,
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
  // prevent scroll chaining
  // Ios is not supported, but preparations continue to be made for feature mounting (https://bugs.webkit.org/show_bug.cgi?id=176454)
  overscroll-behavior: contain;
  position: fixed;
  overflow-y: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000, 0.8);
  text-align: left;

  &:not(.vue-universal-modal-latest) {
    background: none;
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
