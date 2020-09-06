import {RouteConfig} from "vue-router";
import Feed from "@/modules/Feed/Pages/Feed.vue";

// Routes
export const feedRoutes = Array<RouteConfig>(
    {
        path: '/feed', name: "Feed Page", component: Feed,
        meta: {requiredAuth: true}
    },
);