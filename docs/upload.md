## Upload 文件上传

用来上传文件。

:::demo 自定义 button 作为 trigger，限制文件类型，支持多个文件
```html
<z-view-upload accept="image/*" multiple action="http://localhost:3000/asubmit" 
  :parse-response="parseResponse" name="file" 
  :fileList.sync="fileList"
  :before-upload="beforeUpload" :on-download="onDownload">
  <z-view-button type="primary">点击上传</z-view-button>
  <template slot="tips">
    <div>只能上传 30MB 以内的图片</div>
  </template>
</z-view-upload>
<script>
export default{
  methods:{
    parseResponse(resp){
      console.log(resp)
      let obj = JSON.parse(resp)
      return `http://localhost:3000/preview/${obj.id}`
    },
    onDownload(file){
      window.open(file.url)
    },
    beforeUpload(files){
      for(let i = 0; i < files.length; i++) {
        let file = files[i]
        if (!file.type.startsWith('image') || file.size > 1024 * 1024 * 30) {
          this.$toast('只能上传 30MB 以内的图片')
          return false
        }
      }
      return true
    },
  },
  data(){
    return {
      fileList: []
    }
  },
};
</script>
```
:::


### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| name  | 发到后台的文件参数名 | string | - | - | - |
| method | 请求的方法 | string | - | 'POST' | - |
| action | 请求的地址 | string | - | - | - |
| accept | 接受的文件类型 | string | - | - | - |
| parseResponse | 上传成功后的回调函数 | function | - | - | - |
| fileList | 文件列表，必须 .sync 绑定 | array | - | - | - |
| onDownload | 点击下载按钮的回调 | function | - | - | - |
| beforeUpload | 文件上传之前的钩子，可以用来做文件校验，参数是 input.files 类数组 | function | - | - | - |
| multiple | 是否支持多个文件 | boolean | - | - | - |
