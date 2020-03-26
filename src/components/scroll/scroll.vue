<template>
  <div class="z-view-scroll-wrapper" ref="parent">
    <div class="z-view-scroll" ref="child">
      <slot></slot>
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
      })
    }


  }
}
</script>

<style lang="scss" scoped>
.z-view-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    position: relative;
    border: 1px solid red;
    overflow: hidden;
  }
}
</style>
