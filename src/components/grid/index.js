import Col from './col.vue'
import Row from './row.vue'

const gridComponents = [
  Col,
  Row,
]

const install = Vue => {
    gridComponents.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default install
