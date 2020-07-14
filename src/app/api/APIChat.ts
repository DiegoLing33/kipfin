import API, {APIListResult, APIResult, NumericString} from "@/app/api/API";
import {APIUserShort} from "@/app/api/APIUsers";

export interface APIChatRoomResult {
    roomId: NumericString;
    roomOwnerId: NumericString;
    roomStatus: NumericString;
    roomIds: string;
    roomCreated: string;
    roomType: string;
    roomIdsArray: number[];
    owner: APIUserShort;
}

export interface APIChatMessageResult {
    messageId: NumericString;
    messageStatus: NumericString;
    messageText: string;
    messageTime: string;
    senderId: NumericString;
    sender: APIUserShort;
    room: APIChatRoomResult;
}

export default class APIChat {

    /**
     * Api method chat.getRooms
     * @param type
     * @param flag
     */
    async getRooms(type?: string, flag = '-'): Promise<APIListResult<APIChatRoomResult>> {
        return await API.request<APIListResult<APIChatRoomResult>>("chat.getRooms", {type, flag});
    }

    /**
     * Api method chat.getRoomsByUserId
     * @param userId
     * @param type
     */
    async getRoomsByUserId(userId: NumericString | number, type = "generic"): Promise<APIListResult<APIChatRoomResult>> {
        return await API.request<APIListResult<APIChatRoomResult>>("chat.getRoomsByUserId",
            {userId, type});
    }

    /**
     * Returns the messages (chat.getMessages)
     * @param roomId
     */
    async getMessages(roomId: NumericString | number): Promise<APIListResult<APIChatMessageResult>> {
        return await API.request("chat.getMessages", {roomId});
    }

    /**
     * Returns the room (chat.room)
     * @param roomId
     */
    async room(roomId: NumericString | number): Promise<APIChatRoomResult> {
        return await API.request("chat.room", {roomId});
    }

    /**
     * Sends message to the room
     * @param roomId
     * @param messageText
     */
    async send(roomId: NumericString, messageText: string): Promise<APIResult> {
        return await API.request("chat.send", {
            roomId, messageText
        })
    }

    /**
     * Reads the message (POST chat.read)
     * @param messageId
     */
    async readMessage(messageId: NumericString): Promise<APIResult> {
        return await API.request("chat.read", {messageId});
    }

}
