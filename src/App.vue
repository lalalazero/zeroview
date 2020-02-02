<template>
  <div class="app">
    <z-view-table :data-source="dataSource" :columns="columns" expandKey="desc">
      <template slot-scope="scope">
        <button @click="edit(scope.item)" style="marginRight: 20px">编辑</button>
        <button @click="view(scope.item)">查看</button>
      </template>
    </z-view-table>
  </div>
</template>


<script>
export default {
  components: {},
  name: "App",
  mounted() {},
  methods: {
    edit(item) {
      alert(`编辑了id=${item.id}`);
    },
    view(item) {
      alert(`查看了id=${item.id}`);
    }
  },
  data() {
    return {
      item: undefined,
      columns: [
        {
          index: "name",
          text: "姓名",
          width: 200
        },
        {
          index: "score",
          text: "分数"
        },
        {
          index: "addr",
          text: "住址"
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 2,
          name: "李四",
          score: 99,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 3,
          name: "王麻子",
          score: 100,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 5,
          name: "翠花",
          score: 88,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 6,
          name: "丫丫",
          score: 60,
          desc: "张三是个男孩子",
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 7,
          name: "翠花",
          score: 88,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 8,
          name: "翠花",
          score: 88,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 9,
          name: "翠花",
          score: 88,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 10,
          name: "翠花",
          score: 88,
          addr: "中国四川成都市天府新区麓山大道"
        }
      ],
      selectedItems: []
    };
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
