<template>
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
</template>
<script>
  export default {
    name: 'zViewDatePickerMonthPanel',
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
      }
    },
    methods: {
      clickMonthCell(month){
        this.date.setMonth(month - 1)
        this.$emit('update:selected', new Date(this.date))
      },
      isSelectedMonth(month){
        if(this.date instanceof Date) {
          let year = this.date.getFullYear()
          return month === this.monthSelected && year === this.yearSelected
        }
      }
    },

  }
</script>
