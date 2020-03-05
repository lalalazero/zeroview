<template>
  <div class="z-view-uploader">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div class="z-view-uploader-tips">
      <slot name="tips"></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden"></div>
    <div>
      <ol class="z-view-uploader-fileList">
        <li v-for="(file,index) in fileList" :key="`${index}-${file.name}`">
          <span v-if="file.status === 'uploading'" class="z-view-uploader-uploading">
            <z-view-icon name="loading"></z-view-icon>
          </span>
          <span class="z-view-uploader-fileList-item-image-wrapper">
            <img v-if="file.type && file.type.startsWith('image') && file.status === 'success' " :src="file.url" style="width: 40px; height: 40px"/>
          </span>
          <span class="z-view-uploader-fileList-itemName" :class="`z-view-uploader-status-${file.status}`">{{ file.name }}</span>
          <div class="z-view-uploader-fileList-icon">
            <span @click="_onDownload(file)"><z-view-icon name="download" ></z-view-icon></span>
            <span @click="onRemoveFile(file)"><z-view-icon name="error" ></z-view-icon></span>
          </div>
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
    accept: {
      type: String
    },
    parseResponse: {
      type: Function
    },
    fileList: {
      type: Array,
      default: () => []
    },
    onDownload: {
      type: Function
    },
    beforeUpload: {
      type: Function
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      url: 'about:blank',
      uid: 1,
    }
  },
  methods: {
    onClickUpload(){
      let input = this.createInput()
      // listen to input
      input.addEventListener('change',()=>{
        if(this.multiple){
          let files = input.files
          if (this.beforeUpload) {
            let check = this.beforeUpload(files)
            if (!check) {
              return
            }
          }
          let fileArr = Array.from(files)
          fileArr.forEach(file => {
            this.uploadFile(file)
          })

        }else {
          let file = input.files[0]
          if (this.beforeUpload) {
            let check = this.beforeUpload(file)
            if (!check) {
              return
            }
          }
          this.uploadFile(file)
        }
        input.remove()
      })
      input.click()
    },
    createInput(){
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = this.accept
      input.multiple = this.multiple
      this.$refs.temp.innerHTML = ''
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
    uploadFile(rawFile){
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
    },
    _onDownload(file){
      this.onDownload && this.onDownload(file)
    }
  },
};
</script>
<style lang="scss" scoped>
  .z-view-uploader {
    width: 400px;
    &-tips {
      font-size: 12px;
      color: $--color;
      margin: 5px 0;
    }
    &-uploading {
      > svg {
        animation: $spinAnimation;
      }
    }
    &-status-success {
      color: $--success-color;
    }
    &-status-failed {
      color: $--error-color;
    }
    &-fileList {
      > li {
        margin: 8px 0;
        display: flex;
        align-items: center;
        &:hover {
          background: $table-row-hover-color;
        }
      }
      &-item-image-wrapper {
        flex-shrink: 0;
      }
      &-itemName {
        font-size: 12px;
        flex-grow: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-icon {
        /*border: 1px solid red;*/
        flex-shrink: 0;
        margin-right: 10px;
        margin-left: auto;
        cursor: pointer;
        > span {
          margin-right: 5px;
          &:hover {
            > svg {
              transform: scale(1.2);
            }
          }
        }
      }

    }
  }
</style>
