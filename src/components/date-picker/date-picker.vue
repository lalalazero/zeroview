<template>
  <div class="z-view-date-picker" v-click-out-side="onBlur">
    <Input @focus="onFocus" :value="formattedValue"/>
    <div class="z-view-date-picker-panel" v-show="popVisible">
      <DayPanel v-show="visiblePanelMode === 'day'"
                @update:mode="visiblePanelMode = $event"
                :selected.sync="selected" @click:day-cell="popVisible = false"/>
      <MonthPanel v-show="visiblePanelMode === 'month'"
                  @update:mode="visiblePanelMode = $event"
                  :selected.sync="selected"
                  @click:month-cell="onMonthSelected"></MonthPanel>
      <YearPanel v-show="visiblePanelMode === 'year'" :selected.sync="selected" @click:year-cell="onYearSelected"></YearPanel>
      <div class="z-view-date-picker-footer"></div>
    </div>
  </div>
</template>
<script>
import Input from '../input/input.vue'
import Icon from '../icon/icon.vue'
import ClickOutSide from '@/directives/click-outside.js'
import DayPanel from './date-picker-day'
import MonthPanel from './date-picker-month'
import YearPanel from './date-picker-year'
import { getYearMonthDate } from './helper'
export default {
  name: 'zViewDatePicker',
  directives: { ClickOutSide },
  components: {
    Input,
    Icon,
    DayPanel,
    MonthPanel,
    YearPanel
  },
  data(){
    return {
      popVisible: false,
      visiblePanelMode: 'day',
      date: undefined,
      days: [],
      years: [],
      today: new Date(),
      selected: undefined,
      selectedMonth: undefined,
      x: undefined
    }
  },
  props: {
    value: {
      type: [Date, String],
    },
    mode: {
      type: String,
      default: 'day',
      validator(value){
        return ['day', 'year', 'month'].indexOf(value) >= 0
      }
    }
  },
  computed: {
    formattedValue(){
      let formateValue = ''
      if(this.selected instanceof Date){
        const { year, month, day } = getYearMonthDate(this.selected)
        if(this.mode === 'day'){
          formateValue = `${year}/${month+1}/${day}`
        }else if(this.mode === 'month'){
          formateValue = `${year}/${month+1}`
        }else if(this.mode === 'year') {
          formateValue = `${year}`
        }
      }
      return formateValue
    },
    // yearRange(){
    //   return `${this.x}-${this.x + 9}`
    // },
    year(){
      if(this.selected instanceof Date){
        return this.selected.getFullYear()
      }else if(this.date instanceof Date){
        return this.date.getFullYear()
      }
    },
    month(){
      if(this.selected instanceof Date){
        return this.selected.getMonth() + 1
      }else if(this.date instanceof Date){
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
      this.visiblePanelMode = 'month'
    },
    onClickYear(){
      this.visiblePanelMode = 'year'
    },
    onMonthSelected(){
      if(this.mode === 'day'){
        this.visiblePanelMode = 'day'
      }else{
        this.popVisible = false
      }
    },
    onYearSelected(){
      if(this.mode !== 'year'){
        this.visiblePanelMode = 'month'
      }else{
        this.popVisible = false
      }
    },

    updateDate(newDate){
      this.date = newDate
      let { year, month } = getYearMonthDate(newDate)
      this.x = year
      this.selectedMonth = month + 1
    },

    initDaysPanel(){
      let { year, month } = getYearMonthDate(this.date)
      this.x = year
      this.selectedMonth = month + 1
    },
    checkValue(){
      this.visiblePanelMode = this.mode
      if(!this.value) {
        this.date = new Date()
        this.initDaysPanel()
        return
      }
      if(typeof this.value === 'string'){
        this.date = new Date(this.value)
        this.selected = new Date(this.value)
      }else if(this.value instanceof Date){
        this.date = new Date(this.value.getTime())
        this.selected = new Date(this.value.getTime())
      }
      this.initDaysPanel()
    }
  },
  mounted(){
    this.checkValue()
  },
}
</script>
<style lang="scss" scoped>
/deep/ .z-view-date-picker {
  display: inline-block;
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
    @extend %box-shadow;
  }
  &-content-wrapper {
    height: 244px;
  }
  &-content-years-panel {
    ul>li {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 17px 0;
    }
    ul>li>span {
      width: 60px;
      height: 24px;
      padding: 2px 0;
      display: inline-block;
      text-align: center;
      &:hover {
        background: #ccc;
      }

    }
    ul > li:first-child {
      >span:first-child {
        color: #ccc;
      }
    }
    ul > li:last-child {
      >span:last-child {
        color: #ccc;
      }
    }
  }
  &-content-months-panel {
    ul {
      li {
        &:first-child {
          margin-top: 15px;
        }
        padding: 17px 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        span {
          width: 60px;
          height: 24px;
          padding: 2px 0;
          display: inline-block;
          text-align: center;
          &:hover {
            background: #ccc;
          }
        }
      }
    }

  }
  &-content-days-panel {
    padding: 6px 0;
    &-weekends {
      display: flex;
      justify-content: space-evenly;
    }
    &-days {
      li {
        display: flex;
        justify-content: space-evenly;
        span {
          font-size: 14px;
        }
        // margin: 2px 0;
      }
    }
    &-actions {
      cursor: pointer;
      padding: 5px 0;
      border-top: 1px solid #ccc;
      text-align: center;
      color: $--primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
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
  &-month-cell-selected, &-year-cell-selected{
    background: $--primary-color;
    border: none;
    color: #fff;
  }

}
</style>
