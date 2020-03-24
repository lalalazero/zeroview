## datepicker 日期选择器 
可以根据不同的模式（年、月、日）选择日期
:::demo 基础用法
```html
<div class="date-picker-demo">
  <p>
    <z-view-date-picker :value.sync="value"></z-view-date-picker>
  </p>
  <p>
    <z-view-date-picker :value.sync="value2" placeholder="请选择月" mode="month"></z-view-date-picker>
  </p>
  <p>
    <z-view-date-picker :value.sync="value3" placeholder="请选择年" mode="year"></z-view-date-picker>
  </p>
</div>
<style>
.date-picker-demo > p > .z-view-date-picker{
 margin-bottom: 10px; 
}
</style>
<script>
export default{
  data(){
    return {
      value: undefined,
      value2: undefined,
      value3: undefined
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
