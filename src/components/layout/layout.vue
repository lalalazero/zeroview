<template>
  <div class="z-view-layout" :class="{ 'hasSider': hasSider }">
    <div class="z-view-header">
      <slot name="header" />
    </div>
    <transition name="fade" v-if="hasSider">
      <div class="z-view-sider">
        <slot name="sider" />
      </div>
    </transition>
    <div class="z-view-content">
      <slot name="content" />
    </div>
    <div class="z-view-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  name: "zViewLayout",
  props: {
    hasSider: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
.z-view-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &.hasSider {
    flex-direction: row;
  }
}

.z-view-sider {
  flex-shrink: 0;
  position: relative;

  >button {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.z-view-content {
  flex-grow: 1;
}
</style>
