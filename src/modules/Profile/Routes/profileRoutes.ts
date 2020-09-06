import {RouteConfig} from "vue-router";
import ProfileParents from "@/modules/Profile/Pages/ProfileParents.vue";
import ProfilePassport from "@/modules/Profile/Pages/ProfilePassport.vue";
import ProfileSettings from "@/modules/Profile/Pages/ProfileSettings.vue";
import CreateProfileView from "@/modules/Profile/Pages/CreateProfileView.vue";

export const profileRoutes = Array<RouteConfig>(
    {path: '/create', name: 'Create LK', component: CreateProfileView},
    {
        path: '/user/parents', name: 'User Profile parents', component: ProfileParents,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/passport', name: 'User Profile Passport', component: ProfilePassport,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/settings', name: 'User Documents', component: ProfileSettings,
        meta: {requiredAuth: true}
    },
);