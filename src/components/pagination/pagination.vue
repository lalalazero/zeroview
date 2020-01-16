<template>
  <div class="z-view-pagination">
    <span class="z-view-pagination-item" @click="onClick(page)" :key="index" v-for="(page, index) in pages" :class="{active: current === page}">{{page}}</span>
  </div>
</template>
<script>
import { unique } from './utils.js'
export default {
  name: 'zViewPagination',
  props: {
    totalPages: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data(){

    let pages = unique([1,this.current-1,this.current-2,this.current,this.current+1,this.current+2,this.totalPages])
    .filter(x => x >= 1 && x <= this.totalPages)
    .sort((a,b)=> a - b)
    pages = pages.reduce((prev, current, index, array)=>{
      prev.push(current)
      if(array[index+1] && (array[index+1] - array[index] >= 2)){
        prev.push('...')
      }
      return prev
    },[])
    return {
      pages: pages
    }
  },
  methods: {
    onClick(page){
      if(typeof page === 'number' && page >= 1 && page <= this.totalPages){
        this.$emit('update:current', page)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.z-view-pagination {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &-item {
    min-width: 20px;
    margin: 0 4px;
    padding: 2px 6px;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: 14px;
    &.active {
      border-color: $active-color;
    }
  }
  &-item:first-child {
    margin-left: 0
  }
  &-item:last-child {
    margin-right: 0
  }
}
</style>
