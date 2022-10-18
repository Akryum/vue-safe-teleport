# vue-safe-teleport
Recommended for teleporting inside the app. You can replace all `<Teleport>` with `<SafeTeleport>`, it will wait for the target to be mounted before teleporting (or one frame if you don't use `<TeleportTarget>`, see below). [Demo](https://vue-safe-teleport.netlify.app/)

[💚️ Become a Sponsor](https://github.com/sponsors/Akryum)

## Sponsors

<p align="center">
  <a href="https://guillaume-chau.info/sponsors/" target="_blank">
    <img src='https://akryum.netlify.app/sponsors.svg'/>
  </a>
</p>

## Usage

Install the `vue-safe-teleport` package:

```sh
pnpm i vue-safe-teleport
```

Install the plugin in your Vue app:

```js
import { createApp } from 'vue'
import VueSafeTeleport from 'vue-safe-teleport'

const app = createApp(App)
app.use(VueSafeTeleport)
```

Add a `TeleportTarget` (by default rendering a div) inside your app:

```vue
<template>
  <TeleportTarget
    id="target"
  />
</template>
```

Use the `SafeTeleport` component instead of `Teleport` (it has the same props):

```vue
<template>
  <SafeTeleport to="#target">
    <div>Teleported to target</div>
  </SafeTeleport>
</template>
```

The content will be teleport as soon as the corresponding target is mounted.

You can also use `SafeTeleport` without `TeleportTarget`, in that case it will work like the builtin `Teleport` but will wait one frame if the target DOM element isn't avaiable yet:

```vue
<template>
  <SafeTeleport to="#target">
    <div>Teleported to target</div>
  </SafeTeleport>

  <div id="target"/>
</template>
```

## TeleportTarget

This component will notify the `SafeTeleport` components when it is mounted. It will render a div by default, but you can change the tag.

Props:

- `id`: the id of the target, used to match the `to` prop of `SafeTeleport`
- `tag`: the tag of the target, defaults to `div`
- `disabled`: disable all `SafeTeleport` targeting this target

```vue
<template>
  <TeleportTarget
    id="target"
    tag="span"
    disabled
  />
</template>
```

Will render:

```html
<span id="target"></span>
```
