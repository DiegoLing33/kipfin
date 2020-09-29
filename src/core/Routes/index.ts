import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../../views/Home.vue'
import store from "../Store";
import StoreLoader from "@/core/app/client/StoreLoader";
import authenticationRoutes from "@/modules/Authentication/Routes/authenticationRoutes";
import {chatRouting} from "@/modules/Chat/Routes/chatRouting";
import {supportRoutes} from "@/modules/Support/Routes/supportRoutes";
import {adminRoutes} from "@/modules/Admin/Routes/adminRoutes";
import {profileRoutes} from "@/modules/Profile/Routes/profileRoutes";
import {feedRoutes} from "@/modules/Feed/Routes";
import {usersRoutes} from "@/modules/Users/Routes";
import {documentsRoutes} from "@/modules/Documents/Routes";
import {errorsRoutes} from "@/modules/Errors/Routes";
import {admissionRoutes} from "@/modules/Admission/Routes";
import foodRoutes from "@/modules/Food/Routes";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Home', component: Home},
    ...foodRoutes,
    ...admissionRoutes,
    ...adminRoutes,
    ...profileRoutes,
    ...chatRouting,
    ...usersRoutes,
    ...feedRoutes,
    ...documentsRoutes,
    ...supportRoutes,
    ...errorsRoutes,
    ...authenticationRoutes,
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth !== undefined) {
        if (store.getters.accountIsAuthenticated) {
            if (to.meta.requiredAccess) {
                StoreLoader.wait(store, () => {
                    if (!store.getters.user.group.hasAccess(to.meta.requiredAccess)) next("/error/access");
                    else next();
                });
            } else next();
        } else next("/login");
    } else next();
});

export default router
