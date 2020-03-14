<template>
    <div class="z-view-sticky-wrapper" ref="wrapper" :style="{height}">
      <div class="z-view-sticky" :class="classes" :style="{left,width}">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "zViewSticky",
  data(){
    return {
      sticky: false,
      height: undefined,
      left: undefined,
      width: undefined
    }
  },
  computed: {
    classes(){
      return {
        sticky: this.sticky
      }
    }
  },
  mounted() {
    let top = this.top()
    let handler = () => {
      if(window.scrollY > top){
        this.sticky = true
        let { left, width, height } = this.$refs.wrapper.getBoundingClientRect()
        this.left = left + 'px'
        this.width = width + 'px'
        this.height = height + 'px'
      }else{
        this.sticky = false
      }
    }
    this.handler = handler
    window.addEventListener('scroll',this.handler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.handler)
  },
  methods: {
    top(){
      let { top } = this.$refs.wrapper.getBoundingClientRect()
      return top + window.scrollY
    }
  }
}
</script>

<style scoped lang="scss">
.z-view-sticky-wrapper {
  /*display: inline-block;*/
}
.z-view-sticky {
  border: 1px solid red;
  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
