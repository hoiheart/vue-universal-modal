import type { App } from 'vue'
import { ref } from 'vue'
import teleport from './components/index.vue'
import modal from './components/modal.vue'

interface Options {
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
  }: Options) => {
    app.provide(PLUGIN_NAME, {
      teleportComponentId,
      isCreatedTeleport: ref(false)
    })

    app.component(teleportComponent, teleport)
    app.component(modalComponent, modal)
  }
}

export { Options, PLUGIN_NAME }
