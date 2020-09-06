<template>
    <user-content
            min-access="7"
            :no-body="true"
    >
        <template v-slot:header>
            <b-card-title>
                <h2>Чат команты <b-badge variant="primary">beta</b-badge></h2>
            </b-card-title>
            <b-select
                    @input="onGroupSelected"
                    :options="groupOptions" v-model="selectedGroup"></b-select>
        </template>
        <div class="chat d-table w-100" id="chat-frame" :style="({opacity: chatRooms && chatRooms.length > 0 ? 1 : 0})">
            <div style="display: table-row; width: 100%" class="w-100">
                <div style="display: table-cell">
                    <chat-rooms-list
                            @more="onClickLoadMoreRooms"
                            :loaded-count="chatRooms.length"
                            :total-count="chatRoomsTotalCount"
                            @selected="onSelectRoom"
                            :selected-room="selectedRoom"
                            :rooms="chatRooms"/>
                </div>
                <div style="display: table-cell; width: 70%; position: relative; ">
                    <div class="chat-messages" :style="({maxHeight: templateCharMessagesHeight})">
                        <chat-box :messages="messages" class="h-100"/>
                    </div>
                    <div class="p-3 text-center text-muted" v-if="messages.length === 0">
                        В чате пока нет сообщений
                    </div>
                    <div class="chat-input" id="chat-input-field">
                        <chat-input-view @sent="onMessageSent" :selected-room="selectedRoom"
                        />
                    </div>
                </div>
            </div>
        </div>
    </user-content>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import ChatBox from "@/modules/Chat/Components/ChatBox.vue";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import StoreLoadedComponent from "@/core/Components/mixins/StoreLoadedComponent.vue";
    import {ServerChatGroup, ServerChatMessage, ServerChatRoom} from "@/core/app/api/classes/ServerChats";
    import Server from "@/core/app/api/Server";
    import ChatRoomsList from "@/modules/Chat/Components/ChatRoomsList.vue";
    import {Nullable, nullable} from "@/core/Common/Common";
    import ChatInputView from "@/modules/Chat/Components/ChatInputView.vue";
    import {ChatGroupUtils} from "@/core/app/Chat";

    @Component({
        components: {ChatInputView, ChatRoomsList, UserContent, ChatBox}
    })
    export default class Chat extends StoreLoadedComponent {

        private templateCharMessagesHeight = "10px";
        private messages: ServerChatMessage[] = [];
        private totalMessagesCount = 0;

        private selectedRoom = nullable<ServerChatRoom>();

        private chatGroups = Array<ServerChatGroup>();

        private chatRooms = Array<ServerChatRoom>();
        private chatRoomsTotalCount = 0;
        private chatRoomsLastPage = 0;

        private selectedGroup = 1;

        private get groupOptions() {
            return [{text: 'Личные сообщения', value: null}, ...this.chatGroups.map(value => {
                return {text: value.chatGroupTitle, value: value.chatGroupId}
            })];
        }

        /**
         * On click load more rooms
         */
        protected onClickLoadMoreRooms() {
            this.loadChatRooms(this.selectedGroup, this.chatRoomsLastPage + 1);
        }

        protected onMessageSent() {
            if (this.selectedRoom)
                this.loadMessages(this.selectedRoom, 0);
        }

        protected onSelectRoom(room: ServerChatRoom) {
            this.selectedRoom = room;
            this.loadMessages(room, 0);
        }

        protected async loadMessages(room: ServerChatRoom, page = 0) {
            const res = await Server.chats.getMessages(room.roomId, page);
            ChatGroupUtils.readAllUnreadMessages(res.items,
                parseInt(this.$store.getters.user.userId)).then();
            this.totalMessagesCount = res.count;
            if (page === 0) this.messages = [];
            this.messages.push(...res.items);
        }

        protected storeLoaded() {
            this.update();
            this.fixTemplate();
        }

        protected onGroupSelected(groupId: Nullable<number>) {
            this.selectedRoom = null;
            this.messages = [];
            this.loadChatRooms(groupId, 0);
        }

        protected async loadChatRooms(groupId: Nullable<number> = null, page = 0) {
            this.chatRoomsLastPage = page;
            let res;
            if (groupId === null) {
                res = await Server.chats.getRooms(page);
            } else {
                res = await Server.chats.getGroupRooms(groupId, page);
            }
            if (page === 0) this.chatRooms = [];
            this.chatRoomsTotalCount = res.count;
            this.chatRooms.push(...res.items);
        }

        protected async update() {
            this.chatGroups = (await Server.loadAllPages(Server.chats.getGroups)).items;
            await this.loadChatRooms(1, 0);

        }

        /**
         * Fixes the template issue
         */
        protected fixTemplate() {
            const chatInput = document.getElementById("chat-input-field");
            this.templateCharMessagesHeight = (
                600 - chatInput!.offsetHeight
            ) + "px";
        }
    }
</script>

<style lang="scss">
    .chat {
        width: 100%;

        ::-webkit-scrollbar {
            width: 3px; /* width of the entire scrollbar */
        }

        ::-webkit-scrollbar-track {
            background: rgba(86, 73, 49, 0.32); /* color of the tracking area */
        }

        ::-webkit-scrollbar-thumb {
            background-color: #7a7a7a; /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            border: 1px solid rgba(255, 255, 255, 0.09); /* creates padding around scroll thumb */
        }

        .rooms {
            max-height: 600px;
            height: 600px;
            overflow-y: scroll;

            [data-selected='1'] {
                background-color: rgba(0, 107, 128, 0.4) !important;
            }

            .room-item {
                border-bottom: 1px solid #e9e9e9;
                cursor: pointer;
                padding: 5px 0;
                position: relative;

                &:hover {
                    background-color: rgba(0, 107, 128, 0.3);
                }
            }

            .has-unread {
                background-color: rgba(179, 60, 5, 0.3);
            }

            .room-panel{
                position: absolute;
                /*background-color: rgba(255, 255, 255, 0.57);*/
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }

        .chat-messages {
            max-height: 400px;
            overflow-y: scroll;
            padding: 5px 20px;
        }

        .chat-input {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 15px;
            background-color: #ececec;
        }
    }
</style>