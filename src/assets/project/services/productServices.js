import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.http.options.root = "https://projecttrial1-fc305.firebaseio.com";

const resourceSec = {};

export default class productServices {
    //Ana kurucu
    constructor() {
        const customActions = {
            addProduct: {
                method: "POST",
                url: "products.json",
            },
            getProducts: {
                method: "GET",
                url: "products.json",
            },
            deleteProducts: {
                method: "DELETE",
                url: "products{/id}.json",
            },
            updateCount: {
                method: "PUT",
                url: "products{/id}.json",
            },
            getProduct: {
                method: "GET",
                url: "products{/id}.json",
            },
        };
        this.resourceSec = new Vue().$resource("", {}, customActions);
    }
    //yeni ürün ekleme
    async _insertProduct(p) {
        var key = "";
        await this.resourceSec
            .addProduct({}, {
                ProductName: p.ProductName,
                Count: p.Count,
                Price: p.Price,
                Description: p.Description,
                Category: p.Category,
                Cost: p.Cost
            })
            .then((res) => {
                if (res.status == 200)
                    key = res.body.name;
                else
                    key = "";
            });
        return key;
    }
    //ürün listesi döner
    async _getProductList() {
        var list = [];
        await this.resourceSec.getProducts().then((res) => {
            for (var key in res.data) {
                list.push({
                    key: key,
                    Count: res.data[key].Count,
                    ProductName: res.data[key].ProductName,
                    Price: res.data[key].Price,
                    Description: res.data[key].Description,
                    Category: res.data[key].Category,
                    Cost: res.data[key].Cost,
                });
            }
        });
        return list;
    }
    //bütün ürünleri sil
    async _deleteAll(key) {
        var done = false;
        this.resourceSec.deleteProducts({
            id: key
        }).then(res => {
            if (res.status == 200)
                done = true;
            else
                done = false;
        });
        return done;
    }
    //ürün sil
    async _cellProduct(pr, count) {
        var done = false;
        await this.resourceSec.updateCount({
            id: pr.key
        }, {
            ProductName: pr.ProductName,
            Count: (pr.Count - count),
            Price: pr.Price,
            Description: pr.Description,
            Category: pr.Category,
            Cost: pr.Cost
        }).then(res => {
            if (res.status == 200)
                done = true;
            else
                done = false;
        });
        return done;
    }
}