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
        <span v-for="column in 3" :key="column"
              :class="{'z-view-date-picker-year-cell-selected': isYearSelected(column + (row - 1) * 3 - 2 + yearStart)}"
              @click="clickYearCell(column + (row - 1) * 3 - 2 + yearStart)">
           {{ column + (row - 1) * 3 - 2 + yearStart }}
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
    data(){
      return {
        date: new Date()
      }
    },
    watch: {
      selected(){
        if(this.selected instanceof Date){
          this.date = this.selected
        }
      },
    },
    computed: {
      fullYear(){
        if(this.date instanceof Date) {
          return this.date.getFullYear()
        }
      },
      yearStart(){
        if(typeof this.fullYear === 'number'){
          return parseInt(this.fullYear / 10, 10) * 10
        }

      },
      yearEnd(){
        if(typeof this.yearStart === 'number'){
          return this.yearStart + 9
        }
      },
      yearRange(){
        return `${this.yearStart}-${this.yearEnd}`
      }
    },
    methods: {
      clickYearCell(year) {
        this.date.setFullYear(year)
        this.$emit('update:selected', new Date(this.date))
        this.$emit('click:year-cell')
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 10 : newDate.getFullYear() - 10
        newDate.setFullYear(year)
        this.date = newDate
      },
      isYearSelected(year){
        if(this.selected instanceof Date) {
          return this.selected.getFullYear() === year
        }
      }
    },
    mounted() {
      if(this.selected instanceof Date){
        this.date = this.selected
      }
    }
  }
</script>
