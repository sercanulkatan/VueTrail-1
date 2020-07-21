<template>
  <div class="col-12">
    <div class="col-12">
      <router-view name="app-banner"></router-view>
    </div>
    <div class="col-12 row">
      <router-view></router-view>
    </div>
    <div class="col-12 row mt-5 pt-5">
      <router-view name="app-footer"></router-view>
    </div>
  </div>
</template>

<script>
import productAdd from "../src/components/Product/productAdd";
import productList from "../src/components/Product/productList";
import productSell from "../src/components/Product/productSell";
import banner from "../src/components/ThemeElements/banner";
import footer from "../src/components/ThemeElements/footer";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    appProductAdd: productAdd,
    appProductList: productList,
    appProductSell: productSell,
    appBanner: banner,
    appFooter: footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
