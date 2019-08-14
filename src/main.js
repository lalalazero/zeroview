import Vue from 'vue'
import Button from './components/Button'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Button)
}).$mount('#app')
