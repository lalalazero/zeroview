<template>
  <div>
    <div class="z-view-date-picker-nav">
      <Icon name="prev-double" @click="clickYearNav('prev')"/>
      <span @click="$emit('update:mode','year')">{{ yearRange }}</span>
      <Icon @click="clickYearNav('next')" name="next-double" />
    </div>
    <div class="z-view-date-picker-content-wrapper">
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
    </div>
  </div>
</template>
<script>
  import Icon from '../icon/icon'
  export default {
    name: 'zViewDatePickerYearPanel',
    components: {
      Icon
    },
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
      },
      yearRange(){
        return `${this.x}-${this.x + 9}`
      }
    },
    methods: {
      clickYearCell(year) {
        this.date.setFullYear(year)
        this.$emit('update:selected', new Date(this.date))
        this.$emit('click:year-cell')
      },
      isSelectedYear(year){
        if(this.date instanceof Date) {
          return this.date.getFullYear() === year
        }
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 10 : newDate.getFullYear() - 10
        newDate.setFullYear(year)
        this.$emit('update:selected', newDate)
      },
    }
  }
</script>
