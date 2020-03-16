import zViewTable from './table.vue'
import zViewTableColumn from './table-column.vue'

zViewTable.install = Vue => {
  Vue.component(zViewTable.name, zViewTable)
  Vue.component(zViewTableColumn.name, zViewTableColumn)
}

export default zViewTable
