import Vue from "vue";
import Components from '../src/index.js'
import Example from "./Example.vue";
import DemoBlock from './demo-block.vue'
import '../dist/style.css'
import router from "./router";
// import store from "./store";

// 注册为 Vue 的全局组件
Vue.config.productionTip = false;
// Vue.use(zeroview);

Vue.use(Components)
Vue.component('demo-block', DemoBlock)

new Vue({
  router,
  // store,
  render: h => h(Example)
}).$mount("#app");
