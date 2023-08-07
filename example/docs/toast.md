## Toast 弹出框
弹出全局提示消息


:::demo 默认在页面顶部弹出，消失时间 2 秒
```html
<z-view-button @click="click">顶部弹出</z-view-button>

<script>
export default {
  methods: {
    click(){
      this.$toast('你好，我是 Toast')
    }
  }
}
</script>
```
:::

#### 设置关闭时间和回调函数
:::demo 可以设置是否自动关闭，关闭时间，弹出位置还有关闭回调函数
```html
<z-view-button @click="click1">底部弹出</z-view-button>
<z-view-button @click="click2">中间弹出</z-view-button>
<script>
export default {
  methods: {
    click1(){
      this.$toast('你好，我是 Toast',{
        autoClose: 5,
        position: 'bottom'
      })
    },
    click2(){
      this.$toast('你好，我是 Toast', {
        autoClose: false,
        closeButton: {
          text: '点我关闭',
          callback: () => {
            window.alert('Toast 关闭了')
          }
        },
        position: 'middle'
      })
    }
  }
}
</script>
```
:::

### 属性 API
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 必填 |
|---------- |-------- |---------- |-------------  |-------- | ------- |
| enableHTML     | 使用 HTML   | boolean    |   -  |     false    | 否 |
| autoClose     | 自动关闭   | boolean,number    |    false 或是其他数字  |     2    | 否 |
| closeButton | 关闭按钮 | object | { text: 'close', callback: 'cb'} | - | 否 |
| position | 弹出位置 | string | bottom / middle / top | top | 否

