<template>
  <div class="container">
    <div class="loading" :style="isDelete">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Listesi</h3>
          <hr />
          <table class="table table-hover table-striped table-bordered">
            <thead>
              <th>id</th>
              <th>Kategori</th>
              <th>Ürün Adı</th>
              <th>Adet</th>
              <th>Fiyat</th>
              <th>Açıklama</th>
              <th>Açıklama</th>
            </thead>
            <tbody>
              <tr v-for="item in getProductList" :key="item.key">
                <td class="align-middle text-center">
                  <span class="badge badge-info">{{item.key}}</span>
                </td>
                <td
                  class="align-middle text-center"
                >{{categories.filter(x=>x.Id==item.Category)[0].Name}}</td>
                <td class="align-middle text-center">{{item.ProductName}}</td>
                <td class="align-middle text-center">{{item.Count}}</td>
                <td class="align-middle text-center" style="width:120px;">{{item.Price|currency}}</td>
                <td class="align-middle">{{item.Description}}</td>
                <td class="align-middle">
                  <button
                    class="btn btn-danger btn-small btn-sm"
                    @click="deleteAll(item.key)"
                  >Tümünü Sil</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="getProductList.length==0" class="alert alert-warning">
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br />
            <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz</small>
          </div>
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
      delete: false
    };
  },
  computed: {
    ...mapGetters({
      getProductList: "getProductList",
      categories: "getCategories"
    }),
    isDelete() {
      if (this.delete) {
        return {
          display: "block"
        };
      } else {
        return {
          display: "none"
        };
      }
    }
  },
  async created() {
    await pr.mutations.getProductList();
    //this.pList = pr.getters.getProductList();
  },
  methods: {
    deleteAll(key) {
      this.delete = true;
      this.$store.dispatch("deleteProducts", key).then(success => {
        if (success.done) this.delete = false;
        else alert(success.message);
      });
    }
  },
  watch: {
    // getProductList(promise) {
    //   // save Promise result in local state
    //   promise.then(result => {
    //     this.pList = result;
    //   });
    // }
  }
};
</script>