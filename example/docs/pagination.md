## Pagination 分页器

数据量过多时，采用分页器分解数据

:::demo 5页以下的基础分页器
```html
<z-view-pagination :total-pages="5" :current.sync="current"></z-view-pagination>
<script>
export default {
  data(){
    return {
      current: 1
    }
  }
}
</script>
```

:::

:::demo 超过5页时
```html
<z-view-pagination :total-pages="10" :current.sync="current"></z-view-pagination>
<script>
export default {
  data(){
    return {
      current: 5
    }
  }
}
</script>
```
:::

:::demo 简洁模式
```html
<z-view-pagination :total-pages="10" :current.sync="current" simple></z-view-pagination>
<script>
export default {
  data(){
    return {
      current: 3
    }
  }
}
</script>
```
:::

:::demo 只有一页的分页器
```html
<z-view-pagination :total-pages="1" :current.sync="current" simple :hide-if-one-page="false"></z-view-pagination>
<script>
export default {
  data(){
    return {
      current: 1
    }
  }
}
</script>
```
:::

### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| totalPages | 总页数 | number | - | 0 | - |
| current | 当前页 | number | - | 1 | - |
| simple | 简洁模式（没有边框）| boolean | - | false | - |
| hideIfOnePage | 只有一页时隐藏分页器 | boolean | - | true | -