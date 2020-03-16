<template>
  <div>
  </div>
</template>
<script>
  export default {
    name: 'zViewTableColumn',
    props: {
      text: {
        type: String,
        required: true
      },
      index: {
        type: String,
        required: true
      },
      width: {
        type: Number
      },
      sorter: {
        type: Function
      },
      sortDirection: {
        type: String,

      }
    }
  }
</script>
