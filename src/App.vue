<template>
   <div id="app">
     <z-view-table :data-source="dataSource">
       <z-view-table-column index="name" text="姓名"></z-view-table-column>
       <z-view-table-column index="score" text="分数">
         <template slot-scope="props">
           <span style="color: red">{{ props.value }}</span>
         </template>
       </z-view-table-column>
       <z-view-table-column index="action" text="操作">
        <template slot-scope="props">
          <div>
            <!-- {{ props }} -->
            <z-view-button @click="edit(props.item)">edit</z-view-button>
            <z-view-button @click="view(props.item)">view</z-view-button>
          </div>
         </template>
       </z-view-table-column>
     </z-view-table>
   </div>
</template>


<script>
export default{
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

    }
  },
  methods: {
    edit(item){
      alert('edit:'+item.id)
    },
    view(item){
      alert('view:'+item.id)
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
