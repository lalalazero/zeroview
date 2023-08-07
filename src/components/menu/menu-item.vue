<template>
  <li class="z-view-menu-item" ref="menuItem" :data-name="name" :class="classes" @click="onClick">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name: "zViewMenuItem",
  props: {
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      active: false,
      level: 0
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
        vertical: this.direction === "vertical",
        horizontal: this.direction === "horizontal"
      };
    }
  },
  inject: ["eventBus", "direction"],
  methods: {
    onSelectedChange(name) {
      this.active = name === this.name;
    },
    onClick() {
      this.eventBus && this.eventBus.$emit("update:selected", this.name);
    },
    indentSelf() {
      let parent = this.$parent;
      let level = 0;
      while (parent.$options.name !== "zViewMenu") {
        if (parent.$options.name !== "zViewMenuGroup") {
          level += 1;
        }
        parent = parent.$parent;
      }
      if (level > 0) {
        this.level = level;
        this.$refs.menuItem.style.paddingLeft = `${level + 2}em`; // 基础 paddingLeft = 2em
      }
    },
    reportToParent() {
      if (this.$parent.$options.name === "zViewSubMenu") {
        this.$parent.addChild(this.name);
      }
    }
  },

  mounted() {
    this.reportToParent();
    if (this.eventBus) {
      this.eventBus.$on("update:selected", this.onSelectedChange);
    }
    if (this.direction === "vertical") {
      this.indentSelf();
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-menu-item {
  display: block;
  position: relative;
  &.vertical {
    /* margin: 0.5em; */
    &.active {
      background: $active-bg;
      color: $active-color;
      border-right: 2px solid $active-color;
      margin-right: -1px;
    }
  }
  &.horizontal {
    padding: 0.5em 2em;
    word-break: keep-all;
    &.active {
      color: $active-color;
      &::after {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 0;
        border-bottom: 2px solid $active-color;
        left: 0;
        bottom: 0;
      }
    }
  }

  &:hover {
    color: $active-color;
  }
}
</style>
