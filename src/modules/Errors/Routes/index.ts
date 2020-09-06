import {RouteConfig} from "vue-router";
import AccessErrorView from "@/views/Error/AccessErrorView.vue";

// Routes
export const errorsRoutes = Array<RouteConfig>(
    {path: "/error/access", name: "Access Error View", component: AccessErrorView},
);