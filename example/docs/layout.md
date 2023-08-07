## Layout 布局组件

:::demo 基本的上中下布局和左右布局
```html
<div class="layout-demo">
  <z-view-layout>
    <z-view-header>Header</z-view-header>
    <z-view-content>Content</z-view-content>
  </z-view-layout>
  <z-view-layout>
    <z-view-header>Header</z-view-header>
    <z-view-content>Content</z-view-content>
    <z-view-footer>Footer</z-view-footer>
  </z-view-layout>
  <z-view-layout>
    <z-view-header>Header</z-view-header>
    <z-view-layout>
      <z-view-sider>Sider</z-view-sider>
      <z-view-content>Content</z-view-content>
    </z-view-layout>
    <z-view-footer>Footer</z-view-footer>
  </z-view-layout>
</div>
<style>
.layout-demo .z-view-header {
  line-height: 60px;
  background: #ccc;
  text-align: center;
}
.layout-demo  .z-view-content {
  line-height: 160px;
  background: #f0f0f0;
  text-align: center;
}
.layout-demo .z-view-sider {
  line-height: 160px;
  width: 200px;
  background: #ddd;
  text-align: center;
}
.layout-demo .z-view-footer {
  line-height: 60px;
  background: #bbb;
  text-align: center;
}
</style>
```
:::
