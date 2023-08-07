## Collapse 折叠面板

可以折叠/展开的内容区域

:::demo 设置 selected 属性默认打开哪个面板
```html
<z-view-collapse :selected="['2','3']">
 <z-view-collapse-item title="Panel Header 1" name="1">好好学习，天天向上</z-view-collapse-item>
 <z-view-collapse-item title="Panel Header 2" name="2">好好学习，天天向上</z-view-collapse-item>
 <z-view-collapse-item title="Panel Header 3" name="3">好好学习，天天向上</z-view-collapse-item>
</z-view-collapse>
```
:::

:::demo 指定 single 属性同一时刻只允许打开单个面板
```html
<z-view-collapse single :selected="['2','3']">
 <z-view-collapse-item title="Panel Header 1" name="1">好好学习，天天向上</z-view-collapse-item>
 <z-view-collapse-item title="Panel Header 2" name="2">好好学习，天天向上</z-view-collapse-item>
 <z-view-collapse-item title="Panel Header 3" name="3">好好学习，天天向上</z-view-collapse-item>
</z-view-collapse>
```
:::

### 属性 API

#### collapse 组件

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| single     | 仅打开单个面板   | boolean    |   -  |     false    |
| selected  | 被选中的面板 | array | - | - |

#### collapse-item 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| title     | 标题   | string    |   -  |     -    | 是 |
| name  | 组件的唯一标识 | string | - | - | 是 |