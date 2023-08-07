## Button 按钮

常用的操作按钮。

:::demo 使用 `type` 属性来定义 Button 的样式。
```html
<z-view-button>基本</z-view-button>
<z-view-button type="primary">主要</z-view-button>
<z-view-button type="dashed">虚线</z-view-button>
<z-view-button type="text">无边框</z-view-button>
<br><br>

<z-view-button type="info">提示</z-view-button>
<z-view-button type="success">成功</z-view-button>
<z-view-button type="warn">警告</z-view-button>
<z-view-button type="error">错误</z-view-button>
```
:::


:::demo 使用 `loading` 来指定加载中。
```html
<z-view-button :loading="loading" @click="click">基本</z-view-button>
<script>
export default {
  data(){
    return {
      loading: true
    }
  },
  methods: {
    click(){
      this.loading = !this.loading
    }
  }
}
</script>
```
:::

:::demo 使用 `icon` 来指定图标，`position` 指定位置。
```html
<z-view-button icon="wechat">基本</z-view-button>
<z-view-button icon="wechat" position="right">基本</z-view-button>
<z-view-button icon="setting">基本</z-view-button>
```
:::


:::demo 按钮组
```html
<z-view-button-group>
  <z-view-button icon="left">上一页</z-view-button>
  <z-view-button icon="right" position="right">下一页</z-view-button>
</z-view-button-group>
```
:::

### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    |   normal / primary / dashed / text / success / error / warn / info / text |     normal    |
| loading     | 是否加载中状态   | boolean    | — | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| position | 图标位置 | string | left / right | left