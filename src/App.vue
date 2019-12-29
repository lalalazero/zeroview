<template>
  <div>
    <div style="margin-top: 50px">
      <z-view-cascader :options="options" :selected.sync="selected"></z-view-cascader>
    </div>
    <div style="margin-top: 200px">
      {{ this.selected }}
    </div>
  </div>
</template>


<script>

export default {
  components: {},
  name: "App",
  mounted() {},
  methods: {

  },
  data() {
    return {
      options: [
        {
          id: '1',
          label: '四川',
          children: [
            {
              id: '1-1',
              label: '成都市',
              children: [
                {
                  id: '1-1-1',
                  label: '高新区'
                },
                {
                  id: '1-1-2',
                  label: '锦江区'
                },
                {
                  id: '1-1-3',
                  label: '金牛区'
                },
              ]
            },
            {
              id: '1-2',
              label: '泸州市',
              children: [
                {
                  id: '1-2-1',
                  label: '纳西区'
                },
                {
                  id: '1-2-2',
                  label: '江阳区'
                },
                {
                  id: '1-3-3',
                  label: '龙马谭区'
                },
              ]
            },
          ]
        },
        {
          id: '2',
          label: '重庆市',
          children: [
            {
              id: '2-1',
              label: '渝中区'
            },
            {
              id: '2-2',
              label: '北培区'
            }
          ]
        }
      ],
      selected: [ { "id": "1", "label": "四川" }, { "id": "1-2", "label": "泸州市" }, { "id": "1-2-2", "label": "江阳区" } ]
    };
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
</style>>
