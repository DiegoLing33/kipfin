import {RouteConfig} from "vue-router";
import DocumentsHome from "@/modules/Documents/Pages/DocumentsHome.vue";

export const documentsRoutes = Array<RouteConfig>(
    {
        path: '/documents', name: "Documents Page", component: DocumentsHome,
        meta: {requiredAuth: true}
    },
);