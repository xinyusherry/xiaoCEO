import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import echarts from "echarts";
import store from "./store";
import "./assets/css/card.css";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
