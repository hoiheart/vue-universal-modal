import { ref } from 'vue'
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
  isCreatedTeleport: Ref;
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

    app.provide(PLUGIN_NAME, {
      teleportComponentId,
      isCreatedTeleport: ref(false)
    })

    app.component(teleportComponent, Teleport)
    app.component(modalComponent, Modal)
  }
}

export { PLUGIN_NAME, CLASS_NAME }
export type { PluginOptions, Provide }
