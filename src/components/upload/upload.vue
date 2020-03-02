<template>
  <div class="z-view-upload-wrapper">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden"></div>
    <slot name="tips"></slot>
  </div>
</template>
<script>
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
    }
  },
  methods: {
    onClickUpload(){
      let input = document.createElement('input')
      input.type = 'file'
      this.$refs.temp.appendChild(input)
      input.addEventListener('change',()=>{
        console.log(input.files)
        let file = input.files[0]
        input.remove()
        let formData = new FormData()
        formData.append(this.name, file)
        let xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          console.log(xhr.response)
        }
        xhr.send(formData)
      })
      input.click()
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
