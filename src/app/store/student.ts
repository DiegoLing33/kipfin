import Vue from "vue";
import Vuex, {Module} from "vuex";
import {Numeric} from "@/ling/types/Common";

Vue.use(Vuex);
export const student: Module<any, any> = {
    namespaced: true,
    state: {
        specializationId: "0",
        baseId: "0"
    },
    getters: {
        specializationId(state) {
            return state.specializationId;
        },
        baseId(state) {
            return state.baseId;
        }
    },
    actions: {
        updateStudentSpecialization({commit}, specializationId: Numeric) {
            commit("specializationId", specializationId);
        }
    },
    mutations: {
        specializationId(state, id) {
            state.studentSpecializationId = id;
            state.studentBaseId = "0";
        },
        baseId(state, id) {
            state.studentBaseId = id;
        }
    }
};