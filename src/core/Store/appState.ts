import {Module} from "vuex";
import {Nullable} from "@/core/Common/Common";

export interface AppStateStates {
    isLoading: boolean;
    loadingErrorText: Nullable<string>;
}

export const appState: Module<AppStateStates, any> = {
    namespaced: true,
    state: {
        isLoading: false,
        loadingErrorText: null,
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        loadingErrorText(state) {
            return state.loadingErrorText;
        },
    },
    mutations: {
        setLoadingState(state, payload: { result: boolean; error: Nullable<string> }) {
            state.isLoading = payload.result;
            state.loadingErrorText = payload.error || null;
        },
        isLoading(state, payload){
            state.isLoading = payload;
        }
    },
    actions: {
        appDidLoad({commit}, payload) {
            commit("setLoadingState", {result: payload.result, error: payload.error || null});
        },
        startLoading({commit}){
            commit("isLoading", true);
        },
        stopLoading({commit}){
            commit("isLoading", false);
        }
    },
};