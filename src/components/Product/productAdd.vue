<template>
  <div class="container">
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
          <button class="btn btn-primary" @click="insertProduct()">Kaydet</button>
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
      categories: []
    };
  },
  methods: {
    // ...mapMutations({
    //   insertProduct: "insertProduct"
    // })
    async insertProduct() {
      if (await pr.mutations.insertProduct(this.p)) {
        alert("ekleme işlemi başarılı");
        this.p = {
          ProductName: "",
          Count: "",
          Price: "",
          Description: "",
          Category: ""
        };
      } else {
        alert("ekleme işlemi başarısız sayfayı yenileyip tekrar deneyin.");
      }
    }
  },
  created() {
    this.categories = pr.getters.getCategories();
  }
};
</script>