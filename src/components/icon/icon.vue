<template>
  <svg v-if="name" class="z-view-icon" @click="$emit('click')">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script>
import "./svgIcon.js";
export default {
  name: "zViewIcon",
  props: {
    name: {
      type: String,
      default: "",
      validator(value) {
        return value !== undefined;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-icon {
  width: 1em;
  height: 1em;
}
</style>


