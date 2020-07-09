<template>
    <div class="incoming_msg mb-3">
        <div class="incoming_msg_img">
            <img :src="avatar"/>
        </div>
        <div class="received_msg">
            <div class="received_withd_msg">
                <b class="chat-author">
                    <router-link :to="('/user/' + user.userId)">{{authorName}}</router-link>
                </b>
                <p>
                    {{text}}
                </p>
                <span class="time_date">{{date}} <b-icon-check2 v-if="!read"/><b-icon-check2-all v-else /></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {APIUserShort} from "@/api/APIUsers";

    @Component
    export default class ChatBoxMessage extends Vue {
        @Prop({required: true}) authorName!: string;
        @Prop({required: true}) date!: string;
        @Prop({required: true}) text!: string;
        @Prop({required: true}) read!: boolean;
        @Prop({required: true}) avatar!: string;
        @Prop({required: true}) user!: APIUserShort;
    }
</script>

<style scoped>
</style>