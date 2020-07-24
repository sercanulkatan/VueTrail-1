<template>
  <nav class="navbar fixed-bottom navbar-light" style="background-color: #e3f2fd;">
    <span class="navbar-text mr-auto">
      <strong>Vue</strong>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
      <strong>Alış Tutarı :</strong>
      <span class="badge badge-danger">{{Recieved|currency}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
      <strong>Satış Tutarı :</strong>
      <span class="badge badge-success">{{Sold|currency}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0">
      <strong>Bakiye :</strong>
      <span class="badge badge-primary">{{Balance|currency}}</span>
    </span>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import ac from "../../stores/accounts";
export default {
  computed: {
    ...mapGetters({
      Balance: "getBalance",
      Sold: "getSold",
      Recieved: "getRecieved"
    })
  },
  created() {
    this.$store.dispatch("initApp");
  }
};
</script>