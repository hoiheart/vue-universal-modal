import { mount } from '@vue/test-utils';
import { createApp, ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import VueUniversalModal from '../src/index';
import { renderToString, SSRContext } from '@vue/server-renderer';

const html = '<div id="modals"></div>';

describe('Unit test', () => {
  it('Install plugin', async () => {
    document.body.innerHTML = html;
    const wrapper = mount(
      {
        template: '<Modal>hello</Modal>',
      },
      {
        global: {
          plugins: [
            [
              VueUniversalModal,
              {
                teleportTarget: '#modals',
              },
            ],
          ],
        },
      },
    );
    const { document: dom } = new JSDOM(document.body.innerHTML).window;
    const modalsList = Array.from(
      dom.querySelectorAll('#modals .vue-universal-modal'),
    );
    expect(modalsList.length).toBe(1);
    expect(modalsList[0].textContent).toBe('hello');
  });

  it('Install plugin with options', async () => {
    document.body.innerHTML = html;
    const wrapper = mount(
      {
        template: '<MyModal>hello</MyModal>',
      },
      {
        global: {
          plugins: [
            [
              VueUniversalModal,
              {
                teleportTarget: '#modals',
                modalComponent: 'MyModal',
              },
            ],
          ],
        },
      },
    );
    const { document: dom } = new JSDOM(document.body.innerHTML).window;
    const modalsList = Array.from(
      dom.querySelectorAll('#modals .vue-universal-modal'),
    );
    expect(modalsList.length).toBe(1);
    expect(modalsList[0].textContent).toBe('hello');
  });

  it('Set modal props', async () => {
    document.body.innerHTML = html;
    const wrapper = mount(
      {
        setup() {
          const close = ref(false);
          const disabled = ref(true);
          const options = {
            transition: false,
            closeClickDimmed: false,
            closeKeyCode: false,
            styleModalContent: { justifyContent: 'flex-start' },
          };
          return {
            close,
            disabled,
            options,
          };
        },
        template: `
        <Modal
          id="modal"
          class="modal"
          aria-labelledby="title"
          :close="() => close = true"
          :disabled="disabled"
          :options="options"
        >
          <h2 id="title">title</h2>
          <span class="close-status">{{ close }}</span>
          <button class="close" @click="() => close = true">close</button>
        </Modal>
      `,
      },
      {
        global: {
          plugins: [
            [
              VueUniversalModal,
              {
                teleportTarget: '#modals',
              },
            ],
          ],
        },
      },
    );

    // Test in disabled props for use VTU methods
    const modal = wrapper.find('#modal.modal');
    expect(modal).toBeTruthy();
    expect(modal.attributes('aria-labelledby')).toBe('title');
    expect((modal.element as HTMLElement).style.transitionDuration).toBeFalsy();
    expect(
      (modal.find('.vue-universal-modal-content').element as HTMLElement).style
        .justifyContent,
    ).toBe('flex-start');
    await wrapper.find('.close').trigger('click');
    expect(modal.find('.close-status').text()).toBe('true');
  });

  it('Create SSR Context', async () => {
    const ctx: SSRContext = {};
    const app = createApp({
      template: '<Modal>hello</Modal>',
    });
    app.use(VueUniversalModal, {
      teleportTarget: '#modals',
    });
    const html = await renderToString(app, ctx);
    const { document: dom } = new JSDOM(ctx.teleports?.['#modals']).window;
    const modalsList = Array.from(dom.querySelectorAll('.vue-universal-modal'));
    expect(html).toBe('<!--teleport start--><!--teleport end-->');
    expect(ctx.__teleportBuffers?.['#modals'].length).toBe(1);
    expect(modalsList.length).toBe(1);
    expect(modalsList[0].textContent).toBe('hello');
  });
});
