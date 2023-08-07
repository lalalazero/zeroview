<template>
  <div class="header">
    <span class="logo">
      <img :src="logo" />
    </span>
    <span class="description">基于 vue 2.x 的 UI 组件库</span>
  </div>
</template>
<script>
import logo from './logo.svg'
export default {
  name: 'Header',
  data() {
    return {
      logo
    }
  }
}
</script>
<style lang="scss">
.header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  align-items: center;
}
</style>
