import { ref, readonly } from 'vue'
import Modal from './Modal.vue'

import type { App, Ref } from 'vue'

interface PluginOptions {
  teleportTarget?: string,
  teleportComponent?: string;
  teleportComponentId?: string;
  modalComponent?: string;
}
interface Provide {
  teleportTarget: string,
  visibleModals: Ref<Set<HTMLElement>>;
  addVisibleModals: (el: HTMLElement) => void
  removeVisibleModals: (el: HTMLElement) => void
}

const PLUGIN_NAME = 'VueUniversalModal'
const CLASS_NAME = 'vue-universal-modal'

const install: (app: App, options: PluginOptions) => void = (app, options = {}) => {
  const {
    teleportTarget = '',
    teleportComponent = '',
    teleportComponentId = '',
    modalComponent = 'Modal'
  } = options as PluginOptions

  if (!teleportTarget) {
    return console.error('teleportTarget is required.')
  }

  if (teleportComponent || teleportComponentId) {
    return console.error('teleportComponent, teleportComponentId was deprecated. use teleportTarget instead. (https://github.com/hoiheart/vue-universal-modal)')
  }

  const visibleModals: Provide['visibleModals'] = ref(new Set())
  const addVisibleModals: Provide['addVisibleModals'] = (el) => {
    visibleModals.value.add(el)
  }
  const removeVisibleModals: Provide['removeVisibleModals'] = (el) => {
    visibleModals.value.delete(el)
  }

  app.provide(PLUGIN_NAME, {
    teleportTarget,
    visibleModals: readonly(visibleModals),
    addVisibleModals,
    removeVisibleModals
  })

  app.component(modalComponent, Modal)
}

export default {
  install
}

export { PLUGIN_NAME, CLASS_NAME }
export type { PluginOptions, Provide }
