<template>
  <div class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün İşlemleri</h3>
          <hr />
          <div class="form-group col-lg-12">
            <label>Ürün Adı</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ürün adını giriniz.."
              v-model="p.ProductName"
            />
          </div>
          <div class="row col-12">
            <div class="form-group col-lg-6 col-sm-12">
              <label>Kategori</label>
              <select class="browser-default custom-select" v-model="p.Category">
                <option selected disabled value>Kategori Seçiniz</option>
                <option v-for="c in categories" :key="c.Id" :value="c.Id">{{c.Name}}</option>
              </select>
            </div>
            <div class="form-group col-lg-3 col-sm-12">
              <label>Adet</label>
              <input type="number" class="form-control" placeholder="Adet.." v-model="p.Count" />
            </div>
            <div class="form-group col-lg-3 col-sm-12">
              <label>Fiyat</label>
              <input type="number" class="form-control" placeholder="Fiyat.." v-model="p.Price" />
            </div>
          </div>
          <div class="form-group col-12">
            <label>Açıklama</label>
            <textarea
              cols="30"
              rows="5"
              placeholder="Ürüne ait bir açıklama giriniz..."
              class="form-control"
              v-model="p.Description"
            ></textarea>
          </div>
          <hr />
          <button
            class="btn btn-primary"
            :disabled="controlData==true"
            @click="insertProduct()"
          >Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pr from "../../stores/product";
// import { mapMutations } from "vuex";
export default {
  data() {
    return {
      p: {
        ProductName: "",
        Count: "",
        Price: "",
        Description: "",
        Category: ""
      },
      categories: [],
      saved: false
    };
  },
  methods: {
    async insertProduct() {
      this.saved = true;
      this.$store.dispatch("saveProduct", this.p).then(res => {
        if (!res) {
          this.saved = false;
          alert("ekleme işlemi başarısız sayfayı yenileyip tekrar deneyin.");
        }
      });
    }
  },
  created() {
    this.categories = pr.getters.getCategories();
  },
  computed: {
    controlData() {
      if (
        this.p.ProductName.length > 3 &&
        this.p.Count > 0 &&
        this.p.Price > 0 &&
        this.p.Description.length > 3 &&
        this.p.Category > 0
      ) {
        return false;
      } else return true;
    },
    isLoading() {
      if (this.saved) {
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
  beforeRouteLeave(to, from, next) {
    if (
      (this.p.ProductName.length > 3 ||
        this.p.Count > 0 ||
        this.p.Price > 0 ||
        this.p.Description.length > 3 ||
        this.p.Category > 0) &&
      !this.saved
    ) {
      const conf = confirm(
        "Kaydedilmemiş veriler var çıkmak istediğinize emin misiniz?"
      );
      if (conf) {
        next();
      } else {
        next(false);
      }
    } else next();
  }
};
</script>