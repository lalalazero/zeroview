<template>
  <div class="app">
    <z-view-upload multiple accept="image/*" action="http://localhost:3000/asubmit" :parse-response="parseResponse" name="file" :fileList.sync="fileList"
                   :before-upload="beforeUpload" :on-download="onDownload">
      <z-view-button type="primary">点击上传</z-view-button>
      <template slot="tips">
        <div>只能上传 30MB 以内的图片</div>
      </template>
    </z-view-upload>
<!--    <z-view-button>保存</z-view-button>-->
  </div>
</template>


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
          this.$toast('只能上传不大于30MB的图片')
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

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  &:hover,
  &:visited,
  &:active {
    // text-decoration: unset;
    color: unset;
  }
  text-decoration: unset;
}
ul,
ol {
  list-style: none;
}
.app {
  margin: 40px;
}
</style>>
