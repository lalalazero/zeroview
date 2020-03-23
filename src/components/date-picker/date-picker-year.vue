<template>
  <div>
    <div class="z-view-date-picker-nav">
      <Icon name="prev-double" @click="clickYearNav('prev')"/>
      <span @click="clickYearRange">{{ yearRange }}</span>
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
      selectedYear: {
        type: Number
      },
      mode: {
        type: String
      }
    },
    data(){
      return {
        date: new Date(),
        flag: true
      }
    },
    watch: {
      selectedYear(){
        if(typeof this.selectedYear === 'number'){
          this.date.setFullYear(this.selectedYear)
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
        this.$emit('update:selectedYear', year)
        this.$emit('click:year-cell')
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 10 : newDate.getFullYear() - 10
        newDate.setFullYear(year)
        this.date = newDate
      },
      isYearSelected(year){
        return this.selectedYear === year
      },
      clickYearRange(){
        if(this.mode === 'year'){
          this.$emit('closePanel')
        }else{
          this.$emit('update:mode','month')
        }
      }
    },
    mounted() {
      if(typeof this.selectedYear === 'number'){
        this.date.setFullYear(this.selectedYear)
      }
    }
  }
</script>
