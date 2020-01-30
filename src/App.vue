<template>
  <div class="app">
    <z-view-table :height="300" :data-source="dataSource" :columns="columns" fixedHeader></z-view-table>
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
      columns: [
        {
          index: "name",
          text: "姓名",
          width: 200
        },
        {
          index: "score",
          text: "分数",
          sorter: (a, b) => {
            return a.score === b.score ? 0 : a.score > b.score ? 1 : -1;
          }
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        },
        {
          id: 7,
          name: "翠花",
          score: 88
        },
        {
          id: 8,
          name: "翠花",
          score: 88
        },
        {
          id: 9,
          name: "翠花",
          score: 88
        },
        {
          id: 10,
          name: "翠花",
          score: 88
        },
        {
          id: 11,
          name: "翠花",
          score: 88
        },
        {
          id: 12,
          name: "翠花",
          score: 88
        },
        {
          id: 13,
          name: "翠花",
          score: 88
        },
        {
          id: 14,
          name: "翠花",
          score: 88
        },
        {
          id: 15,
          name: "翠花",
          score: 88
        },
        {
          id: 16,
          name: "翠花",
          score: 88
        },
        {
          id: 17,
          name: "翠花",
          score: 88
        },
        {
          id: 18,
          name: "翠花",
          score: 88
        },
        {
          id: 19,
          name: "翠花",
          score: 88
        },
        {
          id: 20,
          name: "翠花",
          score: 88
        }
      ],
      selectedItems: []
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
</style>>
