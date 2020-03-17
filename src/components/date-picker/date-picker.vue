<template>
  <div class="z-view-date-picker">
    <Input @focus="onFocus" @blur="onBlur"/>
    <div class="z-view-date-picker-panel" v-if="popVisible">
      <div class="z-view-date-picker-nav">
        <Icon name="prev-double" /><Icon name="left" /><span>2020年</span><span>8月</span><Icon name="right" /><Icon name="next-double" />
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
export default {
  name: 'zViewDatePicker',
  components: {
    Input,
    Icon
  },
  data(){
    return {
      popVisible: false,
      mode: 'day'
    }
  },
  methods: {
    onFocus(){
      this.popVisible = true
    },
    onBlur(){
      this.popVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.z-view-date-picker {
  display: inline-block;
  border: 1px solid red;
}
</style>
