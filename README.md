# vue-universal-modal

Universal modal plugin for Vue@3  

> ⚠️ This plug-in does not support Vue@2

## Introduction

This plug-in is based on the <a href="https://v3.vuejs.org/guide/teleport.html#teleport" target="_blank">teleport</a>.  
Made to use the basic functions needed for modal light and easy.  
(Such as SSR, transition, add&remove, visible&hidden, auto bind close function, A11Y...)

## Demo



## Install plugin

```bash
npm install vue-universal-modal
```

And install this plugin in vue application

```ts
import VueUniversalModal from 'vue-universal-modal'

app.use(VueUniversalModal)
```

### options

Several options are available for installation.

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
| teleportComponentId | `string` | `'modals'` | Global teleport component id |
| modalComponent | `string` | `'Modal'` | Global modal component name |

## Add teleport component

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

## Usage

Insert the component wrapped with the modal component.

```vue
<template>
  <Modal
    v-slot="{ emitClose }"
  >
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
      <button @click="emitClose">
        close
      </button>
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
| disabled | `boolean` | `false` | Handle just visibility (as in v-show) |

### props.options

| name | type | detault | description |
|- | - | - | - |
| transition | `number | false` | `300` | transition duration |
| closeClickDimmed | `boolean` | `true` | Closes the modal when dimmed is clicked |
| closeKeyCode | `number | false` | `27` | Handle just visibility (as in v-show) |
| styleModal | `object` | `{}` | Inject modal style |
| styleModalContent | `object` | `{}` | Inject modal content style |

### slot arguments

The modal content is inserted into a slot and you can receive special arguments.

| name | type | description |
|- | - | - | - |
| emitClose | function | Invoke close function passed to props<br>**(Call emit to run after transition end)** |