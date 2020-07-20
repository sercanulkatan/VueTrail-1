import productServices from "../assets/project/services/productServices";
import account from "./accounts";
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
    async insertProduct(val) {
        state.product = {
            Key: "",
            ProductName: val.ProductName,
            Count: val.Count,
            Price: Math.round(parseFloat(val.Price) + (Math.round((parseFloat(val.Price) * 10) / 100))),
            Description: val.Description,
            Category: val.Category,
            Cost: val.Price
        };
        await account.mutations.updateAccounts(2, parseFloat(val.Price) * val.Count);
        return await sProduct._insertProduct(state.product);
    },
    async getProductList() {
        var a = await sProduct._getProductList();
        state.Products = a;
    },
    async deleteAll(key) {
        const pr = state.Products.filter(x => x.key == key)[0];
        var done = false;
        var acRes = await account.mutations.updateAccounts(3, (Math.round(parseFloat(pr.Count) * parseFloat(pr.Cost))));
        if (acRes) {
            done = await sProduct._deleteAll(key);
            await this.getProductList();
        } else {
            await account.mutations.updateAccounts(1, (Math.round(parseFloat(pr.Count) * parseFloat(pr.Cost))));
            done = false;
        }
        return done;
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

export default {
    state,
    getters,
    mutations,
};