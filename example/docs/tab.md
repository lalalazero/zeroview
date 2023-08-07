## Tab 标签页
选项卡的切换组件

:::demo 设置默认第一个选项卡激活，也可以设置 disabled 的选项卡
```html
<z-view-tabs selected="2">
  <z-view-tabs-head>
    <z-view-tabs-item name="1">标签一</z-view-tabs-item>
    <z-view-tabs-item name="2">标签二</z-view-tabs-item>
    <z-view-tabs-item name="3">标签三</z-view-tabs-item>
    <z-view-tabs-item name="4" disabled>标签四</z-view-tabs-item>
  </z-view-tabs-head>
  <z-view-tabs-body>
    <z-view-tabs-pane name="1">标签一的内容</z-view-tabs-pane>
    <z-view-tabs-pane name="2">标签二的内容</z-view-tabs-pane>
    <z-view-tabs-pane name="3">标签三的内容</z-view-tabs-pane>
    <z-view-tabs-pane name="4">标签四的内容</z-view-tabs-pane>
  </z-view-tabs-body>
</z-view-tabs>
```
:::

### 属性 API
#### tabs 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| selected     | 激活的 tab   | string    |   -  |     -    | 是 |
| direction     | 方向   | string    |   horizontal /  vertical  |     horizontal    | 否 |

#### tabs-item 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| name     | 组件的唯一标识   | string,number    |   -  |     -    | 是 |
| disabled     | 是否禁用   | boolean    |  - |     false    | 否 |

#### tabs-pane 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| name     | 组件的唯一标识   | string,number    |   -  |     -    | 是 |