<template>
   <div id="app">
     <jsx-test></jsx-test>
     <z-view-table :data-source="dataSource" :columns="columns"></z-view-table>
   </div>
</template>


<script>
import JsxTest from "./JsxTest";
export default{
  components: {
    JsxTest
  },
  data(){
    return {
      dataSource:[
        {
          'id': 1,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 2,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 3,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 4,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 5,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 6,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 7,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 8,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 9,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 10,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 11,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 12,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
        {
          'id': 13,
          'name': '张三',
          'address': 'China',
          'score': '100'
        },
      ],
      columns:[
        {
        index: 'name',
        text: 'name'
        },
        {
        index: 'address',
        text: 'address'
        },
        {
        index: 'score',
        text: 'score'
        }
      ]
    }
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
    color: unset;
  }
  text-decoration: unset;
}
ul,
ol {
  list-style: none;
}
#app {
  padding: 40px;
}

</style>>
