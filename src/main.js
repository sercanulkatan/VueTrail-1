import Vue from "vue";
import App from "./App.vue";
import {
  router
} from "./assets/project/js/routes";

import {
  store
} from "./stores/store";


Vue.filter("currency", value => {
  return parseFloat(value).toLocaleString(undefined, {
    minimumFractionDigits: 2
  }) + " ₺";
});

// const router = new VueRouter({
//   routes,
//   mode: "history", //hash default
// });

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