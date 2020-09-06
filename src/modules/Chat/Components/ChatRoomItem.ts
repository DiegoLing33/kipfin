import {Component, Prop, Vue} from "vue-property-decorator";
import {CreateElement, VNodeData} from "vue";
import UserAvatarBox from "@/modules/Users/Components/UserBox/UserAvatarBox.vue";
import {ServerChatRoom} from "@/core/app/api/classes/ServerChats";
import UserUtils from "@/modules/Users/Utils/UserUtils";
import ChatRoomItemPanel from "@/modules/Chat/Components/ChatRoomItemPanel.vue";

/**
 * Chat room item in char room list
 */
@Component
export default class ChatRoomItem extends Vue {
    /**
     * The sender
     */
    @Prop({required: true}) room!: ServerChatRoom;
    @Prop({required: true}) selected!: boolean;

    /**
     * Render method
     * @param h
     */
    render(h: CreateElement) {
        const data: VNodeData = {
            class: [],
            on: {
                click: (e: MouseEvent) => this.$emit("click", e)
            }
        };
        const panel: VNodeData = {
            props:{
                visible: this.selected,
                room: this.room,
            }
        };
        const props = {
            user: this.getRoomReceiver()
        }
        if (this.room.minMessageStatus === 1)
            data.class.push("has-unread");
        return h("div", data, [
            h(UserAvatarBox, {props}),
            h(ChatRoomItemPanel, panel)
        ]);
    }

    /**
     * Returns the correct receiver
     */
    getRoomReceiver() {
        if (this.room.roomChatGroupId > 0)
            return this.getRoomReceiverAsGroup();
        return this.room.roomReceiver;
    }

    /**
     * Returns chat group as receiver
     */
    getRoomReceiverAsGroup() {
        return {
            name: UserUtils.getFullName(this.room.roomOwner as any),
            lastname: "",
            surname: "",
            userId: this.room.roomId,
            group: {
                groupId: 0,
                groupTitle: this.room.roomChatGroup.chatGroupTitle
            }
        }
    }
}