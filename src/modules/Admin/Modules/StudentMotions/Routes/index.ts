import {RouteConfig} from "vue-router";
import StudentMotionsPage from "@/modules/Admin/Modules/StudentMotions/Pages/StudentMotionsPage.vue";

export const adminStudentMotionsRoutes = Array<RouteConfig>(
    {
        path: '/admin/student/motions',
        component: StudentMotionsPage
    }
);