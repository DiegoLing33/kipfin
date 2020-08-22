import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../../views/Home.vue'
import AdminList from "@/views/Admin/AdminList.vue";
import ProfileParents from "@/views/Profile/ProfileParents.vue";
import ProfileChat from "@/views/Profile/ProfileChat.vue";
import AdminIndex from "@/views/Admin/AdminIndex.vue";
import AdminChats from "@/views/Admin/AdminChats.vue";
import ProfilePassport from "@/views/Profile/ProfilePassport.vue";
import Chat from "@/views/Chat.vue";
import UserView from "@/views/User.vue";
import AdminLastActions from "@/views/Admin/AdminLastActions.vue";
import AdminFilesFeed from "@/views/Admin/AdminFilesFeed.vue";
import CreateProfileView from "@/views/Defaults/CreateProfileView.vue";
import ProfileSettings from "@/views/Profile/ProfileSettings.vue";
import AdminUsersList from "@/views/Admin/AdminUsersList.vue";
import AdminUsersGroupsList from "@/views/Admin/AdminUsersGroupsList.vue";
import AdminStats from "@/views/Admin/AdminStats.vue";
import DocumentsHome from "@/views/DocumentsHome.vue";
import Feed from "@/views/Feed.vue";
import AdminUpdates from "@/views/Admin/AdminUpdates.vue";
import store from "../store/index";
import AccessErrorView from "@/views/Error/AccessErrorView.vue";
import LoginView from "@/views/Defaults/LoginView.vue";
import SupportView from "@/views/Support/SupportView.vue";
import SupportAppErrorView from "@/views/Support/App/SupportAppError.vue";
import SupportAppRestoreView from "@/views/Support/App/SupportAppRestoreView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name: 'Login', component: LoginView},
    {path: '/create', name: 'Create LK', component: CreateProfileView},

    {
        path: '/admin', name: 'Admin Home', component: AdminIndex,
        meta: {requiredAuth: true, requiredAccess: 7}
    },
    {
        path: '/admin/list', name: 'Admin List', component: AdminList,
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
        path: '/admin/feed', name: 'Admin Feed', component: AdminFilesFeed,
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
        path: '/chat/:id', name: "Chat Room", component: Chat,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/parents', name: 'User Profile parents', component: ProfileParents,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/chat', name: 'User Profile Chat', component: ProfileChat,
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
    {
        path: '/user', name: "User Me Page", component: UserView,
        meta: {requiredAuth: true}
    },
    {
        path: '/user/:id', name: "User Page", component: UserView,
        meta: {requiredAuth: true}
    },

    {
        path: '/chat', name: "Chats Page", component: Chat,
        meta: {requiredAuth: true}
    },
    {
        path: '/feed', name: "Feed Page", component: Feed,
        meta: {requiredAuth: true}
    },
    {
        path: '/documents', name: "Documents Page", component: DocumentsHome,
        meta: {requiredAuth: true}
    },
    {
      path: "/support/error",
      name :"Support app error page",
      component: SupportAppErrorView,
    },
    {
      path: "/support/restore",
      name :"Support app restore page",
      component: SupportAppRestoreView,
    },
    {
      path: "/support",
      name :"Support home page",
      component: SupportView,
    },
    {path: "/error/access", name: "Access Error View", component: AccessErrorView}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth !== undefined) {
        if (store.getters.accountIsAuthenticated) {
            if (to.meta.requiredAccess &&
                !store.getters.user.group.hasAccess(to.meta.requiredAccess)) {
                next("/error/access");
            } else next();
        } else next("/login");
    }else next();
});

export default router
