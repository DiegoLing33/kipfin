<template>
    <div class="rooms">
        <chat-room-item
                v-for="room of roomsList"
                :key="room.roomId"
                class="room-item"
                :room="room"
                @click="$emit('selected', room)"
                :selected="selectedRoom && (selectedRoom.roomId === room.roomId)"
                :data-selected="selectedRoom && (selectedRoom.roomId === room.roomId ? '1' : '0')"
        />
        <b-button
                @click="$emit('more')"
                v-if="(totalCount - loadedCount) > 0"
                variant="primary" squared block>Загрузить еще ({{(totalCount - loadedCount)}})</b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import {ServerChatRoom} from "@/app/api/classes/ServerChats";
    import ChatRoomItem from "@/components/chat/ChatRoomItem";

    /**
     *  The ChatRoomsList component.
     *  @author diego
     *  @created 08.07.2020 19:41
     */
    @Component({
        components: {ChatRoomItem, UserAvatarBox}
    })
    export default class ChatRoomsList extends Vue {
        @Prop({default: []}) rooms!: ServerChatRoom[];
        @Prop({default: null}) selectedRoom!: ServerChatRoom | null;
        @Prop({default: 0}) totalCount!: number;
        @Prop({default: 0}) loadedCount!: number;

        get roomsList(){
            return this.rooms.filter(v => v.roomStatus < 3);
        }
    }
</script>