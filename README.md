# vue-universal-modal

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
    return { isShow }
  },
  methods: {
    showModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
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

* <a href="https://github.com/hoiheart/vue-universal-modal/blob/master/example" target="_blank">source</a>
* <a href="https://hoiheart.github.io/vue-universal-modal/demo/" target="_blank">demo</a>

## Todo

* [x] Order states
* [x] Semantic release
* [x] Make demo
* [x] A11Y
* [ ] TDD (vue-test-utils-next is still beta and is not fully compatible with teleport)
* [ ] Support SSR (Test only until renderToString of the teleport component by holding the TDD)
* [ ] Support IE11 (IE 11 support for Vue@3 is still pending)