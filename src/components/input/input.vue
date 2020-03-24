<template>
  <div class="z-view-input-wrapper" :class="{ 'error': error }">
    <input
      :value="value"
      :placeholder="placeholder"
      type="text"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      :readonly="readonly"
    />
    <template v-if="error">
      <Icon name="error" class="icon-error" />
      <span class="error-msg">{{error}}</span>
    </template>
  </div>
</template>
<script>
import Icon from "../icon/icon.vue";
export default {
  name: "zViewInput",
  components: {
    Icon
  },
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    },
    placeholder: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>

.z-view-input-wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  > :not(:last-child) {
    margin-right: 0.5em;
  }
  > input {
    font-size: inherit;
    height: $height;
    border: 1px solid $border-color;
    padding: 0 8px;
    border-radius: $border-radius;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      outline: none;
      box-shadow: inset 0 1px 3px $box-shadow-color;
    }
    &[disabled],
    &[readonly] {
      border-color: #ccc;
      color: #ccc;
      cursor: not-allowed;
    }
  }
  &.error {
    > input {
      border-color: $error-color;
      &:focus {
        box-shadow: inset 0 1px 3px $error-color;
      }
    }
  }
  .icon-error {
    fill: $error-color;
  }
  .error-msg {
    color: $error-color;
  }
}
</style>


