import { computed, inject, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { PLUGIN_NAME, CLASS_NAME } from './index'

import type { ComputedRef, Ref } from 'vue'
import type { Provide } from './index'

type UseA11Y = ({ modalRef, latest, show }: {
  modalRef: Ref<null|HTMLElement>;
  latest: ComputedRef<boolean>;
  show: Ref<boolean>;
}) => void

type UseClose = ({ close, closeKeyCode, latest }: {
  close: Ref;
  closeClickDimmed: boolean;
  closeKeyCode: number | false;
  latest: ComputedRef<boolean>;
}) => {
  onMouseDownDimmed: (e: MouseEvent) => void
  onMouseUpDimmed: (e: MouseEvent) => void
}

type UseOrder = ({ modalRef, show }: {
  modalRef: Ref<HTMLElement|null>
  show: Ref<boolean>;
}) => {
  latest: ComputedRef<boolean>
}

export const useA11Y: UseA11Y = ({ modalRef, latest, show }) => {
  let activeElement: Element | null

  function setLastActiveElement (event: Event) {
    const isModalEvent = (event.target as Element).closest(`.${CLASS_NAME}`)

    // skip when this not latest modal
    if (!latest.value) return

    // set activeElement when fired outside this modal
    if (!isModalEvent || (isModalEvent !== modalRef.value)) {
      // skip when modal status is closing
      if (isModalEvent && !isModalEvent.classList.contains(`${CLASS_NAME}-show`)) {
        return
      }
      activeElement = event.target as Element
    }
  }

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

  onMounted(() => {
    document.addEventListener('click', setLastActiveElement)
    watch(() => show.value, (value) => {
      nextTick(() => setFocus(value))
    }, { immediate: show.value })
  })

  onUnmounted(() => {
    document.removeEventListener('click', setLastActiveElement)
  })
}

export const useClose: UseClose = ({ close, closeClickDimmed, closeKeyCode, latest }) => {
  let actionTarget: null|EventTarget = null

  function onMouseDownDimmed (e: MouseEvent) {
    actionTarget = e.target
  }

  function onMouseUpDimmed (e: MouseEvent) {
    if (closeClickDimmed && actionTarget === e.target) {
      close.value()
    }
    actionTarget = null
  }

  function closeKeyEvent (event: KeyboardEvent) {
    if (event.keyCode === closeKeyCode && latest.value) {
      close.value()
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
    onMouseDownDimmed,
    onMouseUpDimmed
  }
}

export const useOrder: UseOrder = ({ modalRef, show }) => {
  const { visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME) as Provide

  const latest = computed(() => {
    const arr = [...visibleModals.value.values()]

    if (!arr.length || !modalRef.value) {
      return false
    }

    return arr[arr.length - 1] === modalRef.value
  })

  watch(() => show.value, () => {
    nextTick(() => {
      if (!modalRef.value) return

      if (show.value) {
        addVisibleModals(modalRef.value)
      } else {
        removeVisibleModals(modalRef.value)
      }
    })
  }, { immediate: true })

  return {
    latest
  }
}
