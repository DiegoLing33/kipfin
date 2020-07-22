<template>
    <user-content
        :title="title"
        :description="decription"
    >
        <div v-if="room !== null">
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
        </div>
        <b-card v-else class="text-center">
            <b-icon-x-circle font-scale="3" class="m-3"/>
            <h4>Комната не найдена</h4>
        </b-card>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/app/client/StoreLoader";
    import {APIChatMessageResult, APIChatRoomResult} from "@/app/api/APIChat";
    import ChatBox from "@/components/chat/ChatBox.vue";
    import API from "@/app/api/API";
    import UserUtils from "@/app/utils/UserUtils";
    import ChatUtils from "@/app/utils/ChatUtils";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent, ChatBox}
    })
    export default class Chat extends Vue {

        private messageText = "";
        private messages: APIChatMessageResult[] = [];
        private room: APIChatRoomResult | null = null;
        private roomId = -1;

        private title = "";
        private decription = "";

        mounted() {
            this.roomId = parseInt(this.$route.params.id) || -1;
            StoreLoader.loopAfterWaiting(this.$store, () => this.update());
        }

        private update() {
            this.$transaction(this, async () => {
                this.messages = (await API.chat.getMessages(this.roomId)).list;
                ChatUtils.readAllUnreadMessages(this.$store.state.currentUser, this.messages).then();
                this.room = this.messages[0].room;
                this.title = "Чат комната #" + this.room.roomId;
                this.decription = `Основатель: ${UserUtils.getFullName(this.messages[0].sender)}`;
            });
        }

        private messageSend() {

            this.$api.transaction(this, async() => {
                await API.chat.send(this.room?.roomId || '-1', this.messageText);
                await this.update();
                this.messageText = "";
            });
        }
    }
</script>

<style scoped>
</style>