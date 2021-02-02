# vue-universal-modal

Universal modal plugin for Vue3

> ⚠️ This plugin does not support Vue2

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Install plugin](#install-plugin)
  * [Options](#options)
- [Usage modal](#usage-modal)
  * [props](#props)
    + [props.options](#propsoptions)
  * [slot arguments](#slot-arguments)
  * [emit events](#emit-events)
- [Handle global CSS](#handle-global-css)
- [Example](#example)


## Introduction

`vue-universal-modal` plugin is based on the <a href="https://v3.vuejs.org/guide/teleport.html#teleport" target="_blank">teleport</a>.  
It is very light and simple, but it provides essential features for modal use in applications.  
(Such as Add & Remove, Visible & Hidden, Transition, Auto bind keyboard and mouse to close, Support SSR, A11Y...)

## Features

* [x] Set order modals (modal on modal)
* [x] A11Y
* [X] Support SSR (Insert rendering source into SSR context, Mount from Client-side)
* [ ] Support IE11 (IE 11 support for Vue@3 is still pending)

## Install plugin

```bash
npm install vue-universal-modal
```

Insert teleport element in your html

```html
...
  <div id="app"></div>
  <!-- teleport target -->
  <div id="modals"></div>
...
```

And install plugin in vue application

```ts
import VueUniversalModal from 'vue-universal-modal'
// import VueUniversalModal from 'vue-universal-modal/dist/index.es5' // If need to use es5 build
import 'vue-universal-modal/dist/index.css'

app.use(VueUniversalModal, {
  teleportTarget: '#modals'
})
```

> In v1.0.4 and below, the global teleport component is automatically generated and used as a ref.  
However, it was changed to insert the teleport dom outside the application and set it because it could not support server-side rendering.

### Options

```ts
app.use(VueUniversalModal, {
  teleportTarget: '#my-modals',
  modalComponent: 'MyModal',
})
```

| name | type | detault | description |
|- | - | - | - |
| teleportTarget **(required)** | `string` | | <a href="https://v3.vuejs.org/api/built-in-components.html#teleport" target="_blank">Teleport target</a> |
| modalComponent | `string` | `'Modal'` | Global modal component name |

## Usage modal

Insert the component wrapped with the modal component. (Slot based)

```vue
<template>
  <Modal>
  <!-- If the option changed modal component the name
  <MyModal>
  -->
    <div class="modal">
      <h2>Hello</h2>
      <p>
        Vue Universal Modal
      </p>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
```

### props

| name | type | detault | description |
|- | - | - | - |
| close | `function` | `() => {}` | Function to close a modal |
| disabled | `boolean` | `false` | Handle visibility (as in v-show) |
| options | `object` | `{}` |  |
| id | `string` | `''` |  | modal id
| class | `string` | `''` |  | modal class
| ariaLabelledby | `string` | `''` | Applying modal heading id helps with accessibility. |

#### props.options

| name | type | detault | description |
|- | - | - | - |
| transition | `number` &#124; `false` | `300` | transition duration |
| closeClickDimmed | `boolean` | `true` | Closes the modal when dimmed is clicked |
| closeKeyCode | `number` &#124; `false` | `27` (esc) | Handle just visibility (as in v-show) |
| styleModal | `object` | `{}` | Inject modal window style (<a href="https://github.com/hoiheart/vue-universal-modal/blob/master/src/Modal.vue" target="_blank">`.vue-universal-modal`</a>)|
| styleModalContent | `object` | `{}` | Inject modal content style (<a href="https://github.com/hoiheart/vue-universal-modal/blob/master/src/Modal.vue" target="_blank">`.vue-universal-modal-content`</a>)|

### slot arguments

There are slot arguments that can be used within modal content.

| name | type | description |
|- | - | - |
| emitClose | function | The modal component must be unmount after the transitionEnd event.<br>So we need to pass the close function to props and run emitClose with logic wrapped. |

```vue
<template>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-if="isShow"
    v-slot="{ emitClose }"
    :close="closeModal"
  >
    <div class="modal">
      <p>
        Hello
      </p>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    return {
      isShow,
      showModal,
      closeModal
    }
  }
})
</script>
```

### emit events

Supports emit properties for several transition events.  
`before-enter`, `after-enter`, `before-leave`, `after-leave`

```vue
<template>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-if="isShow"
    v-slot="{ emitClose }"
    :close="closeModal"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div class="modal">
      <p>
        Hello
      </p>
      <button @click="emitClose">
        close
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    function beforeEnter () {
      console.log('before enter')
    }

    function afterEnter () {
      console.log('after enter')
    }

    function beforeLeave () {
      console.log('before leave')
    }

    function afterLeave () {
      console.log('after leave')
    }

    return {
      isShow,
      showModal,
      closeModal,
      beforeEnter,
      afterEnter,
      beforeLeave,
      afterLeave
    }
  }
})
</script>
```

## Handle global CSS

You can change it directly to your own style by referring to the <a href="https://github.com/hoiheart/vue-universal-modal/blob/master/src/Modal.vue" target="_blank">source</a>

```css
.vue-universal-modal {
  /* Change dimmed color */
  background-color: rgba(255, 255, 0, 0.3);
}
.vue-universal-modal-content {
  /* Align to top (flex-direction property value is set to column) */
  justify-content: flex-start;
}
```

## Example

> ⚠️ There is a problem where close transition is not executed in Vue 3.0.X.  
<a href="https://github.com/vuejs/vue-next/issues/2757" target="_blank">The bug report is being fixed and will work from the next version.</a>

* <a href="https://github.com/hoiheart/vue-universal-modal/blob/master/example" target="_blank">Source</a>
* <a href="https://hoiheart.github.io/vue-universal-modal/demo/index.html" target="_blank">Demo</a>
* <a href="https://hoiheart.github.io/vue-universal-modal/example/runtime.html" target="_blank">Runtime</a>
* <a href="https://codesandbox.io/s/icy-voice-v477v?file=/src/index.js" target="_blank">Get SSR Context</a>