import { mount } from '@vue/test-utils'
import VueUniversalModal from '../src/index'

import { createSSRApp, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'

describe('Unit test', () => {
  it('Install plugin', async () => {
    const wrapper = mount({
      template: `
        <Modal>hello</Modal>
        <VueUniversalModal />
      `
    }, {
      global: {
        plugins: [
          VueUniversalModal
        ]
      }
    })
    await nextTick()
    expect(wrapper.find('#vue-universal-modal-teleport').exists()).toBe(true)
    expect(wrapper.find('#vue-universal-modal-teleport .vue-universal-modal-content').html()).toContain('hello')
  })

  it('Install plugin with options', async () => {
    const wrapper = mount({
      template: `
        <MyModal>hello</MyModal>
        <MyModalTeleport />
      `
    }, {
      global: {
        plugins: [
          [VueUniversalModal, {
            teleportComponent: 'MyModalTeleport',
            teleportComponentId: 'my-modal-teleport',
            modalComponent: 'MyModal'
          }]
        ]
      }
    })
    await nextTick()
    console.log(wrapper.html())
    expect(wrapper.find('#my-modal-teleport').exists()).toBe(true)
    expect(wrapper.find('#my-modal-teleport .vue-universal-modal-content').html()).toContain('hello')
  })
  // todo: more test case
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
  // todo: The modal component test case
  // it('Install plugin', async () => {
  //   const ctx: SSRContext = {}
  //   const html = await renderToString(
  //     createApp({
  //       setup() {
  //         const svg = ref()
  //         const circle = ref()
  
  //         return {
  //           svg,
  //           circle
  //         }
  //       },
  //       template: `
  //         <svg ref="svg"></svg>
  //         <teleport :to="svg" v-if="svg">
  //           <circle ref="circle"></circle>
  //         </teleport>
  //       `
  //     }),
  //     ctx
  //   )
  //   console.log(html)
  //   console.log(ctx)
  // })
})
