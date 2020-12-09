import { defineComponent, inject, getCurrentInstance, ref, computed, watch, onMounted, onUnmounted, openBlock, createBlock, Teleport, createVNode, Transition, withCtx, withDirectives, withModifiers, renderSlot, vShow, readonly } from 'vue';

var script = defineComponent({
    props: {
        close: {
            type: Function,
            required: true,
            default: () => {
                return undefined;
            }
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: ''
        },
        class: {
            type: String,
            default: ''
        },
        ariaLabelledby: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { teleportTarget, visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME);
        const { uid } = getCurrentInstance() || {};
        const modalRef = ref();
        const show = ref();
        const latest = computed(() => {
            if (!uid || !visibleModals.value.length)
                return false;
            return uid === visibleModals.value[visibleModals.value.length - 1];
        });
        watch(() => props.disabled, () => {
            show.value = !props.disabled;
        }, { immediate: true });
        watch(() => show.value, (value) => {
            if (!uid)
                return;
            if (value && visibleModals.value.indexOf(uid) < 0) {
                addVisibleModals(uid);
            }
            if (!value && visibleModals.value.indexOf(uid) > -1) {
                removeVisibleModals(uid);
            }
        }, { immediate: true });
        const mergeOptions = {
            transition: 300,
            closeClickDimmed: true,
            closeKeyCode: 27,
            styleModal: {},
            styleModalContent: {},
            ...props.options
        };
        const transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false;
        function emitClose() {
            show.value = false;
        }
        function onClickDimmed() {
            if (mergeOptions.closeClickDimmed) {
                emitClose();
            }
        }
        function closeKeyEvent(event) {
            if (event.keyCode === mergeOptions.closeKeyCode && latest.value) {
                emitClose();
            }
        }
        // wai-aria
        let activeElement;
        function setLastActiveElement(event) {
            const isModalEvent = event.target.closest(`.${CLASS_NAME}`);
            // skip when this not latest modal
            if (!latest.value)
                return;
            // set activeElement when fired outside this modal
            if (!isModalEvent || (isModalEvent !== modalRef.value)) {
                // skip when modal status is closing
                if (isModalEvent && !isModalEvent.classList.contains(`${CLASS_NAME}-show`))
                    return;
                activeElement = event.target;
            }
        }
        onMounted(() => {
            if (mergeOptions.closeKeyCode) {
                document.addEventListener('keyup', closeKeyEvent);
            }
            // wai-aria
            document.addEventListener('click', setLastActiveElement);
            function setFocus(value) {
                if (value) {
                    if (modalRef.value) {
                        modalRef.value.focus();
                    }
                }
                else {
                    if (activeElement) {
                        activeElement.focus();
                    }
                }
            }
            watch(() => show.value, (value) => {
                setFocus(value);
            }, { immediate: show.value });
        });
        onUnmounted(() => {
            if (mergeOptions.closeKeyCode) {
                document.removeEventListener('keyup', closeKeyEvent);
            }
            // wai-aria
            document.removeEventListener('click', setLastActiveElement);
        });
        return {
            CLASS_NAME,
            teleportTarget,
            modalRef,
            show,
            latest,
            emitClose,
            onClickDimmed,
            mergeOptions,
            transition,
            className: props.class
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Teleport, {
    to: _ctx.teleportTarget,
    disabled: _ctx.disabled
  }, [
    createVNode(Transition, {
      name: _ctx.CLASS_NAME,
      appear: "",
      onAfterLeave: _cache[2] || (_cache[2] = () => _ctx.close())
    }, {
      default: withCtx(() => [
        withDirectives(createVNode("div", {
          id: _ctx.id,
          ref: "modalRef",
          class: [
          _ctx.CLASS_NAME,
          _ctx.className,
          { [`${_ctx.CLASS_NAME}-show`]: _ctx.show },
          { [`${_ctx.CLASS_NAME}-latest`]: _ctx.latest },
        ],
          style: {
          transitionDuration: _ctx.transition,
          ..._ctx.mergeOptions.styleModal
        },
          role: "dialog",
          "aria-modal": "true",
          "aria-label": !_ctx.ariaLabelledby && 'Modal window',
          "aria-labelledby": _ctx.ariaLabelledby,
          tabindex: "-1"
        }, [
          createVNode("div", {
            class: `${_ctx.CLASS_NAME}-content`,
            style: {
            transitionDuration: _ctx.transition,
            ..._ctx.mergeOptions.styleModalContent
          },
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.onClickDimmed && _ctx.onClickDimmed(...args)), ["self"]))
          }, [
            renderSlot(_ctx.$slots, "default", { emitClose: _ctx.emitClose })
          ], 6 /* CLASS, STYLE */)
        ], 14 /* CLASS, STYLE, PROPS */, ["id", "aria-label", "aria-labelledby"]), [
          [vShow, _ctx.show]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["name"])
  ], 8 /* PROPS */, ["to", "disabled"]))
}

script.render = render;
script.__file = "src/Modal.vue";

const PLUGIN_NAME = 'VueUniversalModal';
const CLASS_NAME = 'vue-universal-modal';
var index = {
    install: (app, options = {}) => {
        const { teleportTarget = '', teleportComponent = '', teleportComponentId = '', modalComponent = 'Modal' } = options;
        if (!teleportTarget) {
            return console.error('teleportTarget is required.');
        }
        if (teleportComponent || teleportComponentId) {
            return console.error('teleportComponent, teleportComponentId was deprecated. use teleportTarget instead. (https://github.com/hoiheart/vue-universal-modal)');
        }
        const visibleModals = ref([]);
        const addVisibleModals = (id) => {
            visibleModals.value = [...visibleModals.value, id];
        };
        const removeVisibleModals = (id) => {
            const modals = [...visibleModals.value];
            modals.splice(visibleModals.value.indexOf(id), 1);
            visibleModals.value = [...modals];
        };
        app.provide(PLUGIN_NAME, {
            teleportTarget,
            visibleModals: readonly(visibleModals),
            addVisibleModals,
            removeVisibleModals
        });
        app.component(modalComponent, script);
    }
};

export default index;
export { CLASS_NAME, PLUGIN_NAME };
