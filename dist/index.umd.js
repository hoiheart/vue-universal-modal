(function(d,o){typeof exports=="object"&&typeof module!="undefined"?o(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],o):(d=typeof globalThis!="undefined"?globalThis:d||self,o(d["vue-universal-modal"]={},d.Vue))})(this,function(d,o){"use strict";const M=({modalRef:e,latest:n,show:l})=>{let s;function a(t){const i=t.target.closest(`.${f}`);if(!!n.value&&(!i||i!==e.value)){if(i&&!i.classList.contains(`${f}-show`))return;s=t.target}}function u(t){t?e.value&&e.value.focus():s&&s.focus()}o.onMounted(()=>{document.addEventListener("click",a),o.watch(()=>l.value,t=>{o.nextTick(()=>u(t))},{immediate:l.value})}),o.onUnmounted(()=>{document.removeEventListener("click",a)})},b=({close:e,closeClickDimmed:n,closeKeyCode:l,latest:s})=>{let a=null;function u(r){a=r.target}function t(r){n&&a===r.target&&e.value(),a=null}function i(r){r.keyCode===l&&s.value&&e.value()}return o.onMounted(()=>{l&&document.addEventListener("keyup",i)}),o.onUnmounted(()=>{l&&document.removeEventListener("keyup",i)}),{onMouseDownDimmed:u,onMouseUpDimmed:t}},C=({modalRef:e,show:n})=>{const{visibleModals:l,addVisibleModals:s,removeVisibleModals:a}=o.inject(v),u=o.computed(()=>{const t=[...l.value.values()];return!t.length||!e.value?!1:t[t.length-1]===e.value});return o.watch(()=>n.value,()=>{o.nextTick(()=>{!e.value||(n.value?s(e.value):a(e.value))})},{immediate:!0}),{latest:u}};var A=(()=>`.vue-universal-modal-leave-from,.vue-universal-modal-enter-to{opacity:1}.vue-universal-modal-enter-from,.vue-universal-modal-leave-to{opacity:0}.vue-universal-modal{-webkit-overflow-scrolling:touch;overscroll-behavior:contain;position:fixed;overflow-y:auto;left:0;top:0;right:0;bottom:0;background-color:#000c;text-align:left}.vue-universal-modal:not(.vue-universal-modal-latest){background:none}.vue-universal-modal-content{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;min-height:100%}
`)(),h=(e,n)=>{const l=e.__vccOpts||e;for(const[s,a]of n)l[s]=a;return l};const w=o.defineComponent({inheritAttrs:!1,props:{close:{type:Function,default:()=>{}},disabled:{type:Boolean,default:!1},modelValue:{type:Boolean,default:!0},options:{type:Object,default:()=>({})}},emits:["before-enter","enter","after-enter","enter-cancelled","before-leave","leave","after-leave","leave-cancelled"],setup(e,n){const{teleportTarget:l}=o.inject(v),{close:s,disabled:a,options:u,modelValue:t}=o.toRefs(e),i=o.ref(t.value===void 0?!0:t.value),r=o.ref(null),c=o.ref(!a.value),m={transition:300,closeClickDimmed:!0,closeKeyCode:27,styleModalContent:{},...u.value};o.watch([()=>t.value,()=>a.value],()=>{const k=t.value&&!a.value;c.value=k,t.value&&(i.value=t.value)},{immediate:!0});const{latest:p}=C({modalRef:r,show:c});M({latest:p,modalRef:r,show:c});const{onMouseDownDimmed:S,onMouseUpDimmed:E}=b({close:s,closeClickDimmed:m.closeClickDimmed,closeKeyCode:m.closeKeyCode,latest:p});return{CLASS_NAME:f,emitClose:()=>{s.value&&s.value()},inserted:i,latest:p,mergeOptions:m,modalRef:r,onMouseDownDimmed:S,onMouseUpDimmed:E,onTransitionEmit:{beforeEnter:()=>n.emit("before-enter"),enter:()=>n.emit("enter"),afterEnter:()=>n.emit("after-enter"),enterCancelled:()=>n.emit("enter-cancelled"),beforeLeave:()=>n.emit("before-leave"),leave:()=>n.emit("leave"),afterLeave:()=>{n.emit("after-leave"),t.value===!1&&(i.value=!1)},leaveCancelled:()=>n.emit("leave-cancelled")},show:c,teleportTarget:l,transition:m.transition?m.transition/1e3+"s":void 0}}});function y(e,n,l,s,a,u){return e.inserted?(o.openBlock(),o.createBlock(o.Teleport,{key:0,to:e.teleportTarget,disabled:e.disabled},[o.createVNode(o.Transition,o.mergeProps({appear:"",name:e.CLASS_NAME},o.toHandlers(e.onTransitionEmit)),{default:o.withCtx(()=>{var t;return[o.withDirectives(o.createElementVNode("div",o.mergeProps({ref:"modalRef",role:"dialog",tabindex:"-1","aria-modal":"true","aria-label":"Modal window",class:[e.CLASS_NAME,{[`${e.CLASS_NAME}-show`]:e.show},{[`${e.CLASS_NAME}-latest`]:e.latest}],style:{transitionDuration:e.transition}},e.$attrs),[o.createElementVNode("div",{class:o.normalizeClass(`${e.CLASS_NAME}-content`),style:o.normalizeStyle({transitionDuration:e.transition,...(t=e.mergeOptions)==null?void 0:t.styleModalContent}),onMousedown:n[0]||(n[0]=o.withModifiers((...i)=>e.onMouseDownDimmed&&e.onMouseDownDimmed(...i),["self"])),onMouseup:n[1]||(n[1]=(...i)=>e.onMouseUpDimmed&&e.onMouseUpDimmed(...i))},[o.renderSlot(e.$slots,"default",{emitClose:e.emitClose}),o.renderSlot(e.$slots,"close")],38)],16),[[o.vShow,e.show]])]}),_:3},16,["name"])],8,["to","disabled"])):o.createCommentVNode("",!0)}var g=h(w,[["render",y]]);const v="VueUniversalModal",f="vue-universal-modal";var D={install:(e,n={})=>{const{teleportTarget:l="",teleportComponent:s="",teleportComponentId:a="",modalComponent:u="Modal"}=n;if(!l||s||a)return;const t=o.ref(new Set),i=c=>{t.value.add(c)},r=c=>{t.value.delete(c)};e.provide(v,{teleportTarget:l,visibleModals:o.readonly(t),addVisibleModals:i,removeVisibleModals:r}),e.component(u,g)}};d.CLASS_NAME=f,d.PLUGIN_NAME=v,d.default=D,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});