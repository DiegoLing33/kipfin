<template>
    <div class="rooms">
        <div
                v-for="room of rooms"
                :key="room.roomId"
                class="room-item"
                @click="$emit('select', room)"
                :data-selected="selectedRoom !== null &&
                selectedRoom.roomId === room.roomId ? 1 :0"
        >
            <user-avatar-box :user="displayOwner(room)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import {ServerChatRoom} from "@/app/api/classes/ServerChats";

    /**
     *  The ChatRoomsList component.
     *  @author diego
     *  @created 08.07.2020 19:41
     */
    @Component({
        components: {UserAvatarBox}
    })
    export default class ChatRoomsList extends Vue {
        @Prop({default: []}) rooms!: ServerChatRoom[];
        @Prop({default: null}) selectedRoom!: ServerChatRoom | null;


        private displayOwner(room: ServerChatRoom) {
            if (room.roomChatGroupId > 0){
                return {
                    lastname: '',
                    surname:'',
                    name: room.roomChatGroup.chatGroupTitle,
                    userId: room.roomId,
                    group: {
                        groupTitle: "Комната",
                        groupId: 0,
                    }
                }
            }
            return room.roomReceiver;
        }
    }
</script>

<style scoped>
</style>