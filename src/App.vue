<template>
  <div class="app">
    <z-view-sticky>
      <div>我是粘滞内容</div>
    </z-view-sticky>
    <p>段落 1</p>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 4</p>
    <p>段落 5</p>
    <p>段落 6</p>
    <p>段落 7</p>
    <p>段落 8</p>
    <p>段落 9</p>
    <p>段落 10</p>
  </div>
</template>


<script>
export default{

};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  &:hover,
  &:visited,
  &:active {
    color: unset;
  }
  text-decoration: unset;
}
ul,
ol {
  list-style: none;
}
.app {
  /*margin: 40px;*/
}
</style>>
