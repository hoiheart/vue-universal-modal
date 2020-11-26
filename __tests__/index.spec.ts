import { mount } from '@vue/test-utils'
import VueUniversalModal from '../src/index'

import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

describe('Unit test', () => {
  it('Install plugin', () => {
    const wrapper = mount({
      template: `
        <VueUniversalModal />
      `
    }, {
      global: {
        plugins: [
          VueUniversalModal
        ]
      }
    })
    expect(wrapper.find('#vue-universal-modal-teleport').exists()).toBe(true)
  })

  it('Install plugin with options', () => {
    const wrapper = mount({
      template: `
        <MyModalTeleport />
      `
    }, {
      global: {
        plugins: [
          [VueUniversalModal, {
            teleportComponent: 'MyModalTeleport',
            teleportComponentId: 'my-modal-teleport',
            modalComponent: 'Modal'
          }]
        ]
      }
    })
    expect(wrapper.find('#my-modal-teleport').exists()).toBe(true)
  })
  // todo: The modal component test
})

describe('Support SSR', () => {
  it('Install plugin', async () => {
    const app = createSSRApp({
      template: `
        <VueUniversalModal />
      `
    })
    app.use(VueUniversalModal)
    const html = await renderToString(app)
    expect(html).toBe('<div id="vue-universal-modal-teleport"></div>')
  })

  it('Install plugin with options', async () => {
    const app = createSSRApp({
      template: `
        <MyModalTeleport />
      `
    })
    app.use(VueUniversalModal, {
      teleportComponent: 'MyModalTeleport',
      teleportComponentId: 'my-modal-teleport',
      modalComponent: 'MyModal'
    })
    const html = await renderToString(app)
    expect(html).toBe('<div id="my-modal-teleport"></div>')
  })
  // todo: The modal component test
})
