import { createApp } from 'vue'
import App from './App.vue'
import VueUniversalModal from './VueUniversalModal'

const app = createApp(App)
app.use(VueUniversalModal, {
  teleportComponent: 'VueUniversalModal',
  modalComponent: 'Modal'
})
app.mount('#app')
