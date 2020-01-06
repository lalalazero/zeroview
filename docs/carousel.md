## Carousel 跑马灯

常用于循环展示一组图片

:::demo 基础的用法
```html
<z-view-carousel :selected.sync="selected">
  <z-view-carousel-item name="a">
    <div class="box">a</div>
  </z-view-carousel-item>
  <z-view-carousel-item name="b">
    <div class="box">b</div>
  </z-view-carousel-item>
  <z-view-carousel-item name="c">
    <div class="box">c</div>
  </z-view-carousel-item>
</z-view-carousel>

<script>
export default {
  data(){
    return {
      selected: undefined
    }
  }
}
</script>
<style>
.box {
  height: 300px;
  background: lightblue;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```
:::

:::demo 支持自动播放
```html
<z-view-carousel autoPlay :selected.sync="selected">
  <z-view-carousel-item name="a">
    <div class="box">a</div>
  </z-view-carousel-item>
  <z-view-carousel-item name="b">
    <div class="box">b</div>
  </z-view-carousel-item>
  <z-view-carousel-item name="c">
    <div class="box">c</div>
  </z-view-carousel-item>
</z-view-carousel>
<script>
export default {
  data(){
    return {
      selected: 'b'
    }
  }
}
</script>
```
:::

### 属性 API

#### carousel 组件

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- | -------- |
| selected | 选中项 | string | - | - | 是,且需要 .sync 语法绑定 data 属性 |
| autoPlay | 是否开启自动播放 | boolean | - | false | 否 |
| autoPlayDelay | 自动播放间隔(毫秒) | number | - | 1500 | 否 |

#### carousel-item 组件
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填
|---------- |-------- |---------- |-------------  |-------- |-------- |
| name | 组件的名字，需要唯一  | string | - | - | 是 |

