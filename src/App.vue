<template>
  <div>
    <z-view-carousel :selected="selected">
      <z-view-carousel-item name="0" >
        <div class="box">1</div>
      </z-view-carousel-item>
      <z-view-carousel-item name="1" >
        <div class="box">2</div>
      </z-view-carousel-item>
      <z-view-carousel-item name="2" >
        <div class="box">3</div>
      </z-view-carousel-item>
    </z-view-carousel>
    <br>
    <z-view-button @click="onClick">click</z-view-button>
    <span>{{ this.selected }}</span>

  </div>
</template>


<script>

export default {
  components: {},
  name: "App",
  mounted() {},
  methods: {
    onClick(){
      this.count++;
      this.selected = this.count % 3 + ''
    }
  },
  data() {
    return {
      selected: '1',
      count: 1,
    }
  },
  mounted() {

  }
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
.box {
  width: 100px;
  height: 100px;
  background: lightblue;
}



</style>>
