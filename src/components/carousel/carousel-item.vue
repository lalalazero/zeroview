<template>
  <transition name="slide">
    <div class="z-view-carousel-item" v-if="visible" :class="{reverse}">
      <slot />
    </div>
  </transition>
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
  data() {
    return {
      visible: false,
      reverse: false
    };
  },
  updated(){
  },
  methods: {
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 1s;
}
.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  transform: scale(0.5)
}
.slide-enter.reverse {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to.reverse {
  transform: translateX(100%);
  opacity: 0;
  transform: scale(0.5)
}
</style>
