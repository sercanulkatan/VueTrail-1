import productServices from "../assets/project/services/productServices";
import account from "./accounts";
import Vue from "Vue";
const sProduct = new productServices();

const state = {
    Products: [],
    product: {
        Key: "",
        ProductName: "",
        Count: "",
        Price: "",
        Description: "",
        Category: "",
        Cost: ""
    },
    Category: [{
            Id: 1,
            Name: "Dizüstü Bilgisayar"
        }, {
            Id: 2,
            Name: "Masaüstü Bilgisayar"
        },
        {
            Id: 3,
            Name: "Klavye"
        },
        {
            Id: 4,
            Name: "Mouse"
        },
    ]
};

const getters = {
    getProductList() {
        return state.Products;
    },
    getCategories() {
        return state.Category;
    }
};

const mutations = {
    updateProductList(state, product) {
        state.Products.push(product);
    },
    deleteProduct(state, key) {
        const ind = state.Products.findIndex(x => x.key == key);
        state.Products.splice(ind, 1);
    },
    async getProductList() {
        var a = await sProduct._getProductList();
        state.Products = a;
    },
    decreaseCount(state, key, count) {
        state.Products.filter(x => x.key == key)[0].Count -= count;
    }
};

const actions = {
    async saveProduct({
        dispatch,
        commit
    }, p) {
        var done = false;
        p.Cost = p.Price;
        p.Price = parseFloat(p.Price) + ((parseFloat(p.Price) * 10) / 100);
        await sProduct._insertProduct(p).then(async res => {
            if (res != "") {
                p.key = res;
                commit("updateProductList", p);
                await dispatch("updateAccounts", {
                    type: 2,
                    val: parseFloat(p.Cost) * p.Count
                }).then(res => {
                    if (!res) done = false;
                    else done = true;
                });
            } else done = false
        }).catch((ex) => {
            done = false;
        });
        return done;
    },
    async deleteProducts({
        dispatch,
        commit,
        state
    }, key) {
        const pr = state.Products.filter(x => x.key == key)[0];
        var res = {
            message: "",
            done: false
        };
        if (pr.Count > 0) {
            await dispatch("updateAccounts", {
                    type: 3,
                    val: (parseFloat(pr.Count) * parseFloat(pr.Cost))
                })
                .then(async acRes => {
                    if (acRes) {
                        await sProduct._deleteAll(key).then(async done => {
                            res.message = "Silme işlemi başarılı.";
                            res.done = true;
                            await commit("deleteProduct", key);
                        });
                    } else {
                        await dispatch("updateAccounts", {
                                type: 1,
                                val: (parseFloat(pr.Count) * parseFloat(pr.Cost))
                            })
                            .then(res => {
                                res.message = "Ürün silinemedi.";
                                res.done = false;
                            });
                    }
                });
        } else {
            res.message = "Silinecek ürün bulunamadı.";
            res.done = false;
        }
        return res;
    },
    async cellProduct({
        dispatch,
        commit,
        state
    }, prms) {
        const pr = state.Products.filter(x => x.key == prms.key)[0];
        var res = {
            done: false,
            msg: "İşlem tamamlanmadı."
        };

        if (pr.Count < prms.count) {
            res.done = false;
            res.msg = "Ürün miktarı yetersiz satış iptal edildi.";
            return res;
        }

        const type = pr.Count == prms.count ? 1 : 2;

        await sProduct._cellProduct(pr, prms.count).then(async acRes => {
            if (acRes) {
                await dispatch("updateAccounts", {
                    type: 1,
                    val: (parseFloat(prms.count) * parseFloat(pr.Price))
                }).then(async done => {
                    if (pr.Count == prms.count)
                        commit("deleteProduct", prms.key);
                    else
                        commit("decreaseCount", prms.key, prms.count);
                    res.done = false;
                    res.msg = "Satım işlemi başarılı.";
                });
            } else {
                res.done = false;
                res.msg = "Satım işleminde hata gerçekleşti yenileyip tekrar deneyiniz.";
            }
        });
        return res;
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};