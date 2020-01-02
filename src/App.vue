<template>
  <div class="app">
    <z-view-carousel :selected.sync="selected">
      <z-view-carousel-item name="a">
        <div class="box">a</div>
      </z-view-carousel-item>
      <z-view-carousel-item name="b">
        <div class="box">b</div>
      </z-view-carousel-item>
      <z-view-carousel-item name="c">
        <div class="box">c</div>
      </z-view-carousel-item>
    </z-view-carousel>
    <br />
    <span>app selected: {{ this.selected }}</span>
  </div>
</template>


<script>
export default {
  components: {},
  name: "App",
  mounted() {},
  methods: {},
  data() {
    return {
      selected: "a"
    };
  },
  mounted() {}
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
.box {
  height: 300px;
  background: lightblue;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>
