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
    return {};
  },
  methods: {
    playAutomatically() {
      let names = this.$children.map(child => child.name);
      let index = names.indexOf(this.getSelected());
      let run = () => {
        let newIndex = index - 1
        if (newIndex >= names.length) {
          newIndex = 0
        }
        if(newIndex < 0){
          newIndex = names.length - 1
        }
        this.$emit("update:selected", names[newIndex]);
        setTimeout(run, 3000);
      };
      setTimeout(run, 3000);
    },
    getSelected() {
      return this.selected || this.$children[0].name;
    },
    updateChildren(selected) {
      let names = this.$children.map(child => child.name)
      this.$children.forEach(vm => {
        vm.visible = vm.name === selected;
        let newIndex = names.indexOf(selected)
        let oldIndex = names.indexOf(vm.name)
        vm.reverse = newIndex > oldIndex ? false : true
      });
    }
  },
  updated() {
    this.updateChildren(this.getSelected());
  },
  mounted() {
    this.updateChildren(this.getSelected());
    if (this.autoPlay) {
      this.playAutomatically();
    }
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
}
</style>
