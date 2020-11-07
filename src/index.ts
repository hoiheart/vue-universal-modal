import type { App } from 'vue'
import { ref } from 'vue'
import Teleport from './Teleport.vue'
import Modal from './Modal.vue'

interface PluginOptions {
  teleportComponent: string;
  teleportComponentId: string;
  modalComponent: string;
  isCreatedTeleport: boolean;
}

const PLUGIN_NAME = 'VueUniversalModal'

export default {
  install: (app: App, {
    teleportComponent = PLUGIN_NAME,
    teleportComponentId = 'modals',
    modalComponent = 'modal'
  }: PluginOptions) => {
    app.provide(PLUGIN_NAME, {
      teleportComponentId,
      isCreatedTeleport: ref(false)
    })

    app.component(teleportComponent, Teleport)
    app.component(modalComponent, Modal)
  }
}

export { PluginOptions, PLUGIN_NAME }
