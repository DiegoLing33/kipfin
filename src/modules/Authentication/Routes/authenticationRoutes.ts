import {RouteConfig} from "vue-router";
import LoginPage from "@/modules/Authentication/Pages/LoginView.vue";

const authenticationRoutes: Array<RouteConfig> = [
    {path: '/login', name: 'Login', component: LoginPage},
];
export default authenticationRoutes;