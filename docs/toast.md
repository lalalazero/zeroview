## Toast 弹出框
弹出全局提示消息

### 基础用法
在页面正中弹出一个信息提示，默认一次只弹出一个。

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
