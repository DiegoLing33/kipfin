import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/app/User";
import API from "@/api/API";
import {APIFileResult} from "@/api/APIFiles";
import KIPD from "@/app/KIPD";
import KFUser from "@/client/KFUser";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ready: false,
        token: "",
        currentUser: KFUser.createZeroUser(),
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
        /**
         * Returns all files of current user
         * @param state
         */
        myFiles(state): APIFileResult[] {
            return state.files;
        },

        /**
         * Returns required documents
         * @param state
         * @param getters
         */
        requiredDocuments(state, getters) {
            const tester = (type: string) => state.currentUser.getFiles().filter((f: APIFileResult) => f.file_type === type && f.file_status !== "3").length === 0;
            return ["passport", "attestat", "student-photo"].filter(tester);
        },

        /**
         * Returns in progress documents
         * @param state
         * @param getters
         */
        inProgressDocuments(state, getters) {
            const tester = (type: string) => state.currentUser.getFiles().some((f: APIFileResult) => f.file_type === type && f.file_status === "1");
            return ["passport", "attestat", "student-photo"].filter(tester);
        },

        /**
         * Returns required documents names
         * @param state
         * @param getters
         */
        requiredDocumentsNames(state, getters) {
            return getters.requiredDocuments.map((f: string) => KIPD.fileTypes[f]);
        },

        /**
         * Returns the documents status
         * @param state
         * @param getters
         */
        documentsStatus(state, getters) {
            if (getters.requiredDocuments.length > 0) return ["Не заполнено", "danger"];
            if (getters.inProgressDocuments.length > 0 && getters.requiredDocuments.length === 0) return ["В обработке", "info"];
            return ["Принято", "success"];
        },

        schoolStatus(state, getters) {
            if (state.currentUser.getRaw().school.schoolStatus === "0") return ["Не заполнено", "danger"];
            if (state.currentUser.getRaw().school.schoolStatus === "1") return ["В обработке", "info"];
            if (state.currentUser.getRaw().school.schoolStatus === "3") return ["Не принято", "danger"];
            return ["Принято", "success"];
        },

        canSendRequest(state, getters) {
            const a = state.currentUser.getRaw().school.schoolStatus !== "0";
            const b = getters.requiredDocuments.length === 0;
            const c = parseInt(state.currentUser.getRaw().studentStatus) < 1;
            return a && b && c;
        },

        isAdmin(state) {
            return state.currentUser.group.hasAccess('7');
        }
    },
    mutations: {
        /**
         * Sets the current token
         * @param state
         * @param sourceToken
         */
        async setCurrentUser(state, sourceToken: string | undefined | boolean) {
            if (sourceToken === false) sourceToken = state.token || undefined;
            if (sourceToken !== undefined) {
                state.token = sourceToken as string;
                API.init(sourceToken as string);
                await state.currentUser.updateUserMe();
                await state.currentUser.updateFiles();
                state.files = state.currentUser.getFiles();
                state.lastUserUpdate = new Date();
                state.ready = true;
            } else {
                throw Error("Данные авторизации не корректны");
            }
        },
    },
    actions: {},
    modules: {}
})
