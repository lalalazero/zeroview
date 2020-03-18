<template>
  <div class="z-view-date-picker" v-click-out-side="onBlur">
    <Input @focus="onFocus" :value="formattedValue"/>
    <div class="z-view-date-picker-panel" v-if="popVisible">
      <div class="z-view-date-picker-nav">
        <Icon name="prev-double" @click="clickPrevYear"/><Icon name="left" @click="clickPrevMonth" class="z-view-date-picker-nav-icon-left"/><span @click="onClickYear">{{ currentYear }}年</span><span @click="onClickMonth">{{ currentMonth }}月</span><Icon name="right" @click="clickNextMonth" class="z-view-date-picker-nav-icon-right" /><Icon @click="clickNextYear" name="next-double" />
      </div>
      <div class="z-view-date-picker-content-wrapper">
        <div v-if="mode === 'day'" class="z-view-date-picker-content-days-panel">
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
        </div>
        <div v-if="mode === 'month'" class="z-view-date-picker-content-months-panel">月</div>
        <div v-if="mode === 'year'" class="z-view-date-picker-content-years-panel">年</div>
      </div>
      <div class="z-view-date-picker-footer"></div>
    </div>
  </div>
</template>
<script>
import Input from '../input/input.vue'
import Icon from '../icon/icon.vue'
import ClickOutSide from '@/directives/click-outside.js'
import { firstDayOfMonth, lastDayOfMonth, getYearMonthDate, WEEKDAYS } from './helper'
export default {
  name: 'zViewDatePicker',
  directives: { ClickOutSide },
  components: {
    Input,
    Icon,
  },
  data(){
    return {
      popVisible: false,
      mode: 'day',
      date: new Date(),
      days: [],
      WEEKDAYS,
      today: new Date(),
      selected: new Date()
    }
  },
  computed: {
    formattedValue(){
      if(this.selected instanceof Date){
        const { year, month, day } = getYearMonthDate(this.selected)
        return `${year}/${month+1}/${day}`
      }
    },
    currentYear(){
      if(this.date instanceof Date){
        return this.date.getFullYear()
      }
    },
    currentMonth(){
      if(this.date instanceof Date){
        return this.date.getMonth() + 1
      }
    }
  },
  methods: {
    onFocus(){
      this.popVisible = true
    },
    onBlur(){
      this.popVisible = false
    },
    onClickMonth(){
      this.mode = 'month'
    },
    onClickYear(){
      this.mode = 'year'
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
    getDays(){
      let currentMonthDays = this.getCurrentMonthDays()
      let previousMonthDays = this.getPreviousMonthDays()
      let len = currentMonthDays.length + previousMonthDays.length
      let nextMonthDays = this.getNextMonthDays(42 - len)
      return [...previousMonthDays,...currentMonthDays, ...nextMonthDays]
    },
    isCurrentMonth(date){
      if(!(date instanceof Date)) return
      let { year, month, day } = getYearMonthDate(date)
      return month === this.date.getMonth()
    },
    isToday(date){
      if(!(date instanceof Date)) return
      let { year, month, day } = getYearMonthDate(date)
      let { year: year2, month: month2, day: day2 } = getYearMonthDate(this.today)
      return year === year2 && month === month2 && day === day2
    },
    isSelected(date){
      if(!(date instanceof Date)) return
      if(!this.selected) return false
      let { year, month, day } = getYearMonthDate(date)
      let { year: year2, month: month2, day: day2 } = getYearMonthDate(this.selected)
      return year === year2 && month === month2 && day === day2
    },
    classes(date){
      return {
        'z-view-date-picker-cell-inview': this.isCurrentMonth(date),
        'z-view-date-picker-cell-today': this.isToday(date),
        'z-view-date-picker-cell-selected': this.isSelected(date),
      }
    },
    clickDateCell(date){
      if(!(date instanceof Date)) return
      this.selected = date
      this.popVisible = false
    },
    clickNextMonth(){
      let newDate = new Date(this.date.getTime())
      newDate.setMonth(newDate.getMonth() + 1)
      this.date = newDate
      this.days = this.getDays()
    },
    clickNextYear(){
      let newDate = new Date(this.date.getTime())
      newDate.setFullYear(newDate.getFullYear() + 1)
      this.date = newDate
      this.days = this.getDays()
    },
    clickPrevMonth(){
      let newDate = new Date(this.date.getTime())
      newDate.setMonth(newDate.getMonth() - 1)
      this.date = newDate
      this.days = this.getDays()

    },
    clickPrevYear(){
      let newDate = new Date(this.date.getTime())
      newDate.setFullYear(newDate.getFullYear() - 1)
      this.date = newDate
      this.days = this.getDays()
    }
  },
  mounted(){
    this.days = this.getDays()
  },
}
</script>
<style lang="scss" scoped>
.z-view-date-picker {
  display: inline-block;
  border: 1px solid red;
  &-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    > span {
      user-select: none;
      &:hover {
        cursor: pointer;
        color: $--primary-color;
      }
    }
    svg {
      fill: #ccc;
      &:hover {
        cursor: pointer;
        fill: $bg-black;
      }
    }
    &-icon-left {
      margin-left: -25px;
      /*transform: scale(1.2);*/
    }
    &-icon-right {
      margin-right: -25px;
      /*transform: scale(1.2);*/
    }
  }
  &-panel {
    padding: 5px 10px;
    width: 280px;
    position: absolute;
    background: #fff;
    z-index: 3;
    border: 1px solid #000;
  }
  &-content-days-panel {
    padding: 10px 0;
    &-weekends {
      display: flex;
      justify-content: space-evenly;
    }
    &-days {
      li {
        display: flex;
        justify-content: space-evenly;
        margin: 2px 0;
      }
    }
  }
  &-weekday-cell {
    width: 36px;
    height: 30px;
    user-select: none;
  }
  &-day-cell {
    width: 24px;
    height: 24px;
    color: rgba(0, 0, 0, 0.25);
    &:hover {
      background: #f5f5f5;
    }
  }
  &-weekday-cell,&-cell,&-day-cell {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &-cell {
    padding: 3px 0;
    width: 36px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.25);
    &-inview {
      > span {
        color: rgba(0, 0, 0, 0.65);
      }

    }
    &-today {
      .z-view-date-picker-day-cell {
        border: 1px solid $--primary-color;
      }
    }
    &-selected{
      .z-view-date-picker-day-cell {
        background: $--primary-color;
        border: none;
        color: #fff;
      }
    }
  }

}
</style>