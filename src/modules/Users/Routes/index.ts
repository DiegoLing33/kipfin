import {RouteConfig} from "vue-router";
import UserView from "@/views/User.vue";

export const usersRoutes = Array<RouteConfig>(
    {
        path: '/user', name: "User Me Page", component: UserView,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/:id', name: "User Page", component: UserView,
        meta: {requiredAuth: true}
    },
);