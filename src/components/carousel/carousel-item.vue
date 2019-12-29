<template>
  <span class="z-view-carousel-item-wrapper">
    <transition name="fade">
      <div class="z-view-carousel-item" v-if="visible">
        <slot />
      </div>
    </transition>
  </span>
</template>
<script>
export default {
  name: "zViewCarouselItem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  inject: ["bus"],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onSelectedChange(selected) {
      this.visible = selected === this.name;
    }
  },
  mounted() {
    this.bus.$on("update:selected", this.onSelectedChange);
  }
};
</script>
<style lang="scss" scoped>
.z-view-carousel-item-wrapper {

}
.z-view-carousel-item {
  background: lightblue;
  text-align: center;
  line-height: 100px;
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
.fade-enter-active, .fade-leave-active {
  transition: all 3s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(100%)
}
.fade-leave-active {
  position: absolute;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%)
}
</style>
