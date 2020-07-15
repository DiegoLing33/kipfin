<template>
    <user-content
            title="Чат комнаты"
            min-access="1"
            :no-body="true"
    >
        <div class="chat d-table w-100" id="chat-frame" :style="({opacity: chatRooms && chatRooms.length > 0 ? 1 : 0})">
            <div style="display: table-row; width: 100%" class="w-100">
                <div style="display: table-cell">
                    <chat-rooms-list
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
                        <chat-input-view
                                :selected-room="selectedRoom ? selectedRoom.roomId : 0"
                        />
                    </div>
                </div>
            </div>
        </div>
    </user-content>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {APIChatMessageResult} from "@/app/api/APIChat";
    import ChatBox from "@/components/chat/ChatBox.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {ServerChatGroup, ServerChatRoom} from "@/app/api/classes/ServerChats";
    import Server from "@/app/api/Server";
    import ChatRoomsList from "@/components/chat/ChatRoomsList.vue";
    import {nullable} from "@/ling/types/Common";
    import ChatInputView from "@/components/chat/ChatInputView.vue";

    @Component({
        components: {ChatInputView, ChatRoomsList, UserContent, ChatBox}
    })
    export default class Chat extends StoreLoadedComponent {

        private templateCharMessagesHeight = "10px";
        private messages: APIChatMessageResult[] = [];
        private selectedRoom = nullable<ServerChatRoom>();

        private chatGroups = Array<ServerChatGroup>();

        private chatRooms = Array<ServerChatRoom>();
        private charRoomsLastPage = 0;
        private chatRoomsTotalCount = 0;


        protected storeLoaded() {
            this.update();
            this.fixTemplate();
        }

        protected async loadChatRooms(){
            const res = await Server.chats.getRooms(this.charRoomsLastPage);
            this.chatRoomsTotalCount = res.count;
            this.chatRooms.push(...res.items);
        }

        protected async update(){
            this.chatGroups = (await Server.loadAllPages(Server.chats.getGroups)).items;
            await this.loadChatRooms();

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
                background-color: rgba(0, 107, 128, 0.4);
            }
            .room-item {
                border-bottom: 1px solid #e9e9e9;
                cursor: pointer;
                padding: 5px 0;
                &:hover {
                    background-color: rgba(0, 107, 128, 0.3);
                }
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