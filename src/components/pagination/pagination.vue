<template>
  <div class="z-view-pagination" v-if="!hideIfOnePage || totalPages > 1" :class="{'z-view-pagination-simple': simple}">
    <span
      class="z-view-pagination-nav z-view-pagination-nav-prev"
      @click="onClick(current-1)"
      :class="{'z-view-pagination-nav-disabled': current === 1}"
    >
      <z-view-icon name="left"></z-view-icon>
    </span>
    <template v-for="(page, index) in pages">
      <span :key="index" v-if="page === '...'" class="z-view-pagination-seperator">{{page}}</span>
      <span
        :key="index"
        v-else
        class="z-view-pagination-item"
        @click="onClick(page)"
        :class="{'z-view-pagination-item-active': current === page}"
      >{{page}}</span>
    </template>
    <span
      class="z-view-pagination-nav z-view-pagination-nav-next"
      @click="onClick(current+1)"
      :class="{'z-view-pagination-nav-disabled': current === totalPages}"
    >
      <z-view-icon name="right"></z-view-icon>
    </span>
  </div>
</template>
<script>
import { unique } from "./utils.js";
import zViewIcon from "../icon/icon.vue";
export default {
  name: "zViewPagination",
  components: {
    zViewIcon
  },
  props: {
    totalPages: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pages() {
      let pages = []
      if (this.totalPages > 5) {
        pages = unique([
          1,
          this.current - 1,
          this.current - 2,
          this.current,
          this.current + 1,
          this.current + 2,
          this.totalPages
        ])
          .filter(x => x >= 1 && x <= this.totalPages)
          .sort((a, b) => a - b);
        pages = pages.reduce((prev, current, index, array) => {
          prev.push(current);
          if (array[index + 1] && array[index + 1] - array[index] >= 2) {
            prev.push("...");
          }
          return prev;
        }, []);
      }else {
        for(let i = 1; i <= this.totalPages; i++){
          pages.push(i)
        }
      }
      return pages;
    }
  },
  methods: {
    onClick(page) {
      if (typeof page === "number" && page >= 1 && page <= this.totalPages) {
        this.$emit("update:current", page);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-pagination {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  $height: 24px;
  &-nav,
  &-seperator,
  &-item {
    border: 1px solid $border-color;
    border-radius: $border-radius;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    height: $height;
    margin: 0 4px;
    font-size: 14px;
  }
  &-seperator,
  &-item {
    width: 20px;
    padding: 2px 8px;
  }
  &-seperator {
    cursor: default;
    border: none;
  }
  &-nav {
    padding: 2px 4px;
    &:hover {
      border-color: $active-color;
      svg {
        fill: $active-color;
      }
    }
    &-disabled {
      color: $disabled-color;
      border-color: $disabled-color;
      &:hover {
        cursor: not-allowed;
        border-color: $disabled-color;
      }
      svg {
        fill: $disabled-color;
      }
    }
  }
  &-item {
    min-width: 20px;
    width: unset;
    &:hover {
      border-color: $active-color;
    }
    &-active {
      border-color: $active-color;
      cursor: default;
    }
  }
  &-item:first-child {
    margin-left: 0;
  }
  &-item:last-child {
    margin-right: 0;
  }
}

.z-view-pagination-simple {
  .z-view-pagination {
    &-item,&-nav {
      border-color: transparent;

    }
    &-item {
      &:hover{
        color: $active-color;
        border-color: $active-color;
      }
      &-active {
        color: $active-color;
      }
    }
  }
}
</style>
