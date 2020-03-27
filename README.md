# zeroview 
[![CircleCI](https://circleci.com/gh/lalalazero/zeroview.svg?style=svg)](https://circleci.com/gh/lalalazero/zeroview)[![npm version](https://badge.fury.io/js/zeroview.svg)](https://badge.fury.io/js/zeroview)


这是一套基于 Vue 2.6 的 UI 组件库。旨在学习 Vue 和手写组件，提高自己的熟练度。

:warning: 不要用在生产环境，这就是用来学习的。:joy_cat:

2020-03-28 00:39 终于大概写完第一版所有组件啦，撒花～
目前版本 0.0.14，后续要用自己的轮子来写应用，同时继续升级功能和修复bug。

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

ps: 请使用如下 css-reset, 否则样式会有问题
```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```


### 目前完成了

- [x] Button 按钮
  - [x] 示例文档
  - [x] 测试用例
- [x] Icon 图标
  - [x] 示例文档
  - [x] 测试用例
- [x] Grid 响应式栅格  
  - [x] 示例文档
  - [x] 测试用例
- [x] Layout 布局
  - [x] 示例文档
  - [x] 测试用例
- [x] Menu 导航菜单
  - [x] 示例文档
  - [x] 测试用例
- [x] Collapse 折叠面板
  - [x] 示例文档
  - [x] 测试用例
- [x] Tab 标签
  - [x] 示例文档
  - [x] 测试用例
  - [ ] 纵向 tab
- [x] Input 输入框
  - [x] 示例文档
  - [x] 测试用例
- [x] Cascader 级联选择器
  - [x] 示例文档
  - [x] 测试用例
- [x] Popover 弹出框
  - [x] 示例文档
  - [x] 测试用例
- [x] Toast 消息提示
  - [x] 示例文档
  - [x] 测试用例
- [x] Carousel 跑马灯
  - [x] 示例文档
  - [x] 测试用例
- [x] Pagination 分页器
  - [x] 示例文档
  - [x] 测试用例
- [x] Upload 文件上传
  - [ ] 示例文档(还缺少一个服务器emm)
  - [x] 测试用例
- [x] Table 表格
  - [x] 示例文档
  - [ ] 测试用例
- [x] Sticky 
  - [x] 示例文档
- [x] DatePicker 日期
  - [x] 示例文档
- [x] Scroll 滑动(竖直方向)
  - [x] 示例文档

### 其他

- [ ] 打包优化

### 组件库参考

参考了 `elementui` , `antd` , `iview` 这些组件库，包括样式设计、组件功能点。
以及本官网示例参考了 `elementui` 的做法，通过 `markdown` 文件来写示例。

### 学习文档

在写组件库的过程中，基本按照一个组件一个文档的方式记录了过程和一些比较容易踩坑的点。
具体的都在我的[个人博客](https://github.com/lalalazero/blog/)上。

### 交流

欢迎在本项目的 [issue](https://github.com/lalalazero/zeroview/issues) 留言，共同交流学习。
  
