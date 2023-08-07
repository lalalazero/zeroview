## Popover 弹出框

常用的基础弹出消息框

#### hover 弹出
:::demo 默认 hover 弹出提示，支持四个方位
```html
<z-view-popover>
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>上方</z-view-button>
</z-view-popover>
<z-view-popover position="bottom">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>下方</z-view-button>
</z-view-popover>
<z-view-popover position="left">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>左方</z-view-button>
</z-view-popover>
<z-view-popover position="right">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>右方</z-view-button>
</z-view-popover>
```
:::

#### click 弹出
:::demo 指定 trigger 属性等于 click
```html
<z-view-popover trigger="click">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>上方</z-view-button>
</z-view-popover>
<z-view-popover trigger="click" position="bottom">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>下方</z-view-button>
</z-view-popover>
<z-view-popover trigger="click" position="left">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>左方</z-view-button>
</z-view-popover>
<z-view-popover trigger="click" position="right">
  <template slot='content'>
    <p>Hello World~</p>
  </template>
  <z-view-button>右方</z-view-button>
</z-view-popover>

```
:::

### 属性 API
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| trigger     | 触发方式   | string    |   click / hover  |     hover    | 否 |
| position     | 弹出方位   | string    |   top / bottom / left / right  |     top    | 否 |