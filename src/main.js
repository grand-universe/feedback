import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import router from "@/router";
import { translateText } from "./lang/index";
import messageBox from "./components/Toast";
import "@/style/main.scss";

!window.Promise && (window.Promise = Promise);
Vue.prototype.$t = translateText;
Vue.prototype.$message = messageBox;

Vue.use(VueRouter);

const isios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
window.isios = isios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render(h) {
    return <router-view />;
  },
});
