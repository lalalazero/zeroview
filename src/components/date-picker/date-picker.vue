<template>
  <div class="z-view-date-picker" v-click-out-side="onBlur">
    <Input @focus="onFocus"/>
    <div class="z-view-date-picker-panel" v-if="popVisible">
      <div class="z-view-date-picker-nav">
        <Icon name="prev-double" /><Icon name="left" /><span @click="onClickYear">2020年</span><span @click="onClickMonth">8月</span><Icon name="right" /><Icon name="next-double" />
      </div>
      <div class="z-view-date-picker-content-wrapper">
        <div v-if="mode === 'day'" class="z-view-date-picker-content-days">日</div>
        <div v-if="mode === 'month'" class="z-view-date-picker-content-months">月</div>
        <div v-if="mode === 'year'" class="z-view-date-picker-content-years">年</div>
      </div>
      <div class="z-view-date-picker-footer"></div>
    </div>
  </div>
</template>
<script>
import Input from '../input/input.vue'
import Icon from '../icon/icon.vue'
import ClickOutSide from '@/directives/click-outside.js'
import { firstDayOfMonth, lastDayOfMonth } from './helper'
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
      value: new Date()
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
    getFullYearDate(year){
      for(let i = 0; i <= 11; i++){
        let date = new Date(year,i,10)
        let firstDay = firstDayOfMonth(date)
        console.log(firstDay.toLocaleDateString())
        let lastDay = lastDayOfMonth(date)
        console.log(lastDay.toLocaleDateString())
      }
    }
  },
  mounted(){
    this.getFullYearDate(2019)
  },
}
</script>
<style lang="scss" scoped>
.z-view-date-picker {
  display: inline-block;
  border: 1px solid red;
  &-panel {
    width: 188px;
    position: absolute;
    background: #fff;
    z-index: 3;
    border: 1px solid #000;
  }
}
</style>
