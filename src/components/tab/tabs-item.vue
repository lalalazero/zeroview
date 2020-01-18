<template>
  <div class="z-view-tabs-item" @click="onClick" :class="classes" :data-name="name">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "zViewTabsItem",
  inject: {
    eventBus: {
      default: new Vue()
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      active: false
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled
      };
    }
  },
  mounted() {
    // console.log('tabs-item 收到 tabs 提供的 eventBus')
    // console.log(this.eventBus)
    this.eventBus &&
      this.eventBus.$on("update:selected", name => {
        this.active = name === this.name;
        // console.log('item 组件收到了 update:selected 事件', name)
      });
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      this.eventBus && this.eventBus.$emit("update:selected", this.name, this);
      // 为了测试
      this.$emit("click", this);
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-tabs-item {
  // flex-grow: 1;
  flex-shrink: 0;
  padding: 1em;
  cursor: pointer;
  &.active {
    color: $--primary-color;
  }
  &.disabled {
    color: $disabled-color;
    cursor: not-allowed;
  }
  //   outline: 1px solid red;
}
</style>
