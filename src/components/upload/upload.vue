<template>
  <div class="z-view-uploader">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden"></div>
    <slot name="tips"></slot>
    <div>
      <ol>
        <li v-for="(file,index) in fileList" :key="`${index}-${file.name}`">
          <span :class="`z-view-uploader-status-${file.status}`">{{ file.name }}</span>
          <span v-if="file.status === 'uploading'" class="z-view-uploader-uploading">
            <z-view-icon name="loading"></z-view-icon>
          </span>
          <img :src="file.url" style="width: 40px; height: 40px"/>
          <button @click="onRemoveFile(file)">x</button>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import zViewIcon from '../icon/icon.vue'
export default {
  components: {
    zViewIcon
  },
  methods: {
    onClickUpload(){
      let input = this.createInput()
      // listen to input
      input.addEventListener('change',()=>{
        let file = input.files[0]
        this.updateFile(file)
        input.remove()
      })
      input.click()
    },
    createInput(){
      let input = document.createElement('input')
      input.type = 'file'
      this.$refs.temp.appendChild(input)
      return input
    },
    beforeUploadFile(file, uid){
      let { name, size, type } = file
      this.$emit('update:fileList',[...this.fileList, { uid, name, type, size, status:'uploading'}])
    },
    afterUploadFileSuccess(rawFile, url, uid){
      let file = this.fileList.find(file => file.uid === uid)
      let copy = JSON.parse(JSON.stringify(file))
      copy.status = 'success'
      copy.url = url
      let index = this.fileList.indexOf(file)
      this.fileList.splice(index, 1, copy)
      let copyList = [...this.fileList]
      this.$emit('update:fileList',copyList)
    },
    afterUploadFileFail(rawFile, uid){
      let file = this.fileList.find(file => file.uid === uid)
      let copy = JSON.parse(JSON.stringify(file))
      copy.status = 'failed'
      let index = this.fileList.indexOf(file)
      this.fileList.splice(index, 1, copy)
      let copyList = [...this.fileList]
      this.$emit('update:fileList',copyList)
    },
    updateFile(rawFile){
      let uid = this.uid++
      this.beforeUploadFile(rawFile, uid)
      let formData = new FormData()
      formData.append(this.name, rawFile)
      this.doUploadFile(formData,(response)=>{
        let url = this.parseResponse(response)
        this.afterUploadFileSuccess(rawFile, url, uid)
      }, ()=>{
        this.afterUploadFileFail(rawFile, uid)
      })
    },
    doUploadFile(formData, success, failed){
      let xhr = new XMLHttpRequest()
      xhr.open(this.method, this.action)
      xhr.onload = ()=>{
        success(xhr.response)
      }
      xhr.onerror = ()=>{
        failed(xhr.response)
      }
      xhr.send(formData)
    },
    onRemoveFile(file){
      let answer = window.confirm('确定删除吗？')
      if(answer){
        let copy = [...this.fileList]
        let index = copy.indexOf(file)
        copy.splice(index, 1)
        this.$emit('update:fileList',copy)
      }
    }
  },
  name: "zViewUpload",
  props: {
    name: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'POST'
    },
    action: {
      type: String
    },
    parseResponse: {
      type: Function
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      url: 'about:blank',
      uid: 1,
    }
  }
};
</script>
<style lang="scss" scoped>
  .z-view-uploader {
    border: 1px solid #000;
    &-uploading {
      > svg {
        animation: $spinAnimation;
      }
    }
    &-status-success {
      color: $--primary-color;
    }
    &-status-failed {
      color: $--error-color;
    }
  }
</style>
