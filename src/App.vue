<template>
  <div class="app">
    <p>段落 1</p>
    <p>段落 1</p>
    <p>段落 1</p>
    <p>段落 3</p>
    <z-view-sticky>
      <p class="sticky-p">滑动页面查看吸顶效果</p>
    </z-view-sticky>
    <p>段落 1</p>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 4</p>
    <z-view-sticky>
      <p class="sticky-p" style="background: pink; margin-top: 10px;">滑动页面查看吸顶效果</p>
    </z-view-sticky>
    <p>段落 5</p>
    <p>段落 6</p>
    <p>段落 7</p>
    <p>段落 8</p>
    <z-view-sticky>
      <p class="sticky-p" style="background: lightgreen; margin-top: 10px;">滑动页面查看吸顶效果</p>
    </z-view-sticky>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 2</p>
    <p>段落 9</p>
    <p>段落 10</p>
    <p>段落 1</p>
    <p>段落 1</p>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 4</p>
    <p>段落 5</p>
    <p>段落 6</p>
    <p>段落 7</p>
    <p>段落 8</p>
    <p>段落 2</p>
    <p>段落 3</p>
    <p>段落 4</p>
    <p>段落 5</p>
    <p>段落 6</p>
    <p>段落 7</p>
    <p>段落 8</p>
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
  padding: 40px;
  border: 1px solid red;
}
.sticky-p {
  background: lightblue;
  padding: 10px 0;
  text-align: center;
}

</style>>
