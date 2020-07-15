<template>
    <div class="view-ChatBox">
        <div class="mesgs">
            <div class="msg_history">

                <chat-box-message
                        v-for="m of messages"
                        :key="m.messageId"
                        :text="m.messageText"
                        :author-name="getAuthorName(m.messageSender)"
                        :date="m.messageTime"
                        :incoming="true"
                        :user="m.messageSender"
                        :read="m.messageStatus === 2"
                ></chat-box-message>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ChatBoxMessage from "@/components/chat/ChatBoxMessage.vue";
    import {ServerUser} from "@/app/api/classes/ServerUsers";
    import {ServerChatMessage} from "@/app/api/classes/ServerChats";

    @Component({
        components: {ChatBoxMessage}
    })
    export default class ChatBox extends Vue {
        @Prop({default: []}) messages!: ServerChatMessage[];

        getAuthorName(author: ServerUser) {
            if (parseInt(this.$store.state.currentUser.group.groupId.toString()) === 1
            && parseInt(this.$store.state.currentUser.userId) !== author.userId)
                return author.group.groupTitle + "# " + author.userId;
            return this.$app.userUtils.getFullName(author as any);
        }
    }
</script>

<style>
    img {
        max-width: 100%;
    }

    .chat-author {
        font-size: 16px;
    }

    .chat_ib h5 {
        font-size: 15px;
        color: #464646;
        margin: 0 0 8px 0;
    }

    .chat_ib h5 span {
        font-size: 16px;
        float: right;
    }

    .chat_ib p {
        font-size: 17px;
        color: #989898;
        margin: auto
    }

    .incoming_msg_img {
        display: inline-block;
        width: 6%;
        padding-top: 10px;
    }

    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
    }

    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 1em;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }

    .time_date {
        color: #747474;
        display: block;
        font-size: 0.9em;
        margin: 8px 0 0;
    }

    .received_withd_msg {
        width: 100%;
    }

</style>