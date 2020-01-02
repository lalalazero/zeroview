<template>
  <div class="z-view-carousel">
    <div class="z-view-carousel-window" ref="window">
      <div class="z-view-carousel-wrapper">
        <slot />
      </div>
    </div>
    <div class="z-view-carousel-dots">
      <span @click="select(index)" :key="index" v-for="(child,index) in childrenLength" :class="{ active: selectedIndex === index}">{{index + 1}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "zViewCarousel",
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      childrenLength: 0,
      names: []
    };
  },
  computed:{
    selectedIndex(){
      return this.names.indexOf(this.selected)
    },
    // names(){
    //   return this.$children.map(child => child.name)
    // }
  },
  methods: {
    playAutomatically() {
      // let names = this.$children.map(child => child.name);
      let index = this.names.indexOf(this.getSelected());
      let run = () => {
        let newIndex = index - 1
        if (newIndex >= this.names.length) {
          newIndex = 0
        }
        if(newIndex < 0){
          newIndex = this.names.length - 1
        }
        this.$emit("update:selected", this.names[newIndex]);
        setTimeout(run, 3000);
      };
      setTimeout(run, 3000);
    },
    getSelected() {
      return this.selected || this.$children[0].name;
    },
    updateChildren(selected) {
      // let names = this.$children.map(child => child.name)
      this.$children.forEach(vm => {
        vm.visible = vm.name === selected;
        let newIndex = this.names.indexOf(selected)
        let oldIndex = this.names.indexOf(vm.name)
        vm.reverse = newIndex > oldIndex ? false : true
      });
    },
    select(index){
      this.$emit('update:selected', this.names[index])
    },
    collectChildren(){
      this.childrenLength = this.$children.length
      this.names = this.$children.map(child => child.name)
    }
  },
  updated() {
    this.updateChildren(this.getSelected());
  },
  mounted() {
    this.collectChildren()
    this.updateChildren(this.getSelected());
    // this.playAutomatically()

  }
};
</script>
<style lang="scss" scoped>
.z-view-carousel {
  display: block;
  // border: 1px solid;
  &-window {
    overflow: hidden;
  }
  &-wrapper {
    position: relative;
  }
  &-dots {
    text-align: center;
    > span{
      display: inline-block;
      padding: .5em;
      border-radius: 50%;
      border: 1px solid;
      &.active {
        border-color: red;
      }
    }
  }
}
</style>
