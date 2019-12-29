<template>
  <div class="z-view-carousel">
      <slot />
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
  provide(){
    return {
      bus: this.bus
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
      this.bus.$emit('update:selected',selected)
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
  display: flex;
  // border: 1px solid;
}

</style>
