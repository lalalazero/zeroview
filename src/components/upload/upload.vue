<template>
  <div class="z-view-upload-wrapper">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden"></div>
    <slot name="tips"></slot>
    <div>
      <ol>
        <li v-for="(file,index) in fileList" :key="`${index}-${file.name}`">
          {{ file.name }}
          <img :src="file.url" style="width: 40px; height: 40px"/>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import input from "../input/input";

export default {
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
      url: 'about:blank'
    }
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
    updateFile(file){
      let formData = new FormData()
      formData.append(this.name, file)
      let { name, size, type } = file
      this.doUploadFile(formData,(response)=>{
        let url = this.parseResponse(response)
        this.$emit('update:fileList', [...this.fileList, { name, type, size, url }])
      })
    },
    doUploadFile(formData, success){
      let xhr = new XMLHttpRequest()
      xhr.open(this.method, this.action)
      xhr.onload = ()=>{
        success(xhr.response)
      }
      xhr.send(formData)
    }
  }
};
</script>
<style lang="scss" scoped>
  .z-view-upload-wrapper {
    border: 1px solid #000;
  }
</style>
