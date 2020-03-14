<template>
    <div class="z-view-sticky-wrapper" ref="wrapper" :style="{height}">
      <div class="z-view-sticky" ref="sticky" :class="classes" :style="{left,width,top}">
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
      width: undefined,
      top: undefined,
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
    this.windowScrollHander = this._windowScrollHandler.bind(this)
    window.addEventListener('scroll',this._windowScrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this._windowScrollHandler)
  },
  methods: {
    calculateTop(){
      let { top } = this.$refs.wrapper.getBoundingClientRect()
      return top + window.scrollY
    },
    _windowScrollHandler(){
      let top = this.calculateTop()
      let heightOccupied = this.calculateHeight()
      if(window.scrollY + heightOccupied > top){
        this.sticky = true
        let { left, width, height } = this.$refs.wrapper.getBoundingClientRect()
        this.left = left + 'px'
        this.width = width + 'px'
        this.height = height + 'px'
        this.top = heightOccupied + 'px'
      }else{
        this.sticky = false
      }
    },
    calculateHeight(){
      let stickyList = document.querySelectorAll('.z-view-sticky.sticky')
      let heightOccupied = 0
      for(let i = 0; i < stickyList.length; i++){
        let node = stickyList[i]
        if(node === this.$refs.sticky){
          break
        }
        let { height } = node.getBoundingClientRect()
        heightOccupied += height
      }
      return heightOccupied

    }
  }
}
</script>

<style scoped lang="scss">
.z-view-sticky-wrapper {
}
.z-view-sticky {
  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
