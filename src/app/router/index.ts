import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../../views/Home.vue'
import AdminList from "@/views/Admin/AdminList.vue";
import ProfileParents from "@/views/Profile/ProfileParents.vue";
import ProfileChat from "@/views/Profile/ProfileChat.vue";
import AdminIndex from "@/views/Admin/AdminIndex.vue";
import AdminChats from "@/views/Admin/AdminChats.vue";
import ProfilePassport from "@/views/Profile/ProfilePassport.vue";
import Chat from "@/views/Chat.vue";
import UserView from "@/views/User.vue";
import ProfileDocuments from "@/views/Profile/ProfileDocuments.vue";
import AdminLastActions from "@/views/Admin/AdminLastActions.vue";
import AdminFilesFeed from "@/views/Admin/AdminFilesFeed.vue";
import CreateProfileView from "@/views/Defaults/CreateProfileView.vue";
import LoginProfile from "@/views/Defaults/LoginProfile.vue";
import ProfileSettings from "@/views/Profile/ProfileSettings.vue";
import AdminUsersList from "@/views/Admin/AdminUsersList.vue";
import AdminUsersGroupsList from "@/views/Admin/AdminUsersGroupsList.vue";
import AdminStats from "@/views/Admin/AdminStats.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
      {path: '/', name: 'Home', component: Home},
      {path: '/login', name: 'Login', component: LoginProfile},
      {path: '/create', name: 'Create LK', component: CreateProfileView},

      {path: '/admin', name: 'Admin Home', component: AdminIndex},
      {path: '/admin/list', name: 'Admin List', component: AdminList},
      {path: '/admin/chats', name: 'Admin Chats', component: AdminChats},
      {path: '/admin/fire', name: 'Admin Chats', component: AdminLastActions},
      {path: '/admin/feed', name: 'Admin Feed', component: AdminFilesFeed},
      {path: '/admin/users', name: 'Admin Users List', component: AdminUsersList},
      {path: '/admin/roles', name: 'Admin Users Groups List', component: AdminUsersGroupsList},
      {path: '/admin/stats', name: 'Admin Admission Statst', component: AdminStats},

      {path: '/chat/:id', name: "Chat Room", component: Chat},
      {path: '/user/parents', name: 'User Profile parents', component: ProfileParents},
      {path: '/user/chat', name: 'User Profile Chat', component: ProfileChat},
      {path: '/user/passport', name: 'User Profile Passport', component: ProfilePassport},
      {path: '/user/documents', name: 'User Documents', component: ProfileDocuments},
      {path: '/user/settings', name: 'User Documents', component: ProfileSettings},
      {path: '/user', name: "User Me Page", component: UserView},
      {path: '/user/:id', name: "User Page", component: UserView},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
