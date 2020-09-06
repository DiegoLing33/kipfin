import {RouteConfig} from "vue-router";
import SupportAppErrorView from "@/modules/Support/Pages/App/SupportAppError.vue";
import SupportAppRestoreView from "@/modules/Support/Pages/App/SupportAppRestoreView.vue";
import SupportView from "@/modules/Support/Pages/SupportView.vue";

export const supportRoutes = Array<RouteConfig>(
    {
        path: "/support/error",
        name: "Support app error page",
        component: SupportAppErrorView,
    },
    {
        path: "/support/restore",
        name: "Support app restore page",
        component: SupportAppRestoreView,
    },
    {
        path: "/support",
        name: "Support home page",
        component: SupportView,
    },
);