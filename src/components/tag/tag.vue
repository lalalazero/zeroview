<template>
  <span class="z-view-tag" :class="{ [`z-view-tag-${type}`]: !!type, [`z-view-tag-${size}`]: !!size }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'zViewTag',
  props: {
    type: {
      type: String,
      default: 'success',
      validator(value) {
        return ['success', 'warn', 'info', 'error'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['lg', 'md', 'sm'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss">
.z-view-tag {
  height: $--button-height;
  font-size: $--font-size;
  color: white;
  border-radius: 4px;
}

.z-view-tag-lg {
  padding: 5px 10px;
}

.z-view-tag-md {
  padding: 5px 5px;
}

.z-view-tag-sm {
  padding: 2px 4px;
  border-radius: 2px;
}

.z-view-tag-success {
  background-color: $--success-color !important;
}

.z-view-tag-info {
  background-color: $--info-color !important;
}

.z-view-tag-warn {
  background-color: $--warn-color !important;
}

.z-view-tag-error {
  background-color: $--error-color !important;
}
</style>
