## datepicker 日期选择器 
可以根据不同的模式（年、月、日）选择日期
:::demo 基础用法
```html
<z-view-date-picker :value.sync="value"></z-view-date-picker>
<script>
export default{
  data(){
    return {
      value: undefined
    }
  }
};
</script>
```
:::


### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| value | 日期值 | String, Date | - | - | - |
| mode | 模式 | String | year/month/day | day | - |
