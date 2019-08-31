import Vue from 'vue'
import App from './App'
import Button from './components/button/button'
import Icon from './components/icon'
import ButtonGroup from './components/button/button-group'
import Input from './components/input'
import Row from './components/grid/row'
import Col from './components/grid/col'
import Layout from './components/grid/layout'
import Content from './components/grid/content'
import Footer from './components/grid/footer'
import Header from './components/grid/header'
import Sider from './components/grid/sider'
import router from './router'
import store from './store'

// 注册为 Vue 的全局组件
Vue.component('z-button', Button)
Vue.component('z-icon',Icon)
Vue.component('z-button-group',ButtonGroup)
Vue.component('z-input', Input)
Vue.component('z-col', Col)
Vue.component('z-row', Row)
Vue.component('z-layout', Layout)
Vue.component('z-header', Header)
Vue.component('z-content', Content)
Vue.component('z-footer', Footer)
Vue.component('z-sider', Sider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
