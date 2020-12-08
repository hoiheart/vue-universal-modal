import { mount } from '@vue/test-utils'
import { JSDOM } from 'jsdom'
import VueUniversalModal from '../src/index'

import { createApp, nextTick } from 'vue'
import { renderToString, SSRContext } from '@vue/server-renderer'

const html = '<div id="modals"></div>'

describe('Unit test', () => {
  it('Install plugin', async () => {
    document.body.innerHTML = html
    const wrapper = mount({
      template: '<Modal>hello</Modal>'
    }, {
      global: {
        plugins: [
          [VueUniversalModal, {
            teleportTarget: '#modals'
          }]
        ]
      }
    })
    const { document: dom } = new JSDOM(document.body.innerHTML).window
    const modalsList = Array.from(dom.querySelectorAll('#modals .vue-universal-modal'))
    expect(modalsList.length).toBe(1)
    expect(modalsList[0].textContent).toBe('hello')
  })

  it('Install plugin with options', async () => {
    document.body.innerHTML = html
    const wrapper = mount({
      template: '<MyModal>hello</MyModal>'
    }, {
      global: {
        plugins: [
          [VueUniversalModal, {
            teleportTarget: '#modals',
            modalComponent: 'MyModal'
          }]
        ]
      }
    })
    const { document: dom } = new JSDOM(document.body.innerHTML).window
    const modalsList = Array.from(dom.querySelectorAll('#modals .vue-universal-modal'))
    expect(modalsList.length).toBe(1)
    expect(modalsList[0].textContent).toBe('hello')
  })

  it('Create SSR Context', async () => {
    const ctx: SSRContext = {}
    const app = createApp({
      template: '<Modal>hello</Modal>'
    })
    app.use(VueUniversalModal, {
      teleportTarget: '#modals'
    })
    const html = await renderToString(app, ctx)
    const { document: dom } = new JSDOM(ctx.teleports?.['#modals']).window
    const modalsList = Array.from(dom.querySelectorAll('.vue-universal-modal'))
    expect(html).toBe('<!--teleport start--><!--teleport end-->')
    expect(ctx.__teleportBuffers?.['#modals'].length).toBe(1)
    expect(modalsList.length).toBe(1)
    expect(modalsList[0].textContent).toBe('hello')
  })
})