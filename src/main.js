import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import {
  routes
} from "./assets/project/js/routes";

import {
  store
} from "./stores/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history", //hash default
});

//Bütün routeların girişine etk, eder kontrol eklendi
router.beforeEach((to, from, next) => {
  console.log("Global seviyesinde kontrol");
  next(); //Kullanımı zorunlu geçişi belirtir
});

new Vue({
  el: "#app",
  //Gerekli yönlendirmeler projeye tanımlandı
  router,
  store,
  render: (h) => h(App),
});