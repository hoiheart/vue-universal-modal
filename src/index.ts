import type { App, Ref } from 'vue'
import { ref } from 'vue'
import Teleport from './Teleport.vue'
import Modal from './Modal.vue'

interface PluginOptions {
  teleportComponent: string;
  teleportComponentId: string;
  modalComponent: string;
}

interface Provide {
  teleportComponentId: string;
  isCreatedTeleport: Ref;
}

const PLUGIN_NAME = 'VueUniversalModal'

export default {
  install: (app: App, options = {}) => {
    const {
      teleportComponent = PLUGIN_NAME,
      teleportComponentId = 'modals',
      modalComponent = 'Modal'
    } = options as PluginOptions

    app.provide(PLUGIN_NAME, {
      teleportComponentId,
      isCreatedTeleport: ref(false)
    })

    app.component(teleportComponent, Teleport)
    app.component(modalComponent, Modal)
  }
}

export { PluginOptions, Provide, PLUGIN_NAME }
