<template>
  <ul class="z-view-menu" :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
import Vue from "vue";
export default {
  name: "zViewMenu",
  props: {
    singleOpen: {
      type: Boolean
    },
    selected: {
      type: String
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) >= 0;
      }
    }
  },
  computed: {
    classes() {
      return [`direction-${this.direction}`];
    }
  },
  data() {
    return {
      eventBus: new Vue(),
      openMenu: []
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
      direction: this.direction
    };
  },
  methods: {
    onMenuOpen(name) {
      if (this.singleOpen) {
        this.eventBus.$emit("update:open", name);
      }
    }
  },
  updated(){
    this.eventBus.$emit("update:selected", this.selected);
  },
  mounted() {
    this.eventBus.$on("add:open", this.onMenuOpen);
    this.eventBus.$emit("update:selected", this.selected);
    // this.eventBus.$on('remove:open',this.onMenuClose)
  }
};
</script>
<style lang="scss" scoped>
.z-view-menu, .z-view-menu-group {
  display: flex;
  user-select: none;

  &.direction-horizontal {
    border-bottom: 1px solid $border-color-1;
  }

  &.direction-vertical {
    flex-direction: column;
    border-right: 1px solid $border-color-1;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
