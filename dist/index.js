import { defineComponent, inject, openBlock, createBlock, ref, reactive, watch, onMounted, onUnmounted, Teleport, createVNode, Transition, withCtx, withDirectives, withModifiers, renderSlot, vShow, createCommentVNode } from 'vue';

var script = defineComponent({
    setup() {
        const { teleportComponentId, teleportRef } = inject(PLUGIN_NAME);
        return {
            teleportComponentId,
            teleportRef
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    id: _ctx.teleportComponentId,
    ref: "teleportRef"
  }, null, 8 /* PROPS */, ["id"]))
}

script.render = render;
script.__file = "src/Teleport.vue";

var script$1 = defineComponent({
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
        const { teleportRef } = inject(PLUGIN_NAME);
        const modal = ref(null);
        const state = reactive({
            show: !props.disabled,
            closed: props.disabled,
            className: props.class
        });
        watch(() => props.disabled, () => {
            state.show = !props.disabled;
            state.closed = props.disabled;
        });
        const mergeOptions = {
            transition: 300,
            closeClickDimmed: true,
            closeKeyCode: 27,
            styleModal: {},
            styleModalContent: {},
            ...props.options
        };
        const { closeClickDimmed, closeKeyCode } = mergeOptions;
        const transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false;
        function emitClose() {
            state.show = false;
        }
        function onClickDimmed() {
            if (closeClickDimmed) {
                state.show = false;
            }
        }
        function closeKeyEvent(event) {
            const isLastChild = teleportRef.value?.querySelector(`.${CLASS_NAME}:last-child`) === modal.value;
            if (event.keyCode === closeKeyCode && isLastChild) {
                state.show = false;
            }
        }
        function setClose() {
            props.close();
            state.closed = true;
        }
        onMounted(() => {
            if (closeKeyCode) {
                document.addEventListener('keyup', closeKeyEvent);
            }
            // set aria focus
            let activeElement;
            function setAriaFocus(value) {
                if (value) {
                    activeElement = document.activeElement;
                    if (activeElement && modal.value) {
                        modal.value.focus();
                    }
                }
                else {
                    if (activeElement) {
                        activeElement.focus();
                    }
                }
            }
            if (state.show)
                setAriaFocus(state.show);
            watch(() => state.show, (value) => {
                setAriaFocus(value);
            });
        });
        onUnmounted(() => {
            if (closeKeyCode) {
                document.removeEventListener('keyup', closeKeyEvent);
            }
        });
        return {
            CLASS_NAME,
            teleportRef,
            modal,
            state,
            emitClose,
            setClose,
            onClickDimmed,
            mergeOptions,
            transition
        };
    }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.teleportRef)
    ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: _ctx.teleportRef,
        disabled: _ctx.state.closed
      }, [
        createVNode(Transition, {
          name: _ctx.CLASS_NAME,
          appear: "",
          onAfterLeave: _ctx.setClose
        }, {
          default: withCtx(() => [
            withDirectives(createVNode("div", {
              id: _ctx.id,
              ref: "modal",
              class: [
          _ctx.CLASS_NAME,
          { [`${_ctx.CLASS_NAME}-show`]: _ctx.state.show},
          _ctx.state.className
        ],
              style: { transition: _ctx.transition, ..._ctx.mergeOptions.styleModal },
              role: "dialog",
              "aria-modal": "true",
              "aria-label": !_ctx.ariaLabelledby && 'Modal window',
              "aria-labelledby": _ctx.ariaLabelledby,
              tabindex: "-1"
            }, [
              createVNode("div", {
                class: `${_ctx.CLASS_NAME}-content`,
                style: { transition: _ctx.transition, ..._ctx.mergeOptions.styleModalContent },
                onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.onClickDimmed(...args)), ["self"]))
              }, [
                renderSlot(_ctx.$slots, "default", { emitClose: _ctx.emitClose })
              ], 6 /* CLASS, STYLE */)
            ], 14 /* CLASS, STYLE, PROPS */, ["id", "aria-label", "aria-labelledby"]), [
              [vShow, _ctx.state.show]
            ])
          ]),
          _: 3
        }, 8 /* PROPS */, ["name", "onAfterLeave"])
      ], 8 /* PROPS */, ["to", "disabled"]))
    : createCommentVNode("v-if", true)
}

script$1.render = render$1;
script$1.__file = "src/Modal.vue";

const PLUGIN_NAME = 'VueUniversalModal';
const CLASS_NAME = 'vue-universal-modal';
var index = {
    install: (app, options = {}) => {
        const { teleportComponent = PLUGIN_NAME, teleportComponentId = `${CLASS_NAME}-teleport`, modalComponent = 'Modal' } = options;
        app.provide(PLUGIN_NAME, {
            teleportComponentId,
            teleportRef: ref()
        });
        app.component(teleportComponent, script);
        app.component(modalComponent, script$1);
    }
};

export default index;
export { CLASS_NAME, PLUGIN_NAME };
