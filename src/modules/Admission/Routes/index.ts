import {RouteConfig} from "vue-router";
import GetDoneView from "@/modules/Admission/Pages/GetDoneView.vue";
import AdmissionHome from "@/modules/Admission/Pages/AdmissionHome.vue";
import AdmissionList from "@/modules/Admission/Pages/AdmissionList.vue";
import AdmissionFilesFeed from "@/modules/Admission/Pages/AdmissionFilesFeed.vue";

export const admissionRoutes = Array<RouteConfig>(
    {
        path: '/admission',
        name: 'Admission Home',
        component: AdmissionHome,
    },
    {
        path: '/admission/list',
        name: 'Admission List',
        component: AdmissionList,
    },
    {
        path: '/admission/feed/files',
        name: 'Admission Files Feed',
        component: AdmissionFilesFeed,
    },
    {path: '/admission/getdone', name: 'Get Done', component: GetDoneView},
);