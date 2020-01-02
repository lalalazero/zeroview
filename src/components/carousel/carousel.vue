<template>
  <div class="z-view-carousel" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="z-view-carousel-window" ref="window">
      <div class="z-view-carousel-wrapper">
        <slot />
      </div>
    </div>
    <div class="z-view-carousel-dots">
      <span
        @click="select(index)"
        :key="index"
        v-for="(child,index) in childrenLength"
        :class="{ active: selectedIndex === index}"
      >{{index + 1}}</span>
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
      names: [],
      lastSelected: undefined, // 上一次被选中的值
      timerId: undefined
    };
  },
  computed: {
    selectedIndex() {
      return this.names.indexOf(this.selected);
    }
  },
  methods: {
    onMouseEnter() {
      console.log("mouse enter..");
      this.pause();
    },
    onMouseLeave() {
      console.log("mouse leave..");
      this.playAutomatically();
    },
    pause() {
      window.clearTimeout(this.timerId);
      this.timerId = undefined;
    },
    playAutomatically() {
      if (this.timerId) {
        return;
      }
      let run = () => {
        let index = this.names.indexOf(this.getSelected());
        let newIndex = index + 1;
        if (newIndex >= this.names.length) {
          newIndex = 0;
        }
        this.$emit("update:selected", this.names[newIndex]);
        this.timerId = setTimeout(run, 3000);
      };
      this.timerId = setTimeout(run, 3000);
    },
    getSelected() {
      return this.selected || this.$children[0].name;
    },
    updateChildren(selected) {
      this.$children.forEach(vm => {
        let newIndex = this.names.indexOf(selected);
        let oldIndex = this.names.indexOf(this.lastSelected);
        let reverse = newIndex > oldIndex ? false : true;
        // 处理首尾情况，变成真正的无缝轮播
        if (newIndex === this.names.length - 1 && oldIndex === 0) {
          reverse = true;
        }
        if (oldIndex === this.names.length - 1 && newIndex === 0) {
          reverse = false;
        }
        vm.reverse = reverse;
        this.$nextTick(() => {
          vm.visible = vm.name === selected;
        });
      });
    },
    select(index) {
      this.$emit("update:selected", this.names[index]);
    },
    collectChildren() {
      this.lastSelected = this.getSelected();
      this.childrenLength = this.$children.length;
      this.names = this.$children.map(child => child.name);
    }
  },
  updated() {
    this.updateChildren(this.getSelected());
    this.lastSelected = this.selected;
  },
  mounted() {
    this.collectChildren();
    this.updateChildren(this.getSelected());
    this.playAutomatically();
  }
};
</script>
<style lang="scss" scoped>
.z-view-carousel {
  display: block;
  position: relative;
  &-window {
    overflow: hidden;
  }
  &-wrapper {
    position: relative;
  }
  &-dots {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    padding: 8px 0;
    > span {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      font-size: 12px;
      margin: 0.3em;
      background: $bg-gray-light;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: $bg-black;
        color: white;
        &:hover {
          cursor: default;
        }
      }
    }
  }
}
</style>
