## Grid 网格

24 等分的网格布局


:::demo 使用 span 属性来指定宽度

```html
<z-view-row>
  <z-view-col span="24">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row>
  <z-view-col span="12">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="12">
    <div class="grid-content bg-light"></div>
  </z-view-col>
</z-view-row>
<z-view-row>
  <z-view-col span="8">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="8">
    <div class="grid-content bg-light"></div>
  </z-view-col>
  <z-view-col span="8">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-light"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-light"></div>
  </z-view-col>
</z-view-row>
<style>
  .z-view-col {
    margin: 10px 0;
  }
  .grid-content {
    height: 32px;
    border-radius: 4px;
  }
  .bg-light {
    background: #eee;
  }
  .bg-dark {
    background: #aaa;
  }
</style>
```

:::

:::demo 用 gutter 属性指定分栏直接的间隔

```html
<z-view-row gutter="20">
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
```

:::

:::demo align 指定对齐方式，默认是左对齐

```html
<z-view-row gutter="20" align="right">
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row gutter="20" align="center">
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
```

:::

:::demo span 配合 gutter 使用创建混合布局

```html
<z-view-row gutter="20">
  <z-view-col span="16">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="8">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row gutter="20">
  <z-view-col span="8">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="8">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="4">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="4">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row gutter="20">
  <z-view-col span="4">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="16">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="4">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
```

:::

:::demo offset 指定偏移的栏数

```html
<z-view-row gutter="20">
  <z-view-col span="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6" offset="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row gutter="20">
  <z-view-col span="6" offset="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col span="6" offset="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
<z-view-row gutter="20">
  <z-view-col span="12" offset="6">
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
```

:::

:::demo 提供了另外 4 种响应式尺寸 ipad pc narrowPc widePc

```html
<z-view-row gutter="20">
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
  <z-view-col
    span="24"
    :ipad="{span: 12}"
    :narrowPc="{span: 8}"
    :pc="{span: 6}"
    :widePc="{span: 4}"
  >
    <div class="grid-content bg-dark"></div>
  </z-view-col>
</z-view-row>
```

:::


### 属性 API
#### row 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| gutter     | 缝隙(单位是px)   | string,number    |   -  |     -    | 否 |
| align  | 对齐方式 | string | left / right / center | left | 否 |

#### col 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| span     | 默认宽度   | string,number    |   0-24 之间  |     -    | 是 |
| offset  | 默认偏移量  | string,number | - | - | 否 |
| ipad | 宽度 577px 到 768px 之间的 span 和 offset 设置 | object | - | - | 否 |
| narrowPc | 宽度 769px 到 991px 之间的 span 和 offset 设置 | object | - | - | 否 |
| pc | 宽度 992px 到 1200px 之间的 span 和 offset 设置 | object | - | - | 否 |
| widePc | 宽度超过 1200px 的 span 和 offset 设置 | object | - | - | 否 |