<template>
  <div class="app">
    <z-view-table
      :data-source="dataSource"
      :columns="columns"
      selectable
      :selected-items.sync="selectedItems"
    ></z-view-table>
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
          text: "姓名"
        },
        {
          index: "score",
          text: "分数",
          sorter: (a, b) => {
            console.log("sort 被调用了");
            return a.score - b.score;
          },
          sortDirection: "asc"
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
        }
      ],
      selectedItems: []
    };
  },
  mounted() {
    setTimeout(() => {
      console.log("对 dataSource 进行排序");
      this.dataSource.sort((a, b) => a.score - b.score);
    }, 3000);
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
.app {
  margin: 40px;
}
</style>>
