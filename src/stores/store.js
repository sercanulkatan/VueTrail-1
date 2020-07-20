import Vue from "vue";
import Vuex from "vuex";
import product from "./product";
import account from "./accounts";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    product,
    account
  },
});