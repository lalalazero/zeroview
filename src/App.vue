<template>
  <div class="app">
    <z-view-upload accept="image/**" action="http://localhost:3000/asubmit" name="file">
      <button>上传</button>
      <template slot="tips">
        <div>只能上传 300kb 以内的 png,jpeg 文件</div>
      </template>
    </z-view-upload>
    <button>保存</button>
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
    // text-decoration: unset;
    color: unset;
  }
  text-decoration: unset;
}
ul,
ol {
  list-style: none;
}
.app {
  margin: 40px;
}
</style>>
