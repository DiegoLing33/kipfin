<template>
    <div class="view-ChatInputView">
        <b-overlay :show="busy">
            <b-textarea
                    no-resize
                    :disabled="disabled || selectedRoom === null"
                    v-model="messageText"
                    placeholder="Введите текст сообщения... (Используйте клавишу ↩ [Enter] для переноса строки)"
            />
            <b-button
                    :disabled="disabled || messageText === ''  || selectedRoom === null"
                    block variant="success" class="mt-3" @click="messageSend">
                Отправить сообщение
            </b-button>
        </b-overlay>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Server from "@/core/app/api/Server";
    import {ServerChatRoom} from "@/core/app/api/classes/ServerChats";
    import {Nullable} from "@/core/Common/Common";

    /**
     *  The ChatInputView component.
     *  @author diego
     *  @created 08.07.2020 19:45
     */
    @Component
    export default class ChatInputView extends Vue {
        @Prop({default: null}) selectedRoom!: Nullable<ServerChatRoom>;
        @Prop({default: false}) disabled!: boolean;
        private busy = false;
        private messageText = "";

        /**
         * Sends the message
         */
        private async messageSend() {
            if (this.selectedRoom !== null) {
                this.busy = true;
                try {
                    const res = await Server.chats.sendMessage(this.selectedRoom.roomId, this.messageText);
                    const result = res.result;
                    if (!result) throw Error("Сообщение не отправлено...");
                    this.busy = false;
                    this.messageText = "";
                    this.$emit("sent");
                } catch (e) {
                    (this as any).$api.error(this, e);
                }
            }
        }
    }
</script>

<style scoped>
</style>