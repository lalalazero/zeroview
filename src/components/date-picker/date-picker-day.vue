<template>
  <div>
    <div class="z-view-date-picker-nav">
      <Icon name="prev-double" @click="clickYearNav('prev')"/>
      <Icon name="left" @click="clickMonthNav('prev')" class="z-view-date-picker-nav-icon-left"/>
      <span @click="$emit('update:mode','year')">{{ year }}年</span>
      <span @click="$emit('update:mode','month')">{{ month }}月</span>
      <Icon name="right" @click="clickMonthNav('next')" class="z-view-date-picker-nav-icon-right" />
      <Icon @click="clickYearNav('next')" name="next-double" />
    </div>
    <div class="z-view-date-picker-content-wrapper">
      <div class="z-view-date-picker-content-days-panel">
        <ul class="z-view-date-picker-content-days-panel-weekends">
          <li v-for="weekday in 7" :key="weekday" class="z-view-date-picker-weekday-cell">
            {{ WEEKDAYS[weekday - 1] }}
          </li>
        </ul>
        <ul v-if="days.length > 0" class="z-view-date-picker-content-days-panel-days">
          <li v-for="week in 6" :key="`${week}`">
                <span v-for="day in 7" :key="`${week}-${day}`" class="z-view-date-picker-cell" @click="clickDateCell(days[(day + 7 * (week - 1)) - 1])"
                      :class="classes(days[(day + 7 * (week - 1)) - 1])">
                  <span class="z-view-date-picker-day-cell">{{ days[(day + 7 * (week - 1)) - 1].getDate() }}</span>
                </span>
          </li>
        </ul>
        <div class="z-view-date-picker-content-days-panel-actions" @click="clickToday()">今天</div>
      </div>
    </div>
  </div>

</template>
<script>
  import Icon from '../icon/icon'
  import { firstDayOfMonth, getYearMonthDate, lastDayOfMonth, WEEKDAYS } from './helper'
  export default {
    name: 'zViewDatePickerDayPanel',
    components: {
      Icon
    },
    props: {
      selectedMonth: {
        type: Number
      },
      selectedYear: {
        type: Number
      },
      selectedDay: {
        type: Number
      }
    },
    methods: {
      classes(date){
        return {
          'z-view-date-picker-cell-inview': this.isCurrentMonth(date),
          'z-view-date-picker-cell-today': this.isToday(date),
          'z-view-date-picker-cell-selected': this.isSelectedDay(date),
        }
      },
      isToday(date){
        let { year, month, day } = getYearMonthDate(date)
        let { year: year2, month: month2, day: day2 } = getYearMonthDate(this.today)
        return year === year2 && month === month2 && day === day2
      },
      isSelectedDay(date){
        let { year, month, day } = getYearMonthDate(date)
        let { selectedYear, selectedDay, selectedMonth } = this
        return year === selectedYear && month === selectedMonth && day === selectedDay
      },
      isCurrentMonth(date){
        if(!(date instanceof Date)) return
        return date.getMonth() === this.date.getMonth()
      },
      clickDateCell(date){
        console.log('click date cell')
        if(!(date instanceof Date)) return
        const { year, month, day } = getYearMonthDate(date)
        console.log(year,month,day)
        this.$emit('update:selectedDay', day)
        this.$emit('update:selectedMonth', month)
        this.$emit('update:selectedYear', year)
        this.$emit('click:day-cell')
      },
      clickToday(){
        const { year, month, day } = getYearMonthDate(new Date())
        this.$emit('update:selectedDay', day)
        this.$emit('update:selectedMonth', month)
        this.$emit('update:selectedYear', year)
        this.$emit('click:day-cell')
      },
      getDays(){
        if(this.date instanceof Date){
          let currentMonthDays = this.getCurrentMonthDays()
          let previousMonthDays = this.getPreviousMonthDays()
          let len = currentMonthDays.length + previousMonthDays.length
          let nextMonthDays = this.getNextMonthDays(42 - len)
          return [...previousMonthDays,...currentMonthDays, ...nextMonthDays]
        }
        return []

      },
      getCurrentMonthDays(){
        let currentMonthDays = []
        let { year, month, day } = getYearMonthDate(this.date)
        let firstDay = firstDayOfMonth(this.date)
        let lastDay = lastDayOfMonth(this.date)
        let firstDayDate = firstDay.getDate()
        let lastDayDate = lastDay.getDate()
        for(let i = firstDayDate; i <= lastDayDate; i++){
          currentMonthDays.push(new Date(year, month, i))
        }
        return currentMonthDays
      },
      getPreviousMonthDays(){
        // 0 - Sunday
        let firstDay = firstDayOfMonth(this.date)
        let weekDay = firstDay.getDay()
        // 从星期一开始
        let len = 0
        if(weekDay === 0){ // 第一天是周日，往前补6天
          len = 6
        }else if(weekDay === 1){ // 第一天是周一，往前补一个星期
          len = 7
        }else{
          len = weekDay - 1
        }

        let prevMonthDays = []
        let temp = new Date(this.date.getTime())
        temp.setDate(0)
        let lastDayOfLastMonth = new Date(temp.getTime())
        let { year, month, day } = getYearMonthDate(lastDayOfLastMonth)

        for(let i = 0; i < len; i++){
          prevMonthDays.push(new Date(year, month, day - i))
        }
        return prevMonthDays.reverse()
      },
      getNextMonthDays(len){
        let firstDay = firstDayOfMonth(this.date)
        let { year, month, day} =  getYearMonthDate(firstDay)
        let nextMonthDays = []
        for(let i = 0; i < len; i++){
          nextMonthDays.push(new Date(year, month + 1, day + i))
        }
        return nextMonthDays
      },
      clickMonthNav(type){
        if(type === 'next'){
          let newDate = new Date(this.date)
          newDate.setMonth(newDate.getMonth() + 1)
          this.date = newDate
        }else {
          let newDate = new Date(this.date)
          newDate.setMonth(newDate.getMonth() - 1)
          this.date = newDate
        }
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 1 : newDate.getFullYear() - 1
        newDate.setFullYear(year)
        this.date = newDate
      },
    },
    data(){
      return {
        WEEKDAYS,
        date: new Date(),
        today: new Date(),
      }
    },
    mounted() {
      if(typeof this.selectedMonth === 'number'){
        this.date.setMonth(this.selectedMonth)
      }
      if(typeof this.selectedYear === 'number'){
        this.date.setFullYear(this.selectedYear)
      }
      if(typeof this.selectedDay === 'number'){
        this.date.setDate(this.selectedDay)
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
      selectedDay(){
        if(typeof this.selectedDay === 'number'){
          this.date.setDate(this.selectedDay)
          this.date = new Date(this.date)
        }
      },
    },
    computed: {
      days(){
        return this.getDays()
      },
      year(){
        return this.date.getFullYear()
      },
      month(){
        return this.date.getMonth() + 1
      }
    },

  }
</script>
