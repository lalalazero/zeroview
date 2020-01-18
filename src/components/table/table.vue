<template>
  <div class="z-view-table-wrapper">
    <table
      class="z-view-table"
      :class="{'z-view-table-compact': compact, 
        'z-view-table-bordered': bordered, 'z-view-table-striped': strip}"
    >
      <thead>
        <tr>
          <th>id</th>
          <th :key="index" v-for="(column,index) in columns">{{column.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="dataItem.id" v-for="(dataItem,index) in dataSource">
          <td>{{index+1}}</td>
          <td :key="column.index" v-for="(column) in columns">{{dataItem[column.index]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "zViewTable",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.filter(data => data.id === undefined).length > 0;
      }
    },
    compact: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    strip: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-table {
  width: 100%;
  border-collapse: collapse;
  thead {
    th {
      text-align: left;
      padding: 12px 10px;
      border-bottom: 1px solid $table-border-color;
      background: $table-strip-color;
    }
  }
  tbody {
    tr:hover {
      td {
        background: $table-row-hover-color !important;
      }
    }
    td {
      transition: all 300ms;
      border-bottom: 1px solid $table-border-color;
      padding: 12px 10px;
    }
  }
  &-compact {
    thead th,
    tbody td {
      padding: 6px 10px;
    }
  }
  &-bordered {
    border: 1px solid $table-border-color;
    thead th,
    tbody td {
      border-left: 1px solid $table-border-color;
    }
  }
  &-striped {
    tbody tr {
      &:nth-child(even) {
        td {
          background: $table-strip-color;
        }
      }
    }
  }
}
</style>