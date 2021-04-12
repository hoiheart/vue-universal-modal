<template>
  <teleport
    :to="teleportTarget"
    :disabled="disabled"
  >
    <transition
      :name="CLASS_NAME"
      appear
      @before-enter="$emit('before-enter')"
      @after-enter="$emit('after-enter')"
      @before-leave="$emit('before-leave')"
      @after-leave="emitAfterLeave"
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
  emits: [
    'before-enter',
    'after-enter',
    'before-leave',
    'after-leave'
  ],
  setup (props, context) {
    const { teleportTarget, visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME) as Provide
    const { uid } = getCurrentInstance() || {}
    const modalRef = ref()
    const show = ref()
    const latest = computed(() => {
      if (!uid || !visibleModals.value.length) return false
      return uid === visibleModals.value[visibleModals.value.length - 1]
    })

    watch(() => props.disabled, () => {
      show.value = !props.disabled
    }, { immediate: true })

    watch(() => show.value, (value) => {
      if (!uid) return

      if (value && visibleModals.value.indexOf(uid) < 0) {
        addVisibleModals(uid)
      }

      if (!value && visibleModals.value.indexOf(uid) > -1) {
        removeVisibleModals(uid)
      }
    }, { immediate: true })

    const mergeOptions = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      styleModal: {},
      styleModalContent: {},
      ...props.options
    } as Options
    const transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false

    function emitClose () {
      show.value = false
    }
    function emitAfterLeave () {
      context.emit('after-leave')
      props.close()
    }
    function onClickDimmed () {
      if (mergeOptions.closeClickDimmed) {
        emitClose()
      }
    }
    function closeKeyEvent (event: KeyboardEvent) {
      if (event.keyCode === mergeOptions.closeKeyCode && latest.value) {
        emitClose()
      }
    }

    // wai-aria
    let activeElement: Element | null
    function setLastActiveElement (event: Event) {
      const isModalEvent = (event.target as Element).closest(`.${CLASS_NAME}`)

      // skip when this not latest modal
      if (!latest.value) return

      // set activeElement when fired outside this modal
      if (!isModalEvent || (isModalEvent !== modalRef.value)) {
        // skip when modal status is closing
        if (isModalEvent && !isModalEvent.classList.contains(`${CLASS_NAME}-show`)) return
        activeElement = event.target as Element
      }
    }

    onMounted(() => {
      if (mergeOptions.closeKeyCode) {
        document.addEventListener('keyup', closeKeyEvent)
      }

      // wai-aria
      document.addEventListener('click', setLastActiveElement)
      function setFocus (value: boolean) {
        if (value) {
          if (modalRef.value) {
            (modalRef.value as unknown as HTMLElement).focus()
          }
        } else {
          if (activeElement) {
            (activeElement as HTMLElement).focus()
          }
        }
      }
      watch(() => show.value, (value) => {
        setFocus(value)
      }, { immediate: show.value })
    })

    onUnmounted(() => {
      if (mergeOptions.closeKeyCode) {
        document.removeEventListener('keyup', closeKeyEvent)
      }

      // wai-aria
      document.removeEventListener('click', setLastActiveElement)
    })

    return {
      CLASS_NAME,
      teleportTarget,
      modalRef,
      show,
      latest,
      emitClose,
      emitAfterLeave,
      onClickDimmed,
      mergeOptions,
      transition,
      className: props.class
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
