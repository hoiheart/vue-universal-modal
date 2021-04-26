# vue-universal-modal

Universal modal plugin for Vue@3  
<a href="https://hoiheart.github.io/vue-universal-modal/demo/index.html" target="_blank">Demo</a>

> ⚠️ This plugin does not support Vue@2

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Install plugin](#install-plugin)
  * [Options](#options)
- [Usage modal](#usage-modal)
  * [v1.0.x -> v1.1.x change point](#v10x----v11x-change-point)
  * [props](#props)
    + [props.options](#propsoptions)
  * [emit events](#emit-events)
- [Handle global CSS](#handle-global-css)
- [Example](#example)


## Introduction

`vue-universal-modal` plugin is based on the <a href="https://v3.vuejs.org/guide/teleport.html#teleport" target="_blank">teleport</a>.  
It is very light and simple, but it provides essential features for modal use in applications.  
(Such as Add & Remove, Visible & Hidden, Transition, Auto bind keyboard and mouse to close, Support SSR, A11Y...)  
Here is the <a href="https://hoiheart.github.io/vue-universal-modal/demo/index.html" target="_blank">Demo</a>

## Features

* Based on the teleport
* Provides essential features for modal
* A11Y
* Support SSR (Insert rendering source into SSR context, Mount from Client-side)

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

> Because SSR cannot be implemented by dynamically creating and ref referencing teleport elements, teleport targets must be inserted into html first.

And install plugin in vue application

```ts
import 'vue-universal-modal/dist/index.css'

import VueUniversalModal from 'vue-universal-modal'

app.use(VueUniversalModal, {
  teleportTarget: '#modals'
})
```

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
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <!-- If the option changed modal component the name
  <MyModal>
  -->
  <Modal
    v-model="isShow"
    :close="closeModal"
  >
    <div class="modal">
      <p>
        Hello
      </p>
      <button @click="closeModal">
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

> ### v1.0.x -> v1.1.x change point
> * Use `v-model` instead of v-if for modal component insertion
> * If you control the insertion of components with v-if, the close animation will not work.
> * `emitClose` slot argument was deprecated.

### props

| name | type | detault | description |
|- | - | - | - |
| close | `function` | `() => {}` | Function to close a modal (apply when click dimmed) |
| disabled | `boolean` | `false` | Handle just visibility (as in v-show) |
| options | `object` | `{}` |  |

#### props.options

| name | type | detault | description |
|- | - | - | - |
| transition | `number` &#124; `false` | `300` | transition duration |
| closeClickDimmed | `boolean` | `true` | Closes the modal when dimmed is clicked |
| closeKeyCode | `number` &#124; `false` | `27` (esc) | Closes the modal when press key |
| styleModalContent | `object` | `{}` | Inject modal content style (<a href="https://github.com/hoiheart/vue-universal-modal/blob/master/src/Modal.vue" target="_blank">`.vue-universal-modal-content`</a>)|

### emit events

Supports emit properties for all <a href="https://v3.vuejs.org/guide/transitions-enterleave.html#javascript-hooks">transition events.</a>  

```vue
<template>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <Modal
    v-model="isShow"
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
      <button @click="closeModal">
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

* <a href="https://github.com/hoiheart/vue-universal-modal/blob/master/example" target="_blank">Source</a>
* <a href="https://hoiheart.github.io/vue-universal-modal/demo/index.html" target="_blank">Demo</a>
* <a href="https://hoiheart.github.io/vue-universal-modal/example/runtime.html" target="_blank">Runtime</a>
* <a href="https://codesandbox.io/s/icy-voice-v477v?file=/src/index.js" target="_blank">Get SSR Context</a>