## Menu 导航菜单
提供导航功能的菜单

#### 水平菜单
:::demo 水平的顶部导航栏
```html
<z-view-menu selected="b">
  <z-view-menu-item name="a">导航一</z-view-menu-item>
  <z-view-menu-item name="b">导航二</z-view-menu-item>
  <z-view-sub-menu name="c">
    <template slot="title">导航三(子菜单)</template>
    <z-view-menu-item name="c1">子菜单一</z-view-menu-item>
    <z-view-menu-item name="c2">子菜单二</z-view-menu-item>
    <z-view-sub-menu name="c3">
      <template slot="title">子菜单三</template>
      <z-view-menu-item name="c3-1">子菜单4</z-view-menu-item>
      <z-view-menu-item name="c3-2">子菜单5</z-view-menu-item>
    </z-view-sub-menu>
  </z-view-sub-menu>
</z-view-menu>
<style>
.z-view-menu {
  margin-bottom: 20px;
}
</style>
```
:::

#### 带分组的垂直菜单
:::demo 垂直的侧边导航栏，可以设置菜单分组和子菜单默认打开
```html
<z-view-menu direction="vertical" selected="g4">
  <z-view-sub-menu name="a" open>
    <template slot="title">菜单一</template>
    <z-view-menu-group name="分组1">
      <z-view-menu-item name="g1">导航1</z-view-menu-item>
      <z-view-menu-item name="g2">导航2</z-view-menu-item>
    </z-view-menu-group>
    <z-view-menu-group name="分组2">
      <z-view-menu-item name="g3">导航3</z-view-menu-item>
      <z-view-menu-item name="g4">导航4</z-view-menu-item>
    </z-view-menu-group>
  </z-view-sub-menu>
  
  <z-view-sub-menu name="c" open>
    <template slot="title">菜单二</template>
    <z-view-menu-item name="c1">子菜单1</z-view-menu-item>
    <z-view-menu-item name="c2">子菜单2</z-view-menu-item>
    <z-view-sub-menu name="c3">
      <template slot="title">子菜单3</template>
      <z-view-menu-item name="c3-1">子菜单3-1</z-view-menu-item>
      <z-view-menu-item name="c3-2">子菜单3-2</z-view-menu-item>
    </z-view-sub-menu>
  </z-view-sub-menu>
</z-view-menu>
<style>
.z-view-menu {
  margin-bottom: 20px;
}
</style>
```
:::

#### 单次只打开一个的垂直菜单
:::demo 竖直方向上一次只允许打开一个菜单，保持聚焦和整洁
```html
<z-view-menu direction="vertical" singleOpen>
  <z-view-sub-menu name="a">
    <template slot="title">菜单一</template>
    <z-view-menu-item name="a1">选项a</z-view-menu-item>
    <z-view-menu-item name="a2">选项b</z-view-menu-item>
    <z-view-menu-item name="a3">选项c</z-view-menu-item>
  </z-view-sub-menu>
  <z-view-sub-menu name="b">
    <template slot="title">菜单二</template>
    <z-view-menu-item name="b1">选项a</z-view-menu-item>
    <z-view-menu-item name="b2">选项b</z-view-menu-item>
    <z-view-menu-item name="b3">选项c</z-view-menu-item>
  </z-view-sub-menu>
  <z-view-sub-menu name="c">
    <template slot="title">菜单三</template>
    <z-view-menu-item name="c1">选项a</z-view-menu-item>
    <z-view-menu-item name="c2">选项b</z-view-menu-item>
    <z-view-menu-item name="c3">选项c</z-view-menu-item>
  </z-view-sub-menu>

</z-view-menu>
```
:::

### 属性 API
#### menu 组件

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction     | 方向   | string    |   horizontal / vertical |     horizontal    |
| singleOpen | 竖直方向上一次只打开单个菜单   | boolean    |  - |     false    |
| selected | 被选中的菜单 | string | - | - |

#### sub-menu 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| name     | 组件唯一标识   | string    |   - |     -    | 是 |
| open | 是否保持菜单打开 | boolean | - | false | -

#### menu-group 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 分组名称   | string    |   - |     -    |

#### menu-item 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| name     | 组件唯一标识   | string    |   - |     -    | 是 |