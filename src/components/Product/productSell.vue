<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Çıkışı</h3>
          <hr />
          <div class="form-group">
            <label>Ürün Adı</label>
            <select class="form-control" v-model="selectedProduct">
              <option :value="item" v-for="item in pList" :key="item.key">{{item.ProductName}}</option>
            </select>
          </div>
          <div class="card mb-2 border border-danger">
            <div class="card-body">
              <div class="row">
                <div class="col-12 text-center">
                  <div class="mb-3">
                    <span class="badge badge-info">Stok : {{selectedProduct.Count}}</span>
                    <span class="badge badge-primary">Fiyat : {{selectedProduct.Price}} TL</span>
                  </div>
                  <p
                    class="border border-warning p-2 text-secondary"
                  >{{selectedProduct.Description}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Adet</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ürün adetini giriniz.."
              v-model="cellCount"
            />
          </div>
          <hr />
          <button class="btn btn-primary" @click="cellProduct(selectedProduct.key)">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pr from "../../stores/product";
export default {
  data() {
    return {
      pList: [],
      selectedProduct: {},
      cellCount: 0
    };
  },
  computed: {
    ...mapGetters({
      getProductList: "getProductList"
    })
  },
  methods: {
    cellProduct(key) {
      this.$store
        .dispatch("cellProduct", { key: key, count: this.cellCount })
        .then(success => {
          if (success.done) alert("Ürün satıldı.");
          else alert(success.msg);
        });
    }
  },
  watch: {
    getProductList(promise) {
      // save Promise result in local state
      promise.then(result => {
        this.pList = result;
      });
    }
  },
  async created() {
    await pr.mutations.getProductList();
  }
};
</script>