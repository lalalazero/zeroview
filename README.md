## zeroview

这是一套基于 Vue 2.6 的 UI 组件库。旨在学习 Vue 和手写组件，提高自己的熟练度。

### 安装

`yarn add zeroview` 或者 `npm install zeroview` 安装

### 快速开始

以 `button` 组件为例

```javascript
import Vue from 'vue'
import zeroview from 'zeroview'
import 'zeroview/dist/zeroview.css'

Vue.use(zeroview)
```

在 `App.vue` 中使用

```javascript
<template>
  <div id="app">
    <z-view-button icon="like">点个赞</z-view-button>
  </div>
</template>
```


### 目前完成了

- Button
- Icon
- Grid
- Layout
- Menu
- Collapse
- Tab
- Input
- Cascader
- Popover
- Toast

### 组件库参考

参考了 `elementui` , `antd` , `iview` 这些组件库，包括样式设计、组件功能点。
以及本官网示例参考了 `elementui` 的做法，通过 `markdown` 文件来写示例。

### 学习文档

在写组件库的过程中，基本按照一个组件一个文档的方式记录了过程和一些比较容易踩坑的点。
具体的都在我的[个人博客](https://lalalazero.github.io/blog/)上。

### 交流

欢迎在本项目的 [issue](https://github.com/lalalazero/zeroview/issues) 留言，共同交流学习。
  
