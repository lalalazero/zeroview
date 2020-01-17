<template>
  <div class="app">
    <z-view-pagination :total-pages="1" :current.sync="current" :hide-if-one-page="false" simple></z-view-pagination>
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
      current: 1
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
