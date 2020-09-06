<template>
    <div class="rooms" @scroll="onScroll">
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
    import UserAvatarBox from "@/modules/Users/Components/UserBox/UserAvatarBox.vue";
    import {ServerChatRoom} from "@/core/app/api/classes/ServerChats";
    import ChatRoomItem from "@/modules/Chat/Components/ChatRoomItem";

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
        private lastTryScroll = 0;

        get roomsList(){
            return this.rooms.filter(v => v.roomStatus < 3);
        }

        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}: any) {
            if (scrollTop + clientHeight >= scrollHeight && new Date().getTime() - this.lastTryScroll > 2000) {
                this.lastTryScroll = new Date().getTime();
                this.$emit("more");
            }
        }
    }
</script>