<template>
  <transition name="slide">
    <div class="z-view-carousel-item" v-if="visible">
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
      visible: false
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
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
