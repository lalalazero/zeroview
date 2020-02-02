<template>
  <div class="z-view-table-wrapper" ref="wrapper" :class="{'z-view-table-showHeader': showHeader}">
    <div
      class="z-view-table-wrapper2"
      ref="wrapper2"
      :style="{height: height + 'px',overflow: 'auto'}"
    >
      <table
        ref="table"
        class="z-view-table"
        :class="{'z-view-table-compact': compact,
        'z-view-table-bordered': bordered, 'z-view-table-striped': strip}"
      >
        <thead>
          <tr v-if="showHeader">
            <th v-if="selectable" :style="{width: '50px'}" class="z-view-table-center">
              <input type="checkbox" ref="allCheck" @change="onSelectAllChange($event)" />
            </th>
            <th :style="{ width: '50px' }"></th>
            <th v-if="idVisible" :style="{width: '50px'}" class="z-view-table-center">id</th>
            <th
              :key="index"
              v-for="(column,index) in columns"
              :style="{width: column.width + 'px'}"
            >
              <div class="z-view-table-th-wrapper">
                <span>{{column.text}}</span>
                <span v-if="column.sorter" class="z-view-table-th-sorter" @click="onSort(column)">
                  <z-view-icon
                    name="filled-up"
                    :class="{'z-view-table-th-sorter-asc': getSortDirection(column.index) === 'asc'}"
                  ></z-view-icon>
                  <z-view-icon
                    name="filled-down"
                    :class="{'z-view-table-th-sorter-desc': getSortDirection(column.index) === 'desc'}"
                  ></z-view-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(dataItem,index) in copyDataSource">
            <tr :key="dataItem.id">
              <td v-if="selectable" :style="{width: '50px'}" class="z-view-table-center">
                <input
                  type="checkbox"
                  @change="onSelectedItemsChange(dataItem, $event)"
                  :checked="inSelectedItems(dataItem)"
                />
              </td>
              <td
                class="z-view-table-center"
                @click="expandItem(dataItem.id)"
                :style="{cursor: 'pointer'}"
              >
                <span
                  class="z-view-table-expand-icon"
                  :class="{'z-view-table-expand-icon-down': isExpand(dataItem.id)}"
                >
                  <z-view-icon name="right"></z-view-icon>
                </span>
              </td>
              <td v-if="idVisible" :style="{width: '50px'}" class="z-view-table-center">{{index+1}}</td>
              <td
                :key="column.index"
                :style="{width: column.width + 'px'}"
                v-for="(column) in columns"
              >{{dataItem[column.index]}}</td>
            </tr>
            <tr
              :key="`${dataItem.id}-expand-key`"
              class="z-view-table-expand-row"
              v-if="isExpand(dataItem.id)"
            >
              <td
                :colspan="colspan"
                :style="{ paddingLeft: `${paddingLeft}px`}"
              >{{ dataItem[expandKey] || '暂无描述' }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="z-view-table-body-wrapper">
      <div class="z-view-table-noData-wrapper" v-if="copyDataSource.length <= 0">
        <z-view-icon name="emptysearch"></z-view-icon>
        <br />
        <span>暂无数据</span>
      </div>
      <div class="z-view-table-loading-wrapper" v-if="loading">
        <z-view-icon name="loading"></z-view-icon>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "../icon/icon.vue";
export default {
  name: "zViewTable",
  components: {
    zViewIcon: Icon
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => [],
      validator(value) {
        if (value.filter(data => data.id === undefined).length > 0) {
          console.error("dataSource 的对象要包含 id 属性");
          return false;
        }
        return true;
      }
    },
    idVisible: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
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
    },
    selectedItems: {
      type: Array,
      default: () => [],
      validator(value) {
        if (value.filter(data => data.id === undefined).length > 0) {
          console.error(
            "需要指定 selectable 属性为 true 并且 selectedItems 的对象要包含 id 属性"
          );
          return false;
        }
        return true;
      }
    },
    selectable: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    expandKey: {
      type: String
    }
  },
  computed: {
    selectedIds() {
      return this.selectedItems.map(i => i.id);
    },
    dataSourceIds() {
      return this.copyDataSource.map(i => i.id);
    },
    colspan() {
      let len = this.columns.length + 1;
      if (this.selectable) len = len + 1;
      if (this.idVisible) len = len + 1;
      return len;
    },
    paddingLeft() {
      let left = 50;
      if (this.selectable) left += 50;
      if (this.idVisible) left += 50;
      return left;
    }
  },
  data() {
    return {
      sortDirection: "",
      copyDataSource: [],
      sortMap: {},
      expandIds: []
    };
  },
  watch: {
    selectedItems() {
      let isSelected = id => this.selectedIds.indexOf(id) >= 0;
      let isNotSelected = id => this.selectedIds.indexOf(id) < 0;
      if (this.dataSourceIds.every(isSelected)) {
        this.$refs.allCheck.checked = true;
        this.$refs.allCheck.indeterminate = false;
        return;
      }
      if (this.dataSourceIds.every(isNotSelected)) {
        this.$refs.allCheck.checked = false;
        this.$refs.allCheck.indeterminate = false;
        return;
      }
      if (this.dataSourceIds.some(isSelected)) {
        this.$refs.allCheck.checked = false;
        this.$refs.allCheck.indeterminate = true;
        return;
      }
    },
    dataSource() {
      this.copyDataSource = JSON.parse(JSON.stringify(this.dataSource));
    }
  },
  methods: {
    onSelectedItemsChange(dataItem, $event) {
      let copy = JSON.parse(JSON.stringify(this.selectedItems));
      if ($event.target.checked) {
        if (!copy.find(i => i.id === dataItem.id)) {
          copy.push(dataItem);
        }
      } else {
        copy = copy.filter(i => i.id !== dataItem.id);
      }
      this.$emit("update:selectedItems", copy);
    },
    inSelectedItems(dataItem) {
      return this.selectedItems.find(i => i.id === dataItem.id) ? true : false;
    },
    onSelectAllChange($event) {
      if ($event.target.checked) {
        let copy = JSON.parse(JSON.stringify(this.dataSource));
        this.$emit("update:selectedItems", copy);
      } else {
        this.$emit("update:selectedItems", []);
      }
    },
    initSortMap() {
      this.columns.forEach(column => {
        if (column.sorter) {
          this.sortMap[column.index] = {
            direction: column.sortDirection
          };
        }
      });
    },
    onSort(column) {
      let { index, sorter, sortDirection } = column;
      let columnSort = this.sortMap[index];
      let { direction } = columnSort;
      if (!direction) {
        columnSort.direction = "asc";
        this.copyDataSource.sort(sorter);
      } else if (direction === "asc") {
        columnSort.direction = "desc";
        this.copyDataSource.reverse();
      } else if (direction === "desc") {
        columnSort.direction = "";
        this.copyDataSource = JSON.parse(JSON.stringify(this.dataSource));
      }
    },
    getSortDirection(columnIndex) {
      if (!this.sortMap[columnIndex]) return;
      return this.sortMap[columnIndex].direction;
    },
    makeFixedHeaderStyle() {
      let table = this.$refs.table;
      let copyTable = table.cloneNode(false);
      // console.log(copyTable);
      let thead = table.children[0];
      // console.log(thead);
      let { height } = thead.getBoundingClientRect();
      // console.log(height);
      copyTable.appendChild(thead);
      copyTable.classList.add("z-view-table-copy-fix-header");
      this.$refs.wrapper.appendChild(copyTable);
      this.$refs.wrapper.style.paddingTop = height + "px";
      this.$refs.wrapper2.style.height = this.height - height + "px";
    },
    expandItem(id) {
      if (this.expandIds.indexOf(id) >= 0) {
        this.expandIds.splice(this.expandIds.indexOf(id), 1);
      } else {
        this.expandIds.push(id);
      }
    },
    isExpand(id) {
      return this.expandIds.indexOf(id) >= 0;
    }
  },
  created() {
    if (this.dataSource.length > 0) {
      this.copyDataSource = JSON.parse(JSON.stringify(this.dataSource));
    }
    this.initSortMap();
  },
  mounted() {
    if (this.fixedHeader) {
      this.makeFixedHeaderStyle();
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
      font-weight: 500;
      color: $bg-black;
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
  &-wrapper {
    position: relative;
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
  &-body-wrapper {
    width: 100%;
  }
  &-noData-wrapper {
    min-height: 160px;
    border-top: 1px solid $table-border-color;
    border-bottom: 1px solid $table-border-color;
    padding: 42px 0;
    text-align: center;
    width: 100%;
    color: $bg-gray-light;
    > svg {
      width: 2em;
      height: 2em;
    }
  }
  &-loading-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color: white, $alpha: 0.5);
    > svg {
      width: 2em;
      height: 2em;
      fill: $active-color;
      animation: $spinAnimation;
    }
  }
  &-showHeader {
    .z-view-table-body-wrapper {
      border-top: none;
    }
  }
  &-th-wrapper {
    display: flex;
    align-items: center;
  }
  &-th-sorter {
    display: flex;
    flex-direction: column;
    width: 1.2em;
    height: 1.2em;
    margin: 0 4px;
    user-select: none;
    > svg {
      fill: $disabled-color;
    }
    &-asc,
    &-desc {
      fill: $active-color !important;
    }
  }
  &-copy-fix-header {
    position: absolute;
    left: 0;
    top: 0;
    // box-shadow: 1px 1px 2px 1px #ccc;
  }
  &-expand-row {
    background: $table-strip-color;
  }
  &-expand-icon {
    // outline: 1px solid red;
    font-size: 12px;
    > svg {
      transition: all 300ms;
    }
    &-down {
      > svg {
        transform: rotate(90deg);
      }
    }
  }
  & &-center {
    text-align: center;
  }
}
</style>
