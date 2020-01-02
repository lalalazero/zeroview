<template>
  <div class="z-view-carousel">
    <div class="z-view-carousel-window" ref="window">
      <div class="z-view-carousel-wrapper" ref="wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'zViewCarousel',
  props: {
    selected: {
      type: String
    }
  },

  data(){
    return {
      bus: new Vue()
    }
  },
  methods:{
    updateChildren(){
      let selected = this.selected || this.$children[0].name
      console.log(selected)
      console.log(this.$children)
      this.$children.forEach(vm => vm.visible = vm.name === selected)
    }
  },
  updated(){
    this.updateChildren()
  },
  mounted(){
    this.updateChildren()
  }
}
</script>
<style lang="scss" scoped>
.z-view-carousel {
  display: inline-block;
  border: 1px solid;
  &-window {

  }
  &-wrapper {
    position: relative;
  }
}

</style>
