import accountServices from "../assets/project/services/accountServices";
const sAccount = new accountServices();

const state = {
    Account: {
        key: "",
        Balance: "",
        Sold: "",
        Recieved: ""
    }
};

const getters = {
    getBalance() {
        return state.Account.Balance;
    },
    getRecieved() {
        return state.Account.Recieved;
    },
    getSold() {
        return state.Account.Sold;
    }
};

const mutations = {
    async getAccounts() {
        const d = await sAccount._getAccounts();
        state.Account.key = d.key;
        state.Account.Balance = d.Balance;
        state.Account.Sold = d.Sold;
        state.Account.Recieved = d.Recieved;
        // return state.Account;
    },
    async updateAccounts(type, val) {
        var done = false;
        await this.getAccounts();
        if (type == 1) { //Satım
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) + parseFloat(val));
            state.Account.Sold = Math.round(parseFloat(state.Account.Sold) + parseFloat(val));
        } else if (type == 2) { //Alım
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) - parseFloat(val));
            state.Account.Recieved = Math.round(parseFloat(state.Account.Recieved) + parseFloat(val));
        } else if (type == 3) { //İade
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) + parseFloat(val));
            state.Account.Recieved = Math.round(parseFloat(state.Account.Recieved) - parseFloat(val));
        }
        done = await sAccount._updateAccounts(state.Account);
        return done;
    }
};

export default {
    state,
    getters,
    mutations,
};