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
    async getProductList() {
        return state.Products;
    },
    getCategories() {
        return state.Category;
    }
};

const mutations = {
    updateProductList(state,product){
        state.Products.push(product);
    },
    deleteProduct(state,key){
        const ind = state.Products.findIndex(x=>x.key==key);
        state.Products.splice(ind,1);
    },
    async getProductList() {
        var a = await sProduct._getProductList();
        state.Products = a;
    },
    async cellProduct(key, count) {
        const pr = state.Products.filter(x => x.key == key)[0];
        var done = false;
        if (pr.Count < count) return done;
        var acRes = await sProduct._cellProduct(pr, count);
        if (acRes) {
            done = await account.mutations.updateAccounts(1, (Math.round(parseFloat(count) * parseFloat(pr.Price))));
            await this.getProductList();
        }
    }
};

const actions={
    async saveProduct({dispatch,commit,state},p){
        var done=false;
        p.Cost = p.Price;
        p.Price = Math.round(parseFloat(p.Price) + (Math.round((parseFloat(p.Price) * 10) / 100)));
        await sProduct._insertProduct(p).then(async res=>{
            if(res!=""){
                p.key=res;
                commit("updateProductList",p);
                await dispatch("updateAccounts", {type:2, val:parseFloat(p.Cost) * p.Count}).then(res=>{
                    if(!res) done=false;
                    else done=true;
                });
            }
            else done=false
        }).catch((ex)=>{
            done=false;
        });
        return done;
    },
    async deleteProducts({dispatch,commit},key){
        const pr = state.Products.filter(x => x.key == key)[0];
        var res = {message:"",done:false};
        if(pr.Count>0){
        await dispatch("updateAccounts", {type:3, val:(Math.round(parseFloat(pr.Count) * parseFloat(pr.Cost)))})
            .then(async acRes=>{
                if (acRes) {
                    await sProduct._deleteAll(key).then(async done=>{
                        res.message="Silme işlemi başarılı.";
                        res.done = true;
                        await commit("deleteProduct",key);
                    });
                } else {
                    await dispatch("updateAccounts", {type:1, val:(Math.round(parseFloat(pr.Count) * parseFloat(pr.Cost)))})
                    .then(res=>{
                        res.message="Ürün silinemedi.";
                        res.done = false;
                    });
                }
            });
        }
        else{
            res.message="Silinecek ürün bulunamadı.";
            res.done = false;
        }
        return res;
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};