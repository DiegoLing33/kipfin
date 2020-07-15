<template>
    <div class="view-ChatInputView">
        <b-textarea
                no-resize
                :disabled="disabled"
                v-model="messageText"
                placeholder="Введите текст сообщения... (Используйте клавишу ↩ [Enter] для переноса строки)"
        />
        <b-button
                :disabled="disabled || messageText === ''"
                block variant="success" class="mt-3" @click="messageSend">
            Отправить сообщение
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    /**
     *  The ChatInputView component.
     *  @author diego
     *  @created 08.07.2020 19:45
     */
    @Component
    export default class ChatInputView extends Vue {
        @Prop({default: null}) selectedRoomId!: number;
        @Prop({default: false}) disabled!: boolean;
        private messageText = "";
        /**
         * Sends the message
         */
        private messageSend() {
            console.log(this.selectedRoomId);
        }
    }
</script>

<style scoped>
</style>