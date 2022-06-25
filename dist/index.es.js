import { onMounted as e, watch as t, nextTick as o, onUnmounted as l, inject as n, computed as a, defineComponent as s, toRefs as i, ref as r, openBlock as u, createBlock as d, Teleport as c, createVNode as v, Transition as m, mergeProps as f, toHandlers as p, withCtx as M, withDirectives as b, createElementVNode as C, normalizeClass as w, normalizeStyle as g, withModifiers as y, renderSlot as D, vShow as h, createCommentVNode as E, readonly as k } from "vue";
const A = ({ modalRef: n2, latest: a2, show: s2 }) => {
  let i2;
  function r2(e2) {
    const t2 = e2.target.closest(`.${R}`);
    if (!a2.value)
      return;
    if (!t2 || t2 !== n2.value) {
      if (t2 && !t2.classList.contains(`${R}-show`))
        return;
      i2 = e2.target;
    }
  }
  function u2(e2) {
    if (e2) {
      if (n2.value)
        n2.value.focus();
    } else if (i2)
      i2.focus();
  }
  e(() => {
    document.addEventListener("click", r2);
    t(() => s2.value, (e2) => {
      o(() => u2(e2));
    }, { immediate: s2.value });
  });
  l(() => {
    document.removeEventListener("click", r2);
  });
};
const L = ({ close: t2, closeClickDimmed: o2, closeKeyCode: n2, latest: a2 }) => {
  let s2 = null;
  function i2(e2) {
    s2 = e2.target;
  }
  function r2(e2) {
    if (o2 && s2 === e2.target)
      t2.value();
    s2 = null;
  }
  function u2(e2) {
    if (e2.keyCode === n2 && a2.value)
      t2.value();
  }
  e(() => {
    if (n2)
      document.addEventListener("keyup", u2);
  });
  l(() => {
    if (n2)
      document.removeEventListener("keyup", u2);
  });
  return { onMouseDownDimmed: i2, onMouseUpDimmed: r2 };
};
const S = ({ modalRef: e2, show: l2 }) => {
  const { visibleModals: s2, addVisibleModals: i2, removeVisibleModals: r2 } = n(N);
  const u2 = a(() => {
    const t2 = [...s2.value.values()];
    if (!t2.length || !e2.value)
      return false;
    return t2[t2.length - 1] === e2.value;
  });
  t(() => l2.value, () => {
    o(() => {
      if (!e2.value)
        return;
      if (l2.value)
        i2(e2.value);
      else
        r2(e2.value);
    });
  }, { immediate: true });
  return { latest: u2 };
};
var _ = (() => ".vue-universal-modal-leave-from,.vue-universal-modal-enter-to{opacity:1}.vue-universal-modal-enter-from,.vue-universal-modal-leave-to{opacity:0}.vue-universal-modal{-webkit-overflow-scrolling:touch;overscroll-behavior:contain;position:fixed;overflow-y:auto;left:0;top:0;right:0;bottom:0;background-color:#000c;text-align:left}.vue-universal-modal:not(.vue-universal-modal-latest){background:none}.vue-universal-modal-content{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;min-height:100%}\n")();
var $ = (e2, t2) => {
  const o2 = e2.__vccOpts || e2;
  for (const [e3, l2] of t2)
    o2[e3] = l2;
  return o2;
};
const T = s({ inheritAttrs: false, props: { close: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, modelValue: { type: Boolean, default: true }, options: { type: Object, default: () => ({}) } }, emits: ["before-enter", "enter", "after-enter", "enter-cancelled", "before-leave", "leave", "after-leave", "leave-cancelled"], setup(e2, o2) {
  const { teleportTarget: l2 } = n(N);
  const { close: a2, disabled: s2, options: u2, modelValue: d2 } = i(e2);
  const c2 = r(d2.value === void 0 ? true : d2.value);
  const v2 = r(null);
  const m2 = r(!s2.value);
  const f2 = { transition: 300, closeClickDimmed: true, closeKeyCode: 27, styleModalContent: {}, ...u2.value };
  t([() => d2.value, () => s2.value], () => {
    const e3 = d2.value && !s2.value;
    m2.value = e3;
    if (d2.value)
      c2.value = d2.value;
  }, { immediate: true });
  const { latest: p2 } = S({ modalRef: v2, show: m2 });
  A({ latest: p2, modalRef: v2, show: m2 });
  const { onMouseDownDimmed: M2, onMouseUpDimmed: b2 } = L({ close: a2, closeClickDimmed: f2.closeClickDimmed, closeKeyCode: f2.closeKeyCode, latest: p2 });
  const C2 = { beforeEnter: () => o2.emit("before-enter"), enter: () => o2.emit("enter"), afterEnter: () => o2.emit("after-enter"), enterCancelled: () => o2.emit("enter-cancelled"), beforeLeave: () => o2.emit("before-leave"), leave: () => o2.emit("leave"), afterLeave: () => {
    o2.emit("after-leave");
    if (d2.value === false)
      c2.value = false;
  }, leaveCancelled: () => o2.emit("leave-cancelled") };
  const w2 = () => {
    if (a2.value)
      a2.value();
  };
  return { CLASS_NAME: R, emitClose: w2, inserted: c2, latest: p2, mergeOptions: f2, modalRef: v2, onMouseDownDimmed: M2, onMouseUpDimmed: b2, onTransitionEmit: C2, show: m2, teleportTarget: l2, transition: f2.transition ? f2.transition / 1e3 + "s" : void 0 };
} });
function V(e2, t2, o2, l2, n2, a2) {
  return e2.inserted ? (u(), d(c, { key: 0, to: e2.teleportTarget, disabled: e2.disabled }, [v(m, f({ appear: "", name: e2.CLASS_NAME }, p(e2.onTransitionEmit)), { default: M(() => {
    var _a;
    return [b(C("div", f({ ref: "modalRef", role: "dialog", tabindex: "-1", "aria-modal": "true", "aria-label": "Modal window", class: [e2.CLASS_NAME, { [`${e2.CLASS_NAME}-show`]: e2.show }, { [`${e2.CLASS_NAME}-latest`]: e2.latest }], style: { transitionDuration: e2.transition } }, e2.$attrs), [C("div", { class: w(`${e2.CLASS_NAME}-content`), style: g({ transitionDuration: e2.transition, ...(_a = e2.mergeOptions) == null ? void 0 : _a.styleModalContent }), onMousedown: t2[0] || (t2[0] = y((...t3) => e2.onMouseDownDimmed && e2.onMouseDownDimmed(...t3), ["self"])), onMouseup: t2[1] || (t2[1] = (...t3) => e2.onMouseUpDimmed && e2.onMouseUpDimmed(...t3)) }, [D(e2.$slots, "default", { emitClose: e2.emitClose }), D(e2.$slots, "close")], 38)], 16), [[h, e2.show]])];
  }), _: 3 }, 16, ["name"])], 8, ["to", "disabled"])) : E("", true);
}
var x = $(T, [["render", V]]);
const N = "VueUniversalModal";
const R = "vue-universal-modal";
const U = (e2, t2 = {}) => {
  const { teleportTarget: o2 = "", teleportComponent: l2 = "", teleportComponentId: n2 = "", modalComponent: a2 = "Modal" } = t2;
  if (!o2)
    return;
  if (l2 || n2)
    return;
  const s2 = r(/* @__PURE__ */ new Set());
  const i2 = (e3) => {
    s2.value.add(e3);
  };
  const u2 = (e3) => {
    s2.value.delete(e3);
  };
  e2.provide(N, { teleportTarget: o2, visibleModals: k(s2), addVisibleModals: i2, removeVisibleModals: u2 });
  e2.component(a2, x);
};
var K = { install: U };
export { R as CLASS_NAME, N as PLUGIN_NAME, K as default };
