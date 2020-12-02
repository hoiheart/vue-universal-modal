(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueUniversalModal = factory(global.Vue));
}(this, (function (vue) { 'use strict';

  var script = vue.defineComponent({
    setup: function setup() {
      var _inject = vue.inject(PLUGIN_NAME),
          teleportComponentId = _inject.teleportComponentId,
          teleportRef = _inject.teleportRef;

      return {
        teleportComponentId: teleportComponentId,
        teleportRef: teleportRef
      };
    }
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock("div", {
      id: _ctx.teleportComponentId,
      ref: "teleportRef"
    }, null, 8
    /* PROPS */
    , ["id"]);
  }

  script.render = render;
  script.__file = "src/Teleport.vue";

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var script$1 = vue.defineComponent({
    props: {
      close: {
        type: Function,
        required: true,
        default: function _default() {
          return undefined;
        }
      },
      options: {
        type: Object,
        default: function _default() {
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
    setup: function setup(props) {
      var _inject = vue.inject(PLUGIN_NAME),
          teleportRef = _inject.teleportRef;

      var modal = vue.ref(null);
      var state = vue.reactive({
        show: !props.disabled,
        closed: props.disabled,
        className: props.class
      });
      vue.watch(function () {
        return props.disabled;
      }, function () {
        state.show = !props.disabled;
        state.closed = props.disabled;
      });

      var mergeOptions = _objectSpread2({
        transition: 300,
        closeClickDimmed: true,
        closeKeyCode: 27,
        styleModal: {},
        styleModalContent: {}
      }, props.options);

      var closeClickDimmed = mergeOptions.closeClickDimmed,
          closeKeyCode = mergeOptions.closeKeyCode;
      var transition = mergeOptions.transition ? mergeOptions.transition / 1000 + 's' : false;

      function emitClose() {
        state.show = false;
      }

      function onClickDimmed() {
        if (closeClickDimmed) {
          state.show = false;
        }
      }

      function closeKeyEvent(event) {
        var _teleportRef$value;

        var isLastChild = ((_teleportRef$value = teleportRef.value) === null || _teleportRef$value === void 0 ? void 0 : _teleportRef$value.querySelector(".".concat(CLASS_NAME, ":last-child"))) === modal.value;

        if (event.keyCode === closeKeyCode && isLastChild) {
          state.show = false;
        }
      }

      function setClose() {
        props.close();
        state.closed = true;
      }

      vue.onMounted(function () {
        if (closeKeyCode) {
          document.addEventListener('keyup', closeKeyEvent);
        } // set aria focus


        var activeElement;

        function setAriaFocus(value) {
          if (value) {
            activeElement = document.activeElement;

            if (activeElement && modal.value) {
              modal.value.focus();
            }
          } else {
            if (activeElement) {
              activeElement.focus();
            }
          }
        }

        if (state.show) setAriaFocus(state.show);
        vue.watch(function () {
          return state.show;
        }, function (value) {
          setAriaFocus(value);
        });
      });
      vue.onUnmounted(function () {
        if (closeKeyCode) {
          document.removeEventListener('keyup', closeKeyEvent);
        }
      });
      return {
        CLASS_NAME: CLASS_NAME,
        teleportRef: teleportRef,
        modal: modal,
        state: state,
        emitClose: emitClose,
        setClose: setClose,
        onClickDimmed: onClickDimmed,
        mergeOptions: mergeOptions,
        transition: transition
      };
    }
  });

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.teleportRef ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
      key: 0,
      to: _ctx.teleportRef,
      disabled: _ctx.state.closed
    }, [vue.createVNode(vue.Transition, {
      name: _ctx.CLASS_NAME,
      appear: "",
      onAfterLeave: _ctx.setClose
    }, {
      default: vue.withCtx(function () {
        return [vue.withDirectives(vue.createVNode("div", {
          id: _ctx.id,
          ref: "modal",
          class: [_ctx.CLASS_NAME, _defineProperty({}, "".concat(_ctx.CLASS_NAME, "-show"), _ctx.state.show), _ctx.state.className],
          style: _objectSpread2({
            transition: _ctx.transition
          }, _ctx.mergeOptions.styleModal),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": !_ctx.ariaLabelledby && 'Modal window',
          "aria-labelledby": _ctx.ariaLabelledby,
          tabindex: "-1"
        }, [vue.createVNode("div", {
          class: "".concat(_ctx.CLASS_NAME, "-content"),
          style: _objectSpread2({
            transition: _ctx.transition
          }, _ctx.mergeOptions.styleModalContent),
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(function () {
            return _ctx.onClickDimmed.apply(_ctx, arguments);
          }, ["self"]))
        }, [vue.renderSlot(_ctx.$slots, "default", {
          emitClose: _ctx.emitClose
        })], 6
        /* CLASS, STYLE */
        )], 14
        /* CLASS, STYLE, PROPS */
        , ["id", "aria-label", "aria-labelledby"]), [[vue.vShow, _ctx.state.show]])];
      }),
      _: 3
    }, 8
    /* PROPS */
    , ["name", "onAfterLeave"])], 8
    /* PROPS */
    , ["to", "disabled"])) : vue.createCommentVNode("v-if", true);
  }

  script$1.render = render$1;
  script$1.__file = "src/Modal.vue";

  var PLUGIN_NAME = 'VueUniversalModal';
  var CLASS_NAME = 'vue-universal-modal';
  var VueUniversalModal = {
    install: function install(app) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$teleportComp = options.teleportComponent,
          teleportComponent = _options$teleportComp === void 0 ? PLUGIN_NAME : _options$teleportComp,
          _options$teleportComp2 = options.teleportComponentId,
          teleportComponentId = _options$teleportComp2 === void 0 ? "".concat(CLASS_NAME, "-teleport") : _options$teleportComp2,
          _options$modalCompone = options.modalComponent,
          modalComponent = _options$modalCompone === void 0 ? 'Modal' : _options$modalCompone;
      app.provide(PLUGIN_NAME, {
        teleportComponentId: teleportComponentId,
        teleportRef: vue.ref()
      });
      app.component(teleportComponent, script);
      app.component(modalComponent, script$1);
    }
  };

  return VueUniversalModal;

})));
