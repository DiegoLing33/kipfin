import Vue from 'vue'
import Vuex from 'vuex'
import {account} from "@/core/Store/account";
import {student} from "@/core/Store/student";
import {authentication} from "@/modules/Authentication/Store/authentication";
import {appState} from "@/core/Store/appState";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        account: account,
        student: student,
        authentication: authentication,
        app: appState,
    },
    state: {
        errorMessage: "",
        ready: false,
        numbers: "+7 (925) 613-04-26",
        lastUserUpdate: new Date(),
    },
    getters: {

    },
    mutations: {
        /**
         * Sets error message text
         * @param state
         * @param payload
         */
        error(state, payload){
            state.errorMessage = payload;
        }
    },
    actions: {

    },
});
