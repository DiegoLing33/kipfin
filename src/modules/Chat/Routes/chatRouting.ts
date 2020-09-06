import ProfileChat from "@/modules/Profile/Pages/ProfileChat.vue";
import Chat from "@/modules/Chat/Pages/Chat.vue";

export const chatRouting = [
    {
        path: '/user/chat', name: 'User Profile Chat', component: ProfileChat,
        meta: {requiredAuth: true}
    },
    {
        path: '/chat/:id', name: "Chat Room", component: Chat,
        meta: {requiredAuth: true}
    },
    {
        path: '/chat', name: "Chats Page", component: Chat,
        meta: {requiredAuth: true}
    },
]