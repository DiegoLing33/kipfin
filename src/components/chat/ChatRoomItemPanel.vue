<template>
    <transition name="bounceRight">
        <div v-if="visible" class="room-panel">
            <b-button
                    @click="onArchiveRoom"
                    v-b-tooltip.hover.right title="Архивировать" class="h-100 float-right" squared>
                <b-icon-archive/>
            </b-button>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ServerChatRoom} from "@/app/api/classes/ServerChats";
    import Server from "@/app/api/Server";

    /**
     *  The ChatRoomItemPanel component.
     *  @author diego
     *  @created 15.07.2020 23:32
     */
    @Component
    export default class ChatRoomItemPanel extends Vue {
        @Prop({required: true}) visible!: boolean;
        @Prop({required: true}) room!: ServerChatRoom;

        protected onArchiveRoom() {
            this.$transaction(async () => {
                await Server.chats.setRoomStatus(this.room.roomId, 3);
                this.room.roomStatus = 3;
                this.$bvToast.toast("Команата убрана в архив", {title: "Успех!"});
            });
        }
    }
</script>

<style scoped>
    .bounceRight-enter-active {
        animation: bounce-inA .3s;
    }

    .bounceRight-leave-active {
        animation: bounce-inA .3s reverse;
    }

    @keyframes bounce-inA {
        0% {
            transform: translateX(200px)
        }
        100% {
            transform: translateX(0)
        }
    }
</style>