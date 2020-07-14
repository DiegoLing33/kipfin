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

    @Component({
        components: {UserContent, ChatBox}
    })
    export default class ProfileChat extends Vue {
        private messageText                      = "";
        private busy                             = false;
        private messages: APIChatMessageResult[] = [];

        private roomId = -1;

        async mounted() {
            this.roomId = parseInt(this.$route.params.id) || -1;
            StoreLoader.loopAfterWaiting(this.$store, () => this.update());
        }

        async update() {
            await this.$api.transaction(this, async() => {

                const rooms = await API.chat.getRooms("admission");
                if (rooms.list.length > 0) {
                    const room    = rooms.list[0];
                    this.messages = (await API.chat.getMessages(room.roomId)).list;
                }

                for (const m of this.messages) {
                    if (m.senderId !== this.$store.state.me.user_id && m.messageStatus === '1') {
                        await API.chat.readMessage(m.messageId);
                        m.messageStatus = '2';
                    }
                }
            });
            this.busy = false;
        }

        async messageSend() {
            this.busy = false;
            this.$api.transaction(this, async() => {
                await API.request("admission.sendChat", {
                    text: this.messageText
                });
                await this.update();
                this.messageText = "";
                this.busy        = false;
            });
        }
    }
</script>

<style scoped>
</style>
