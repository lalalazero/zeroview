<template>
  <div class="app">
    <z-view-upload accept="image/**" action="http://localhost:3000/asubmit" :parse-response="parseResponse" name="file" :fileList.sync="fileList" >
      <z-view-button type="primary">点击上传</z-view-button>
      <template slot="tips">
        <div>只能上传 300kb 以内的 png,jpeg 文件</div>
      </template>
    </z-view-upload>
<!--    <z-view-button>保存</z-view-button>-->
  </div>
</template>


<script>
export default{
  methods:{
    parseResponse(resp){
      console.log(typeof resp)
      console.log(resp)
      let obj = JSON.parse(resp)
      return `http://localhost:3000/preview/${obj.id}`
    }
  },
  data(){
    return {
      fileList: []
    }
  }
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
