<template>
    <div class="z-view-sticky-wrapper" ref="wrapper">
      <div class="z-view-sticky" :class="classes">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "zViewSticky",
  data(){
    return {
      sticky: false
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
    // let height = this.height()
    // this.$refs.wrapper.style.height = `${height}px`
    window.addEventListener('scroll', () => {
      if(window.scrollY > top){
        console.log('滚过去了')
        this.sticky = true
        let height = this.height()
        console.log(`height: ${height}`)
        this.$refs.wrapper.style.height = `${height}px`
      }else{
        console.log('没滚过去')
        this.sticky = false
      }
    })
  },
  created() {

  },
  methods: {
    top(){
      let { top } = this.$refs.wrapper.getBoundingClientRect()
      return top + window.scrollY
    },
    height(){
      let { height } = this.$refs.wrapper.getBoundingClientRect()
      return height
    }
  }
}
</script>

<style scoped lang="scss">
.z-view-sticky-wrapper {

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
