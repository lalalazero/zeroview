<template>
   <div id="app">
     {{ value ? value.toLocaleDateString() : 'undefined' }}
     <z-view-date-picker :value.sync="value"></z-view-date-picker>
     <p>其他内容</p>
   </div>
</template>


<script>
export default{
  data(){
    return {
      value: undefined,
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
