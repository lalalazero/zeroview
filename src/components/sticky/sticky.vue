<template>
    <div class="z-view-sticky" ref="wrapper" :class="classes">
      <slot></slot>
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
    window.addEventListener('scroll', () => {
      if(window.scrollY > top){
        console.log('滚过去了')
        this.sticky = true
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
    }
  }
}
</script>

<style scoped lang="scss">
.z-view-sticky {
  border: 1px solid red;
  &.sticky {
    /*background: red;*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
