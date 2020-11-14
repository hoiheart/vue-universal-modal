import { mount } from '@vue/test-utils'
import VueUniversalModal from '../src/index'

const TeleportComponent = {
  template: `
    <VueUniversalModal />
  `
}

describe('VueUniversalModal', () => {
  it('Mount teleport DOM', () => {
    // todo: support plugin options test (cannot find use case yet at VTU@2)
    const wrapper = mount(TeleportComponent, {
      global: {
        plugins: [VueUniversalModal]
      }
    })
    expect(wrapper.find('#modals')).toBeTruthy()
  })
})
