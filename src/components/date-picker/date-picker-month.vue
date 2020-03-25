<template>
  <div>
    <div class="z-view-date-picker-nav">
      <Icon name="prev-double" @click="clickYearNav('prev')"/>
      <span @click="clickYear">{{ year }}年</span>
      <Icon @click="clickYearNav('next')" name="next-double" />
    </div>
    <div class="z-view-date-picker-content-wrapper">
      <div class="z-view-date-picker-content-months-panel">
        <ul>
          <li v-for="i in 4" :key="i" >
        <span v-for="j in 3"
              class="z-view-date-picker-month-cell"
              :class="{'z-view-date-picker-month-cell-selected': isMonthSelected((i - 1) * 3 + j)}"
              :key="j"
              @click="clickMonthCell((i - 1) * 3 + j)">{{ (i - 1) * 3 + j }}月</span>
          </li>
        </ul>
      </div>
    </div>
  </div>


</template>
<script>
  import Icon from '../icon/icon'
  export default {
    name: 'zViewDatePickerMonthPanel',
    components: {
      Icon
    },
    props: {
      selectedMonth: {
        type: Number
      },
      selectedYear: {
        type: Number
      }
    },
    data(){
      return {
        date: new Date(),
        clickFlag: 1,
      }
    },
    watch: {
      selectedMonth(){
        if(typeof this.selectedMonth === 'number'){
          this.date.setMonth(this.selectedMonth)
          this.date = new Date(this.date)
        }
      },
      selectedYear(){
        if(typeof this.selectedYear === 'number'){
          this.date.setFullYear(this.selectedYear)
          this.date = new Date(this.date)
        }
      },
    },
    computed: {
      year(){
        return this.date.getFullYear()
      }
    },
    methods: {
      clickMonthCell(month){
        this.date.setMonth(month - 1)
        this.$emit('update:selectedMonth', month - 1)
        this.$emit('update:selectedYear', this.year)
        this.$emit('click:month-cell')
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 1 : newDate.getFullYear() - 1
        newDate.setFullYear(year)
        this.date = newDate
      },
      isMonthSelected(month){
        let f1 = this.year === this.selectedYear
        let f2 = month - 1 === this.selectedMonth
        return f1 && f2
      },
      clickYear(){
        this.clickFlag++
        if(this.clickFlag % 2 === 0){
          this.$emit('update:mode','year')
        }else if(this.clickFlag % 2 === 1){
          if(this.mode === 'day'){
            this.$emit('update:mode','day')
          }else {
            this.$emit('closePanel')
          }
        }
      }
    },
    mounted() {
      if(typeof this.selectedMonth === 'number'){
        this.date.setMonth(this.selectedMonth)
      }
      if(typeof this.selectedYear === 'number'){
        this.date.setFullYear(this.selectedYear)
      }
    }

  }
</script>
