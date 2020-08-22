import Vue from 'vue'
import Vuex from 'vuex'
import {APIFileResult} from "@/app/api/APIFiles";
import KFUser from "@/app/client/KFUser";
import KFDocument from "@/app/client/KFDocument";
import {account} from "@/app/store/account";
import {student} from "@/app/store/student";
import {authentication} from "@/app/store/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        account: account,
        student: student,
        authentication: authentication,
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
