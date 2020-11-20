# vue-universal-modal

Universal modal plugin for Vue@3  

> ⚠️ This plugin does not support Vue@2

## Table of Contents

* [Introduction](#introduction)
* [Install plugin](#install-plugin)
  + [options](#options)
* [Add teleport component](#add-teleport-component)
* [Usage](#usage)
  + [props](#props)
  + [props.options](#propsoptions)
  + [slot arguments](#slot-arguments)
* [Todo](#todo)


## Introduction

`vue-universal-modal` plugin is based on the <a href="https://v3.vuejs.org/guide/teleport.html#teleport" target="_blank">teleport</a>.  
It's very light and simple, but the focus is on providing the essential features needed between modal use in the application.
(Such as Add & Remove, Visible & Hidden, Transition, Auto binding close, Support SSR, A11Y...)

## Install plugin

```bash
npm install vue-universal-modal
```

And install this plugin in vue application

```ts
import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'

app.use(VueUniversalModal)
```

### Options

```ts
app.use(VueUniversalModal, {
  teleportComponent: 'MyModalTeleport',
  teleportComponentId: 'my-modal-teleport',
  teleportComponent: 'MyModal',
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
* [ ] Support SSR
* [X] Support IE11
* [ ] TDD
* [ ] Make demo
* [ ] Semantic release
* [ ] A11Y