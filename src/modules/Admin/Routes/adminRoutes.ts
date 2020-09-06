import {RouteConfig} from "vue-router";
import AdminIndex from "@/modules/Admin/Pages/AdminIndex.vue";
import AdmissionList from "@/modules/Admission/Pages/AdmissionList.vue";
import AdminChats from "@/modules/Admin/Pages/AdminChats.vue";
import AdminLastActions from "@/modules/Admin/Pages/AdminLastActions.vue";
import AdmissionFilesFeed from "@/modules/Admission/Pages/AdmissionFilesFeed.vue";
import AdminUsersList from "@/modules/Admin/Pages/AdminUsersList.vue";
import AdminUsersGroupsList from "@/modules/Admin/Pages/AdminUsersGroupsList.vue";
import AdminStats from "@/modules/Admin/Pages/AdminStats.vue";
import AdminUpdates from "@/modules/Admin/Pages/AdminUpdates.vue";
import AdminStudentGroups from "@/modules/Admin/Pages/AdminStudentGroups.vue";
import AdminGroupsEntityView from "@/modules/Admin/Pages/Groups/AdminGroupsEntityView.vue";

export const adminRoutes = Array<RouteConfig>(
    {
        path: '/admin', name: 'Admin Home', component: AdminIndex,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/list', name: 'Admin List', component: AdmissionList,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/chats', name: 'Admin Chats', component: AdminChats,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/fire', name: 'Admin Fire', component: AdminLastActions,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/feed', name: 'Admin Feed', component: AdmissionFilesFeed,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/users', name: 'Admin Users List', component: AdminUsersList,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/roles', name: 'Admin Users Groups List', component: AdminUsersGroupsList,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/stats', name: 'Admin Admission Statst', component: AdminStats,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/news', name: 'Admin Admission News', component: AdminUpdates,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/groups', name: 'Admin Student Groups', component: AdminStudentGroups,
        meta: {requiredAuth: true, requiredAccess: 17}
    },
    {
        path: '/admin/groups/i/:id', name: 'Admin Groups Entity', component: AdminGroupsEntityView,
        meta: {requiredAuth: true, requiredAccess: 17}
    },
);