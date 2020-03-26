<template>
  <div class="z-view-scroll-wrapper" ref="parent">
    <div class="z-view-scroll" ref="child">
      <slot></slot>
    </div>
    <div class="z-view-scroll-track">
      <div class="z-view-scroll-bar" ref="bar">
        <div class="z-view-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zViewScroll',
  data(){
    return {
      canScroll: true
    }
  },
  mounted(){
    let parent = this.$refs.parent
    let child = this.$refs.child

    let { height: childHeight } = child.getBoundingClientRect()
    let { height: parentHeight } = parent.getBoundingClientRect()

    console.log("childHeight")
    console.log(childHeight)
    console.log("parentHeight")
    console.log(parentHeight)

    let { borderTopWidth, borderBottomWidth, paddingTop, paddingBottom } = window.getComputedStyle(parent)
    borderTopWidth = parseInt(borderTopWidth)
    borderBottomWidth = parseInt(borderBottomWidth)
    paddingTop = parseInt(paddingTop)
    paddingBottom = parseInt(paddingBottom)
    let maxHeight = childHeight - parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)

    console.log("maxHeight")
    console.log(maxHeight)
    if(maxHeight < 0){
      console.log('不需要滚动')
      this.canScroll = false
    }
    let translateY = 0
    if(this.canScroll){
      parent.addEventListener('wheel', e => {

        let { deltaY } = e
        translateY += deltaY
        // if(Math.abs(deltaY) > 20){
        //   translateY += 20 * 3
        // }else{
        //   translateY += deltaY * 3
        // }
        console.log("translateY")
        console.log(translateY)
        if(translateY < 0){
          console.log('滑动到顶部了')
          translateY = 0
        }else if(translateY > maxHeight && maxHeight > 0){
          console.log('滑动到底部了')
          translateY = maxHeight
        }else{
          e.preventDefault()
        }
        child.style.transform = `translateY(${-translateY}px)`
        this.translateScrollBar(parentHeight, childHeight, translateY)
      })
      this.initScrollBarHeight(parentHeight, childHeight, translateY)
    }
  },
  methods: {
    initScrollBarHeight(parentHeight, childHeight, translateY){
      // 高度占比应相等
      // scrollBarHeight 除以 parentHeight === parentHeight 除以 childHeight
      let bar = this.$refs.bar
      let scrollBarHeight = Math.round(parentHeight * parentHeight / childHeight)
      console.log("scrollBarHeight")
      console.log(scrollBarHeight)
      bar.style.height = `${scrollBarHeight}px`
    },
    translateScrollBar(parentHeight, childHeight, translateY){
      // 滑动比例应相等
      // y 除以 parentHeight === translateY 除以 childHeight
      let y = Math.round(parentHeight * translateY / childHeight)
      let bar = this.$refs.bar
      console.log(`scrollBar translateY：${y}px`)
      bar.style.transform = `translateY(${y}px)`

    }
  }
}
</script>

<style lang="scss" scoped>
.z-view-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    position: relative;
    // border: 1px solid red;
    overflow: hidden;
  }
  &-track {
    position: absolute;
    height: 100%;
    width: 14px;
    top: 0;
    right: 0;
    border-left: 1px solid #E8E7E8;
    border-right: 1px solid #E8E7E8;
    background: #FAFAFA;
    opacity: 0.9;

  }
  &-bar {
    position: absolute;
    top: -1px;
    // left: 50%;
    height: 40px;
    width: 14px;
    // margin-left: -4px;
    // padding: 4px 0;
    &-inner {
      height: 100%;
      // border-radius: 4px;
      background: #C2C2C2;
      &:hover {
        background: #7D7D7D;
      }
    }
  }
}
</style>
