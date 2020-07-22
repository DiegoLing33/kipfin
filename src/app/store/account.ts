import Vuex, {Module} from 'vuex'
import KFUser from "@/app/client/KFUser";
import API from "@/app/api/API";
import Vue from "vue";
import {Numeric} from "@/ling/types/Common";
import Server from "@/app/api/Server";

const LOGIN_TOKEN_IS_UNDEFINED = "Данные авторизации не найдены или устарели!";

Vue.use(Vuex);

/**
 * Account
 */
export const account: Module<any, any> = {
    state: {
        loggedUser: KFUser.createZeroUser(),
        loggedIn: false,
    },
    getters: {
        /**
         * Returns true, if user has access
         * @param state
         */
        hasAccess(state): (access: number) => boolean {
            return (access: Numeric) => state.loggedUser.group.hasAccess(access);
        },
        /**
         * Returns true, if user is logged in
         * @param loggedIn
         */
        isLoggedIn({loggedIn}): boolean {
            return loggedIn;
        },
        /**
         * Returns true, if user is admin
         * @param state
         */
        isAdmin(state): boolean{
          return state.loggedUser.group.hasAccess(7);
        },
        /**
         * Returns the current logged in user
         * @param current
         */
        user({loggedUser}): KFUser {
            return loggedUser;
        }
    },
    actions: {
        /**
         * Login action
         * @param commit
         * @param token
         */
        login({commit}, token) {
            return new Promise(resolve => {
                API.TOKEN = token;
                Server.TOKEN = token;
                if (token) {
                    API.users.me().then(result => {
                        commit("login", new KFUser(result));
                        resolve(true);
                    }).catch(reason => {
                        commit("loginError", reason);
                        resolve(false);
                    });
                } else {
                    commit("error", LOGIN_TOKEN_IS_UNDEFINED);
                    resolve(false);
                }
            });

        }
    },
    mutations: {
        /**
         * Logins the user
         * @param state
         * @param user
         */
        login(state, user: KFUser) {
            state.loggedIn = !!user;
            state.loggedUser = user;
        },
    }
};