## 快速开始

以 `button` 组件为例

```javascript
import Vue from 'vue'
import zeroview from 'zeroview'
import 'zeroview/dist/zeroview.css'

Vue.use(zeroview)
```

在 `App.vue` 中使用

```html
<template>
  <div id="app">
    <z-view-button icon="like">点个赞</z-view-button>
  </div>
</template>
```