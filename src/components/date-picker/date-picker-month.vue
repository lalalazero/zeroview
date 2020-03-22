<template>
  <div>
    <div class="z-view-date-picker-nav">
      <Icon name="prev-double" @click="clickYearNav('prev')"/>
      <span @click="$emit('update:mode','year')">{{ year }}年</span>
      <Icon @click="clickYearNav('next')" name="next-double" />
    </div>
    <div class="z-view-date-picker-content-wrapper">
      <div class="z-view-date-picker-content-months-panel">
        <ul>
          <li v-for="i in 4" :key="i" >
        <span v-for="j in 3"
              class="z-view-date-picker-month-cell"
              :key="j"
              :class="{ 'z-view-date-picker-month-cell-selected': isSelectedMonth((i - 1) * 3 + j)}"
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
      selected: {
        type: Date
      }
    },
    computed: {
      yearSelected(){
        if(this.selected instanceof Date){
          return this.selected.getFullYear()
        }
      },
      monthSelected(){
        if(this.selected instanceof Date) {
          return this.selected.getMonth() + 1
        }
      },
      date(){
        if(this.selected instanceof Date){
          return new Date(this.selected)
        }else{
          return new Date()
        }
      },
      year(){
        return this.date.getFullYear()
      }
    },
    methods: {
      clickMonthCell(month){
        this.date.setMonth(month - 1)
        this.$emit('update:selected', new Date(this.date))
        this.$emit('click:month-cell')
      },
      isSelectedMonth(month){
        if(this.date instanceof Date) {
          let year = this.date.getFullYear()
          return month === this.monthSelected && year === this.yearSelected
        }
      },
      clickYearNav(type){
        let newDate = new Date(this.date)
        let year = type === 'next' ? newDate.getFullYear() + 1 : newDate.getFullYear() - 1
        newDate.setFullYear(year)
        this.$emit('update:selected', newDate)
      },
    },

  }
</script>
