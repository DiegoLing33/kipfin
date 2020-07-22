<template>
    <user-content
            :overlay="busy"
            title="Чат с приемной комиссией"
            description="Здесь Вы можете написать любой вопрос в приемную комиссию, мы обязательно Вам ответим!"
    >
        <chat-box :messages="messages"/>
        <div class="p-3 text-center text-muted" v-if="messages.length === 0">
            В чате пока нет сообщений
        </div>
        <hr class="my-3"/>
        <b-textarea
                v-model="messageText"
                placeholder="Введите текст сообщения... (Используйте клавишу ↩ [Enter] для переноса строки)"
        />
        <b-button variant="success" class="my-3" @click="messageSend">
            Отправить сообщение
        </b-button>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ChatBox from "@/components/chat/ChatBox.vue";
    import API from "@/app/api/API";
    import {APIChatMessageResult} from "@/app/api/APIChat";
    import StoreLoader from "@/app/client/StoreLoader";
    import UserContent from "@/components/theme/UserContent.vue";
    import Server from "@/app/api/Server";
    import {ServerChatMessage} from "@/app/api/classes/ServerChats";
    import {ChatGroupUtils} from "@/app/Chat";

    @Component({
        components: {UserContent, ChatBox}
    })
    export default class ProfileChat extends Vue {
        private messageText = "";
        private busy = false;
        private messages: ServerChatMessage[] = [];

        private roomId = -1;

        async mounted() {
            this.roomId = parseInt(this.$route.params.id) || -1;
            StoreLoader.loopAfterWaiting(this.$store, () => this.update());
        }

        async update() {
            await this.$transaction(async () => {

                const rooms = (await Server.chats.getRooms(0)).items;
                if (rooms.length > 0) {
                    const res = await Server.loadAllPages(Server.chats.getMessagesAll, {roomId: rooms[0].roomId});
                    this.messages = res.items;
                    ChatGroupUtils.readAllUnreadMessages(this.messages, parseInt(this.$store.getters.user.userId)).then();
                }
            });
            this.busy = false;
        }

        async messageSend() {
            this.busy = false;
            await this.$transaction(async () => {
                await API.request("admission.sendChat", {
                    text: this.messageText
                });
                await this.update();
                this.messageText = "";
                this.busy = false;
            });
        }
    }
</script>

<style scoped>
</style>
