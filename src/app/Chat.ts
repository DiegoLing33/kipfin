import {ServerUser} from "@/app/api/classes/ServerUsers";
import {ServerChatGroup, ServerChatMessage} from "@/app/api/classes/ServerChats";
import {Numeric} from "@/ling/types/Common";
import Server from "@/app/api/Server";

/**
 * Char group or chat user
 */
export type ChatItemUserRoom = ServerUser | ServerChatGroup;

/**
 * Chat group utils
 */
export class ChatGroupUtils {
    /**
     * Returns the members list
     * @param group
     */
    public static getMembers(group: ServerChatGroup): string[] {
        return group.chatGroupMembers.split(",");
    }

    /**
     * Returns true, if member
     * @param userId
     * @param group
     */
    public static isMember(userId: Numeric, group: ServerChatGroup) {
        return ChatGroupUtils.getMembers(group).includes(userId.toString());
    }

    /**
     * Reads all messages
     * @param messages
     * @param myId
     */
    public static async readAllUnreadMessages(messages: ServerChatMessage[], myId: number) {
        const realMessages = messages
            .filter(value => value.messageStatus === 1 && value.messageSenderId !== myId)
            .map(value => value.messageId).join(",");
        messages.forEach(value => value.messageStatus = 2);
        return await Server.chats.read(realMessages);
    }
}