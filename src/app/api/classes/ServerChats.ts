/**
 * Chat group interface
 */
import Server, {ServerPaged} from "@/app/api/Server";
import {Nullable} from "@/ling/types/Common";
import {ServerUser} from "@/app/api/classes/ServerUsers";

export interface ServerChatGroup {
    chatGroupId: number;
    chatGroupTitle: string;
    chatGroupStatus: number;
    chatGroupCreated: string;
}

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
     * Returns the groups
     */
    public async getGroupById(chatGroupId: number): Promise<{ chatGroup: Nullable<ServerChatGroup> }> {
        return await Server.request("chats.getGroupById", {chatGroupId});
    }
}