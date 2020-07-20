import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.http.options.root = "https://projecttrial1-fc305.firebaseio.com";

const resourceSec = {};

export default class productServices {
    //Ana kurucu
    constructor() {
        const customActions = {
            setAccounts: {
                method: "PUT",
                url: "account{/id}.json",
            },
            getAccounts: {
                method: "GET",
                url: "account.json",
            },
            addAccounts: {
                method: "POST",
                url: "account.json",
            },
        };
        this.resourceSec = new Vue().$resource("", {}, customActions);
        this._getAccounts();
    }
    //yeni ürün ekleme
    async _updateAccounts(a) {
        var done = false;
        await this.resourceSec.setAccounts({
            id: a.key
        }, {
            Balance: a.Balance,
            Sold: a.Sold,
            Recieved: a.Recieved
        }).then((res) => {
            if (res.status == 200) {
                done = true;
            } else {
                done = false;
            }
        });
        return done;
    }
    //ürün listesi döner
    async _getAccounts() {
        var account = {};
        await this.resourceSec.getAccounts().then((res) => {
            if (res.data == null) {
                this._addAccounts();
            } else {
                for (var key in res.data) {
                    account.key = key;
                    account.Balance = res.data[key].Balance;
                    account.Sold = res.data[key].Sold;
                    account.Recieved = res.data[key].Recieved;
                }
            }
        });
        return account;
    }
    //Muhasebe ilk kayıt
    async _addAccounts() {
        this.resourceSec.addAccounts({}, {
            Balance: 15000,
            Sold: 0,
            Recieved: 0
        });
    }
}