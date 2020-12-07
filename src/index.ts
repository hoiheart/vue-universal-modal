import { ref, reactive, readonly } from 'vue'
import Teleport from './Teleport.vue'
import Modal from './Modal.vue'

import type { App, Ref } from 'vue'

interface PluginOptions {
  teleportComponent: string;
  teleportComponentId: string;
  modalComponent: string;
}
interface Provide {
  teleportComponentId: string;
  teleportRef: Ref;
  visibleModals: Ref<number[]>;
  addVisibleModals: (id: number) => void
  removeVisibleModals: (id: number) => void
}

const PLUGIN_NAME = 'VueUniversalModal'
const CLASS_NAME = 'vue-universal-modal'

export default {
  install: (app: App, options = {}) => {
    const {
      teleportComponent = PLUGIN_NAME,
      teleportComponentId = `${CLASS_NAME}-teleport`,
      modalComponent = 'Modal'
    } = options as PluginOptions

    const visibleModals: Ref<number[]> = ref([])
    const addVisibleModals = (id: number) => {
      visibleModals.value = [...visibleModals.value, id]
    }
    const removeVisibleModals = (id: number) => {
      const modals = [...visibleModals.value]
      modals.splice(visibleModals.value.indexOf(id), 1)
      visibleModals.value = [...modals]
    }

    app.provide(PLUGIN_NAME, {
      teleportComponentId,
      teleportRef: ref(),
      visibleModals: readonly(visibleModals),
      addVisibleModals,
      removeVisibleModals
    })

    app.component(teleportComponent, Teleport)
    app.component(modalComponent, Modal)
  }
}

export { PLUGIN_NAME, CLASS_NAME }
export type { PluginOptions, Provide }
