import { computed, getCurrentInstance, inject, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { PLUGIN_NAME, CLASS_NAME } from './index'

import type { ComputedRef, Ref } from 'vue'
import type { Provide } from './index'

type UseOrder = ({ modelValue, show }: {
  modelValue: Ref<boolean|undefined>;
  show: Ref<boolean>;
}) => {
  latest: ComputedRef<boolean>
}
export const useOrder: UseOrder = ({ modelValue, show }) => {
  const { visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME) as Provide
  const { uid } = getCurrentInstance() || {}

  const latest = computed(() => {
    if (!uid || !visibleModals.value.length) return false
    return uid === visibleModals.value[visibleModals.value.length - 1]
  })

  watch([
    () => modelValue.value,
    () => show.value
  ], () => {
    if (!uid) {
      return
    }

    const isShow = modelValue.value && show.value

    if (isShow && visibleModals.value.indexOf(uid) < 0) {
      addVisibleModals(uid)
    }

    if (!isShow && visibleModals.value.indexOf(uid) > -1) {
      removeVisibleModals(uid)
    }
  }, { immediate: true })

  return {
    latest
  }
}

type UseColse = ({ close, options, latest }: {
  close: Ref<FunctionConstructor>;
  options: Ref<{ [key: string]: unknown }>;
  latest: ComputedRef<boolean>
}) => {
  mergeOptions: { [key: string]: unknown };
  onClickDimmed: () => void
}
export const useClose: UseColse = ({ close, options, latest }) => {
  const mergeOptions = {
    transition: 300,
    closeClickDimmed: true,
    closeKeyCode: 27,
    styleModalContent: {},
    ...options.value
  }

  function onClickDimmed () {
    if (mergeOptions.closeClickDimmed) {
      close.value()
    }
  }
  function closeKeyEvent (event: KeyboardEvent) {
    if (event.keyCode === mergeOptions.closeKeyCode && latest.value) {
      close.value()
    }
  }

  onMounted(() => {
    if (mergeOptions.closeKeyCode) {
      document.addEventListener('keyup', closeKeyEvent)
    }
  })

  onUnmounted(() => {
    if (mergeOptions.closeKeyCode) {
      document.removeEventListener('keyup', closeKeyEvent)
    }
  })

  return {
    mergeOptions,
    onClickDimmed
  }
}

type UseA11Y = ({ modalRef, latest, show }: {
  modalRef: Ref<null|HTMLElement>;
  latest: ComputedRef<boolean>;
  show: Ref<boolean>;
}) => void
export const useA11Y: UseA11Y = ({ modalRef, latest, show }) => {
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
      nextTick(() => setFocus(value))
    }, { immediate: show.value })
  })

  onUnmounted(() => {
    document.removeEventListener('click', setLastActiveElement)
  })
}
