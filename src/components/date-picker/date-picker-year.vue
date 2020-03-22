<template>
  <div class="z-view-date-picker-content-years-panel">
    <ul>
      <li v-for="row in 4" :key="row">
        <span v-for="column in 3" :key="column" @click="clickYearCell(column + (row - 1) * 3 - 2 + x)"
              :class="{ 'z-view-date-picker-year-cell-selected': isSelectedYear(column + (row - 1) * 3 - 2 + x)}" >
           {{ column + (row - 1) * 3 - 2 + x }}
         </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'zViewDatePickerYearPanel',
    props: {
      selected: {
        type: Date
      }
    },
    computed: {
      x(){
        if(this.date instanceof Date) {
          return this.date.getFullYear()
        }
      },
      date(){
        if(this.selected instanceof Date){
          return new Date(this.selected)
        }else{
          return new Date()
        }
      }
    },
    methods: {
      clickYearCell(year) {
        this.date.setFullYear(year)
        this.$emit('update:selected', new Date(this.date))
      },
      isSelectedYear(year){
        if(this.date instanceof Date) {
          return this.date.getFullYear() === year
        }
      }
    }
  }
</script>
