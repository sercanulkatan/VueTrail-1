<template>
  <div class="col-12">
    <router-view name="app-banner"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="pt-5 mt-5"></div>
    <router-view name="app-footer"></router-view>
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

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave {
}
.fade-leave-active {
  transition: opacity 0.3s ease-out;
  opacity: 0;
}

body {
  background-color: #1c23313d;
}
</style>
