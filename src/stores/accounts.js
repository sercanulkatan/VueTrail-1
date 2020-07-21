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

const actions={
    initApp({commit}){
        sAccount._getAccounts().then(d=>{
            state.Account.key = d.key;
            state.Account.Balance = d.Balance;
            state.Account.Sold = d.Sold;
            state.Account.Recieved = d.Recieved;
        })
    },
    async updateAccounts({commit,state},prms){
        var done = false;
        if (prms.type == 1) { //Satım
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) + parseFloat(prms.val));
            state.Account.Sold = Math.round(parseFloat(state.Account.Sold) + parseFloat(prms.val));
        } else if (prms.type == 2) { //Alım
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) - parseFloat(prms.val));
            state.Account.Recieved = Math.round(parseFloat(state.Account.Recieved) + parseFloat(prms.val));
        } else if (prms.type == 3) { //İade
            state.Account.Balance = Math.round(parseFloat(state.Account.Balance) + parseFloat(prms.val));
            state.Account.Recieved = Math.round(parseFloat(state.Account.Recieved) - parseFloat(prms.val));
        }
        await sAccount._updateAccounts(state.Account).then(res=>{
            done=res;
        });
        return done;
    }
}

export default {
    state,
    getters,
    actions,
};