# vue-universal-modal

## ⚠️⚠️⚠️ **This plug-in is not yet complete and cannot be used as a product.** ⚠️⚠️⚠️

Universal modal plugin for Vue@3

> ⚠️ This plugin does not support Vue@2

## Table of Contents

- [Introduction](#introduction)
- [Install plugin](#install-plugin)
  * [Options](#options)
- [Teleport component](#teleport-component)
- [Usage modal](#usage-modal)
  * [props](#props)
    + [props.options](#propsoptions)
  * [slot arguments](#slot-arguments)
- [Handle global CSS](#handle-global-css)
- [Demo](#demo)
- [Todo](#todo)


## Introduction

`vue-universal-modal` plugin is based on the <a href="https://v3.vuejs.org/guide/teleport.html#teleport" target="_blank">teleport</a>.  
It is very light and simple, but it provides essential features for modal use in applications.  
(Such as Add & Remove, Visible & Hidden, Transition, Auto bind keyboard and mouse to close, Support SSR, A11Y...)

## Install plugin

```bash
npm install vue-universal-modal
```

And install this plugin in vue application

```ts
import VueUniversalModal from 'vue-universal-modal'
// import VueUniversalModal from 'vue-universal-modal/dist/index.es5' // If need to use es5 build
import 'vue-universal-modal/dist/index.css'

app.use(VueUniversalModal)
```

### Options

```ts
app.use(VueUniversalModal, {
  teleportComponent: 'MyModalTeleport',
  teleportComponentId: 'my-modal-teleport',
  modalComponent: 'MyModal',
})
```

| name | type | detault | description |
|- | - | - | - |
| teleportComponent | `string` | `'VueUniversalModal'` | Global teleport component name |
| teleportComponentId | `string` | `'vue-universal-modal-teleport'` | Global teleport component id |
| modalComponent | `string` | `'Modal'` | Global modal component name |

## Teleport component

Insert the teleport component into the root component.

```vue
<template>
  <Main />
  <VueUniversalModal />
  <!-- If the option changed teleport component the name
  <MyModalTeleport />
  -->
</template>
```

## Usage modal

Insert the component wrapped with the modal component. (Slot based)

```vue
<template>
  <Modal>
  <!-- If the option changed modal component the name
  <MyModal
    ...
  >
  -->
    <div class="modal">
      <h1>Hello</h1>
      <p>
        Vue Universal Modal
      </p>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.modal {
  width: 50%;
  padding: 50px;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
}
</style>
```

### props

| name | type | detault | description |
|- | - | - | - |
| close | `function` | `() => {}` | Function to close a modal |
| options | `object` | `{}` |  |
| disabled | `boolean` | `false` | Handle visibility (as in v-show) |

#### props.options

| name | type | detault | description |
|- | - | - | - |
| transition | `number | false` | `300` | transition duration |
| closeClickDimmed | `boolean` | `true` | Closes the modal when dimmed is clicked |
| closeKeyCode | `number | false` | `27` | Handle just visibility (as in v-show) |
| styleModal | `object` | `{}` | Inject modal window style (`.vue-universal-modal`) |
| styleModalContent | `object` | `{}` | Inject modal content style (`.vue-universal-modal-content`) |

### slot arguments

The modal content is inserted into a slot and you can receive special arguments.

| name | type | description |
|- | - | - |
| emitClose | function | Invoke close function passed to props<br>**(Call emit to run after transition end)** |

## Handle global CSS

You can change it directly to your own style by referring to the `src/*.vue` or `dist/index.css`

```css
/* Slide up transition when open modal */
.vue-universal-modal-enter-from .vue-universal-modal-content {
  transform: translate3d(0, 50px, 0);
}
.vue-universal-modal-enter-to .vue-universal-modal-content {
  transform: translate3d(0, 0, 0);
}

.vue-universal-modal {
  /* Change white dimmed */
  background-color: rgba(255, 255, 255, 0.8);
}
.vue-universal-modal-content {
  /* Align to top (default flex-direction is column) */
  justify-content: flex-start;
}
```

## Demo

## Todo

* [x] Order states
* [X] Semantic release
* [ ] TDD (vue-test-utils-next is still beta and is not fully compatible with teleport)
* [ ] Support SSR (Test only until renderToString of the teleport component by holding the TDD)
* [ ] Support IE11 (IE 11 support for Vue@3 is still pending)
* [ ] Make demo
* [ ] A11Y