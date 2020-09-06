import {APIUserResults} from "@/core/app/api/APIUsers";
import {APIChatMessageResult} from "@/core/app/api/APIChat";
import API from "@/core/app/api/API";

export default class ChatUtils {

    /**
     * Reads all unread messages
     *
     * @param me
     * @param messages
     */
    public static async readAllUnreadMessages(me: APIUserResults, messages: APIChatMessageResult[]) {
        for (const message of messages) {
            if (message.senderId !== me.user_id) {
                await API.chat.readMessage(message.messageId);
            }
        }
    }

}