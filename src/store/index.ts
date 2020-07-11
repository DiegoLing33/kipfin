import Vue from 'vue'
import Vuex from 'vuex'
import API from "@/api/API";
import {APIFileResult} from "@/api/APIFiles";
import KFUser from "@/client/KFUser";
import KFDocument from "@/client/KFDocument";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentToken: "",
        currentUserFiles: Array<KFDocument>(),
        currentUser: KFUser.createZeroUser(),
        apiErrorText: "",
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

        /**
         * Returns the current user
         * @param state
         */
        currentUser(state): KFUser {
            return state.currentUser;
        },

        /**
         * Returns the current token value
         * @param state
         */
        currentToken(state) {
            return state.currentToken;
        },

        /**
         * Returns all files of current user
         * @param state
         */
        currentUserFiles(state): KFDocument[] {
            return state.currentUserFiles;
        },

        /**
         * Returns true, if current token is real
         * @param state
         */
        isUserCanBeLoggedIn(state) {
            return state.currentToken && state.currentToken !== "";
        },

        /**
         * Returns true, if current user has access
         * @param state
         * @param value
         */
        isAccess(state, value) {
            return state.currentUser.group.hasAccess(value);
        },

        /**
         * Returns true, if user is admin
         * @param state
         */
        isAdmin(state) {
            return state.currentUser.group.hasAccess('7');
        },
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

        /**
         * Sets the current token
         * @param state
         * @param token
         */
        setCurrentToken(state, token: string) {
            state.currentToken = token;
        },

        /**
         * Sets the current user value
         * @param state
         * @param data
         */
        setCurrentUserData(state, data) {
            if (data) {
                state.currentUser = data;
                state.ready = true;
            } else {
                state.currentUser = KFUser.createZeroUser();
                state.ready = false;
            }
        }
    },
    actions: {
        /**
         * Updates the current user data
         * @param context
         * @param token
         */
        async updateCurrentUser(context, token?: string) {
            token = token || context.getters.currentToken;
            API.init(token as string);
            const user = new KFUser(await API.users.me());
            context.commit("setCurrentUserData", user);
        },

        /**
         * Updates the current user files
         * @param context
         */
        async updateCurrentUserFiles(context) {
            context.state.currentUserFiles = await context.state.currentUser.loadAllUserFiles();
        },

        /**
         * Updates the current token INFO from cookies
         * @param context
         * @param cookies
         */
        async updateCurrentUserToken(context, cookies) {
            const token = cookies.get("token") || "";
            context.commit("setCurrentToken", token);
        }
    },
    modules: {}
})
