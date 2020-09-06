/**
 * Chat group interface
 */
import Server, {ServerPaged, ServerResponse} from "@/core/app/api/Server";
import {NameList, Nullable} from "@/core/Common/Common";
import {ServerUser} from "@/core/app/api/classes/ServerUsers";

/**
 * Server chat group
 */
export interface ServerChatGroup {
    chatGroupId: number;
    chatGroupTitle: string;
    chatGroupStatus: number;
    chatGroupCreated: string;
    chatGroupMembers: string;
}

/**
 * Server chat room
 */
export interface ServerChatRoom {
    roomId: number;
    roomOwnerId: number;
    roomReceiverId: string;
    roomChatGroupId: number;
    roomIds: string;
    roomStatus: number;
    roomCreated: string;
    roomType: string;
    roomOwner: ServerUser;
    roomReceiver: ServerUser;
    roomChatGroup: ServerChatGroup;
    minMessageStatus: number;
    messagesCount: number;
    lastMessageTime: string;
    lastSenderId: number;
}

export interface ServerChatMessage {
    messageId: number;
    messageRoomId: number;
    messageSenderId: number;
    messageStatus: number;
    messageText: string;
    messageTime: string;
    messageSender: ServerUser;
}

/**
 * Server chat groups api class
 */
export default class ServerChats {

    /**
     * Returns the groups
     */
    public async getGroups(page = 0): Promise<ServerPaged<ServerChatGroup>> {
        return await Server.request("chats.getGroups", {page});
    }

    /**
     * Returns the rooms
     */
    public async getRooms(page = 0): Promise<ServerPaged<ServerChatRoom>> {
        return await Server.request("chats.getRooms", {page});
    }

    /**
     * Returns the rooms
     */
    public async getGroupRooms(chatGroupId: number, page = 0): Promise<ServerPaged<ServerChatRoom>> {
        return await Server.request("chats.getGroupRooms", {chatGroupId, page});
    }

    /**
     * Returns the messages
     */
    public async getMessages(roomId: number, page = 0): Promise<ServerPaged<ServerChatMessage>> {
        return await Server.request("chats.getMessages", {roomId, page});
    }

    /**
     * Returns the messages
     */
    public async getMessagesAll(args: NameList<any>): Promise<ServerPaged<ServerChatMessage>> {
        return await Server.request("chats.getMessages", args);
    }

    /**
     * Returns the groups
     */
    public async getGroupById(chatGroupId: number): Promise<{ chatGroup: Nullable<ServerChatGroup> }> {
        return await Server.request("chats.getGroupById", {chatGroupId});
    }

    /**
     * Returns the groups
     */
    public async sendMessage(roomId: number, messageText: string): Promise<{ result: boolean }> {
        return await Server.request("chats.sendMessage", {roomId, messageText});
    }

    /**
     * Returns the groups
     */
    public async setRoomStatus(roomId: number, state: number): Promise<ServerResponse> {
        return await Server.request("chats.setRoomStatus", {roomId, state});
    }

    /**
     * Reads the messages
     */
    public async read(ids: string | string[]): Promise<ServerResponse> {
        if (ids instanceof Array) ids = ids.join(",");
        return await Server.request("chats.read", {ids});
    }
}