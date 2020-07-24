import Vue from "vue";
import banner from "../../../components/ThemeElements/banner";
import footer from "../../../components/ThemeElements/footer";
import product from "../../../components/Product/product";
import VueRouter from "vue-router";

// import productList from "../../../components/Product/productList";
Vue.use(VueRouter);

const productList = (resolve) => {
  require.ensure(
    ["../../../components/Product/productList"],
    () => {
      resolve(require("../../../components/Product/productList"));
    },
    "Product"
  );
  //Son parametre hepsinin aynı anda yüklenmesi sağlar.
  //Gruplama oluşturur
};

const productAdd = (resolve) => {
  require.ensure(["../../../components/Product/productAdd"], () => {
    resolve(require("../../../components/Product/productAdd"));
  });
};

const productSell = (resolve) => {
  require.ensure(["../../../components/Product/productSell"], () => {
    resolve(require("../../../components/Product/productSell"));
  });
};

const routes = [{
    path: "/productAdd",
    components: {
      default: productAdd,
      "app-banner": banner,
      "app-footer": footer,
    },
  },
  {
    path: "/productSell",
    components: {
      default: productSell,
      "app-banner": banner,
      "app-footer": footer,
    },
  },
  {
    path: "/Product",
    components: {
      default: product,
      "app-banner": banner,
      "app-footer": footer,
    },
    name: "Ürün",
    children: [{
      path: "",
      component: productList,
    }, ],
  },
  {
    path: "*", //Wild card
    redirect: "/Product",
  },
];

export const router = new VueRouter({
  routes,
  mode: "history", //hash default
});