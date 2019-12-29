import Vue from "vue";
import App from "./App";
import DemoBlock from "./demo-block.vue";
import router from "./router";
import zeroView from './index.js'
// import store from "./store";

// 注册为 Vue 的全局组件
Vue.component("demo-block", DemoBlock);
Vue.use(zeroView)

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
