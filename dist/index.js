import { inject, getCurrentInstance, computed, watch, onMounted, onUnmounted, nextTick, defineComponent, toRefs, ref, openBlock, createBlock, Teleport, createVNode, Transition, mergeProps, toHandlers, withCtx, withDirectives, withModifiers, renderSlot, vShow, createCommentVNode, readonly } from 'vue';

const useOrder = ({ modelValue, show }) => {
    const { visibleModals, addVisibleModals, removeVisibleModals } = inject(PLUGIN_NAME);
    const { uid } = getCurrentInstance() || {};
    const latest = computed(() => {
        if (!uid || !visibleModals.value.length)
            return false;
        return uid === visibleModals.value[visibleModals.value.length - 1];
    });
    watch([
        () => modelValue.value,
        () => show.value
    ], () => {
        if (!uid) {
            return;
        }
        const isShow = modelValue.value && show.value;
        if (isShow && visibleModals.value.indexOf(uid) < 0) {
            addVisibleModals(uid);
        }
        if (!isShow && visibleModals.value.indexOf(uid) > -1) {
            removeVisibleModals(uid);
        }
    }, { immediate: true });
    return {
        latest
    };
};
const useClose = ({ close, options, latest }) => {
    const mergeOptions = {
        transition: 300,
        closeClickDimmed: true,
        closeKeyCode: 27,
        styleModalContent: {},
        ...options.value
    };
    function onClickDimmed() {
        if (mergeOptions.closeClickDimmed) {
            close.value();
        }
    }
    function closeKeyEvent(event) {
        if (event.keyCode === mergeOptions.closeKeyCode && latest.value) {
            close.value();
        }
    }
    onMounted(() => {
        if (mergeOptions.closeKeyCode) {
            document.addEventListener('keyup', closeKeyEvent);
        }
    });
    onUnmounted(() => {
        if (mergeOptions.closeKeyCode) {
            document.removeEventListener('keyup', closeKeyEvent);
        }
    });
    return {
        mergeOptions,
        onClickDimmed
    };
};
const useA11Y = ({ modalRef, latest, show }) => {
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
            nextTick(() => setFocus(value));
        }, { immediate: show.value });
    });
    onUnmounted(() => {
        document.removeEventListener('click', setLastActiveElement);
    });
};

var script = defineComponent({
    inheritAttrs: false,
    props: {
        close: {
            type: Function,
            default: () => {
                return undefined;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: true
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    emits: [
        'before-enter',
        'enter',
        'after-enter',
        'enter-cancelled',
        'before-leave',
        'leave',
        'after-leave',
        'leave-cancelled'
    ],
    setup(props, context) {
        const { teleportTarget } = inject(PLUGIN_NAME);
        const { close, disabled, options, modelValue } = toRefs(props);
        const inserted = ref(modelValue.value === undefined ? true : modelValue.value);
        const modalRef = ref(null);
        const show = ref(!disabled.value);
        watch([
            () => modelValue.value,
            () => disabled.value
        ], () => {
            const isShow = modelValue.value && !disabled.value;
            show.value = isShow;
            if (modelValue.value) {
                inserted.value = modelValue.value;
            }
        }, { immediate: true });
        const { latest } = useOrder({ modelValue, show });
        const { mergeOptions, onClickDimmed } = useClose({ close, latest, options });
        useA11Y({ latest, modalRef, show });
        const onTransitionEmit = {
            beforeEnter: () => context.emit('before-enter'),
            enter: () => context.emit('enter'),
            afterEnter: () => context.emit('after-enter'),
            enterCancelled: () => context.emit('enter-cancelled'),
            beforeLeave: () => context.emit('before-leave'),
            leave: () => context.emit('leave'),
            afterLeave: () => {
                context.emit('after-leave');
                if (modelValue.value === false) {
                    inserted.value = false;
                }
            },
            leaveCancelled: () => context.emit('leave-cancelled')
        };
        /**
         * @deprecated
         */
        const emitClose = () => {
            console.warn('emitClose was deprecated.\nhttps://github.com/hoiheart/vue-universal-modal#usage-modal');
            close.value();
        };
        return {
            CLASS_NAME,
            emitClose,
            inserted,
            latest,
            mergeOptions,
            modalRef,
            onClickDimmed,
            onTransitionEmit,
            show,
            teleportTarget,
            transition: mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.inserted)
    ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: _ctx.teleportTarget,
        disabled: _ctx.disabled
      }, [
        createVNode(Transition, mergeProps({
          appear: "",
          name: _ctx.CLASS_NAME
        }, toHandlers(_ctx.onTransitionEmit)), {
          default: withCtx(() => [
            withDirectives(createVNode("div", mergeProps({
              ref: "modalRef",
              role: "dialog",
              tabindex: "-1",
              "aria-modal": "true",
              "aria-label": "Modal window",
              class: [
          _ctx.CLASS_NAME,
          { [`${_ctx.CLASS_NAME}-show`]: _ctx.show },
          { [`${_ctx.CLASS_NAME}-latest`]: _ctx.latest },
        ],
              style: { transitionDuration: _ctx.transition }
            }, _ctx.$attrs), [
              createVNode("div", {
                class: `${_ctx.CLASS_NAME}-content`,
                style: {
            transitionDuration: _ctx.transition,
            ..._ctx.mergeOptions?.styleModalContent
          },
                onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.onClickDimmed && _ctx.onClickDimmed(...args)), ["self"]))
              }, [
                renderSlot(_ctx.$slots, "default", { emitClose: _ctx.emitClose }),
                renderSlot(_ctx.$slots, "close")
              ], 6 /* CLASS, STYLE */)
            ], 16 /* FULL_PROPS */), [
              [vShow, _ctx.show]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 16 /* FULL_PROPS */, ["name"])
      ], 8 /* PROPS */, ["to", "disabled"]))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/Modal.vue";

const PLUGIN_NAME = 'VueUniversalModal';
const CLASS_NAME = 'vue-universal-modal';
const install = (app, options = {}) => {
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
};
var index = {
    install
};

export default index;
export { CLASS_NAME, PLUGIN_NAME };
