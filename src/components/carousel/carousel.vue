<template>
  <div class="z-view-carousel">
    <div class="z-view-carousel-window" ref="window">
      <div class="z-view-carousel-wrapper">
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
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },

  data(){
    return {
    }
  },
  methods:{
    playAutomatically(){
      let names = this.$children.map(child => child.name)
      let index = names.indexOf(this.getSelected())
      let run = ()=>{
        if(index === names.length) { index = 0}
        this.$emit('update:selected',names[index+1])
        index++
        setTimeout(run, 3000)
      }
      setTimeout(run, 3000)

    },
    getSelected(){
      return this.selected || this.$children[0].name
    },
    updateChildren(selected){
      this.$children.forEach(vm => vm.visible = vm.name === selected)
    }
  },
  updated(){
    this.updateChildren(this.getSelected())
  },
  mounted(){
    this.updateChildren(this.getSelected())
    if(this.autoPlay){
      this.playAutomatically()
    }
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
