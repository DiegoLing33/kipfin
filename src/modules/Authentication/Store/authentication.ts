import Vue from "vue";
import Vuex, {Module} from "vuex";
import API from "@/core/app/api/API";
import Server from "@/core/app/api/Server";
import KFUser from "@/modules/Users/Common/KFUser";
import {setCookie} from "@/core/app/plugins/account/utils/Cookies";

export const DISPATCH_AUTH_REQUEST = "sendAuthRequest";
export const DISPATCH_LOGOUT_REQUEST = "sendLogoutRequest";
export const DISPATCH_USER_REQUEST = "sendUserRequest";

export const COMMIT_AUTH_REQUEST_SENT = "authRequestSent";
export const COMMIT_AUTH_REQUEST_SUCCESS = "authRequestSuccess";
export const COMMIT_AUTH_REQUEST_ERROR = "authRequestError";

export const AUTH_REQUEST_STATUS_LOADING = "loading";
export const AUTH_REQUEST_STATUS_SUCCESS = "success";
export const AUTH_REQUEST_STATUS_ERROR = "error";

export const ACCOUNT_TOKEN_STORAGE = 'account-token';


Vue.use(Vuex);

/**
 * Account
 */
export const authentication: Module<any, any> = {
    state: {
        aToken: localStorage.getItem(ACCOUNT_TOKEN_STORAGE) || '',
        aStatus: '',
    },
    getters: {
        accountIsAuthenticated: state => !!state.aToken,
        accountAuthToken: state => state.aToken,
        accountAuthStatus: state => state.aStatus,
    },
    actions: {
        [DISPATCH_AUTH_REQUEST]: ({commit, dispatch}, {login, password}: { login: string; password: string }) => {
            return new Promise((resolve, reject) => {
                API.users.login(login, password).then(value => {
                    const token = value.token;
                    localStorage.setItem(ACCOUNT_TOKEN_STORAGE, token);
                    commit(COMMIT_AUTH_REQUEST_SUCCESS, token);
                    dispatch(DISPATCH_USER_REQUEST).then(() => resolve(value.token || ''))
                        .catch(reason => reject(reason));
                }).catch(reason => {
                    commit(COMMIT_AUTH_REQUEST_ERROR, reason);
                    localStorage.removeItem(ACCOUNT_TOKEN_STORAGE);
                    reject(reason);
                });
            });
        },
        [DISPATCH_USER_REQUEST]: ({commit}) => {
            return new Promise((resolve, reject) => {
                API.users.me().then(result => {
                    commit("login", new KFUser(result));
                    resolve(true);
                }).catch(reason => {
                    commit("loginError", reason);
                    reject(reason);
                });
            });
        },
        [DISPATCH_LOGOUT_REQUEST]: () => {
            return new Promise((resolve, reject) => {
                API.TOKEN = '';
                Server.TOKEN = '';
                localStorage.removeItem(ACCOUNT_TOKEN_STORAGE);
                API.users.logout().then(() => resolve(true))
                    .catch(reason => reject(reason));
            });
        },
    },
    mutations: {
        [COMMIT_AUTH_REQUEST_SENT]: (state) => {
            state.aStatus = AUTH_REQUEST_STATUS_LOADING;
        },
        [COMMIT_AUTH_REQUEST_SUCCESS]: (state, token) => {
            state.aStatus = AUTH_REQUEST_STATUS_SUCCESS;
            state.aToken = token;
            API.TOKEN = token;
            Server.TOKEN = token;
            setCookie("token", token);
        },
        [COMMIT_AUTH_REQUEST_ERROR]: (state) => {
            state.aStatus = AUTH_REQUEST_STATUS_ERROR;
        },
    },
}