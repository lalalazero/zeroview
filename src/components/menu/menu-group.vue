<template>
  <ul class="z-view-menu-group" :class="classes">
    <li v-if="direction === 'vertical'" class="z-view-menu-group-label"  >{{ name }}</li>
    <slot />
  </ul>
</template>
<script>
export default {
  name: "zViewMenuGroup",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classes() {
      return [`direction-${this.direction}`];
    }
  },
  provide() {
    return {
      name: this.name
    };
  },
  inject: ['direction']
};
</script>
<style lang="scss" scoped>
.z-view-menu-group {
  // padding-left: 5px;
  .z-view-menu-group-label {
    font-size: 0.5em;
    color: #aaa;
    // margin-bottom: 10px;
    margin-left: 2em;
    // border-top: 1px solid #ccc;
    // background: #ccc;
    padding: 0.5em 1em 0.5em 2em;
  }
}
</style>
