<template>
  <teleport
    v-if="inserted"
    :to="teleportTarget"
    :disabled="disabled"
  >
    <transition
      appear
      :name="CLASS_NAME"
      v-on="onTransitionEmit"
    >
      <div
        v-show="show"
        ref="modalRef"
        role="dialog"
        tabindex="-1"
        aria-modal="true"
        aria-label="Modal window"
        :class="[
          CLASS_NAME,
          { [`${CLASS_NAME}-show`]: show },
          { [`${CLASS_NAME}-latest`]: latest },
        ]"
        :style="{ transitionDuration: transition }"
        v-bind="$attrs"
      >
        <div
          :class="`${CLASS_NAME}-content`"
          :style="{
            transitionDuration: transition,
            ...mergeOptions?.styleModalContent
          }"
          @mousedown.self="onMouseDownDimmed"
          @mouseup="onMouseUpDimmed"
        >
          <slot :emitClose="emitClose" />
          <slot name="close" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRefs, watch } from 'vue'
import { PLUGIN_NAME, CLASS_NAME } from './index'
import { useA11Y, useClose, useOrder } from './hooks'

import type { Provide } from './index'

interface MergeOptions {
  transition: number | false;
  closeClickDimmed: boolean;
  closeKeyCode: number | false;
  styleModalContent: { [key: string]: unknown };
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    close: {
      type: Function,
      default: () => undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'before-enter',
    'enter',
    'after-enter',
    'enter-cancelled',
    'before-leave',
    'leave',
    'after-leave',
    'leave-cancelled'
  ],
  setup (props, context) {
    const { teleportTarget } = inject(PLUGIN_NAME) as Provide
    const { close, disabled, options, modelValue } = toRefs(props)

    const inserted = ref(modelValue.value === undefined ? true : modelValue.value)
    const modalRef = ref(null)
    const show = ref(!disabled.value)

    const mergeOptions: MergeOptions = {
      transition: 300,
      closeClickDimmed: true,
      closeKeyCode: 27,
      styleModalContent: {},
      ...options.value
    }

    watch([
      () => modelValue.value,
      () => disabled.value
    ], () => {
      const isShow = modelValue.value && !disabled.value

      show.value = isShow

      if (modelValue.value) {
        inserted.value = modelValue.value
      }
    }, { immediate: true })

    const { latest } = useOrder({ modalRef, show })
    useA11Y({ latest, modalRef, show })
    const { onMouseDownDimmed, onMouseUpDimmed } = useClose({
      close,
      closeClickDimmed: mergeOptions.closeClickDimmed,
      closeKeyCode: mergeOptions.closeKeyCode,
      latest
    })

    const onTransitionEmit = {
      beforeEnter: () => context.emit('before-enter'),
      enter: () => context.emit('enter'),
      afterEnter: () => context.emit('after-enter'),
      enterCancelled: () => context.emit('enter-cancelled'),
      beforeLeave: () => context.emit('before-leave'),
      leave: () => context.emit('leave'),
      afterLeave: () => {
        context.emit('after-leave')
        if (modelValue.value === false) {
          inserted.value = false
        }
      },
      leaveCancelled: () => context.emit('leave-cancelled')
    }

    /**
     * @deprecated
     */
    const emitClose = () => {
      console.warn('emitClose was deprecated.\nhttps://github.com/hoiheart/vue-universal-modal#usage-modal')
      if (close.value) close.value()
    }

    return {
      CLASS_NAME,
      emitClose,
      inserted,
      latest,
      mergeOptions,
      modalRef,
      onMouseDownDimmed,
      onMouseUpDimmed,
      onTransitionEmit,
      show,
      teleportTarget,
      transition: mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false
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
