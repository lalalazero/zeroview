import Vue from "vue";
import Router from "vue-router";
import hljs from "highlight.js";
import Components from '../src/index.js'
import Example from "./Example.vue";
import DemoBlock from './demo-block.vue'
import { routes } from "./routes";

Vue.config.productionTip = false;
Vue.use(Router);

Vue.use(Components)
Vue.component('demo-block', DemoBlock)

const router = new Router({
  routes
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  })

})

new Vue({
  router,
  // store,
  render: h => h(Example)
}).$mount("#app");
