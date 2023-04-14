import VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/page"),
  },
  {
    path: "/result",
    component: () => import(/* webpackChunkName: "home" */ "@/page/result"),
  },
];

export default new VueRouter({
  routes,
});
