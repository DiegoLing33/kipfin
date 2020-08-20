import Vue from 'vue'
import Vuex from 'vuex'
import {APIFileResult} from "@/app/api/APIFiles";
import KFUser from "@/app/client/KFUser";
import KFDocument from "@/app/client/KFDocument";
import {account} from "@/app/store/account";
import {student} from "@/app/store/student";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        account: account,
        student: student,
    },
    state: {
        currentToken: "",
        currentUserFiles: Array<KFDocument>(),
        currentUser: KFUser.createZeroUser(),
        apiErrorText: "",

        errorMessage: "",

        ready: false,
        token: "",
        me: {
            authed: false,
            "user_id": "0",
            "mail": "",
            "name": "",
            "lastname": "",
            "surname": "",
            "phone": "",
            "birthday": "",
            "gender": "",
            "facultyId": "0",
            "motherCapital": "0",
            "studentStatus": "0",
            "studyBase": "0",
            "notified": "0",
            "created": "2020-06-04 16:26:12",
            "school": {
                "schoolStatus": "0",
                "schoolName": null,
                "schoolAddress": null,
                "schoolValue": null,
                "schoolDegreeCode": "0",
            },
            "group": {
                "group_id": "0",
                "title": "",
                "access": "0"
            },
        },
        files: Array<APIFileResult>(),
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
