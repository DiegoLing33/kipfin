<template>
    <user-content
            title="Чаты с приемной комиссией"
            description="На этой странице отображаются все чаты в приемной комиссии"
            :overlay="busy"
    >
        <b-jumbotron>
            <p>Методы фиьтрации</p>
            <b-checkbox v-model="hideDone" unchecked-value="no" value="yes" switch>Скрывать отвеченные диалоги</b-checkbox>
        </b-jumbotron>
        <b-table bordered :items="rooms" :fields="fields">
            <template v-slot:cell(owner)="row">
                <router-link :to="('/chat/' + row.item.roomId)">
                    {{row.item.owner.lastname}} {{row.item.owner.name}} {{row.item.owner.surname}}
                </router-link>
            </template>
            <template v-slot:cell(state)="row">
                <b-badge v-if="row.item.unread > 0" variant="danger">
                    Есть непрочитанные сообщения ({{row.item.unread}})
                </b-badge>
                <b-badge variant="success" v-else>
                    Все сообщения прочитаны
                </b-badge>
                <b-badge class="ml-2" variant="warning" v-if="row.item.lastByUser">
                    Нет ответа секретаря
                </b-badge>
            </template>
        </b-table>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import API from "@/core/app/api/API";
    import {APIChatRoomResult} from "@/core/app/api/APIChat";
    import StoreLoader from "@/core/app/client/StoreLoader";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";

    @Component({
        components: {UserContent}
    })
    export default class AdminChats extends Vue {

        private rooms = Array<APIChatRoomResult>();
        private hideDone = "yes";
        private busy = false;

        private fields = [
            {label: "ID", key: "roomId"},
            {label: "Абитуриент", key: "owner"},
            {label: "Состояние", key: "state"}
        ];

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });

        }

        @Watch("hideDone")
        async update() {
            this.rooms = [];
            this.busy = true;
            for (const room of (await API.chat.getRooms("admission", "all")).list) {
                const messages = await API.chat.getMessages(room.roomId);
                (room as any)['unread'] = (messages.list.filter(m => {
                    return (m.senderId === room.roomOwnerId) && m.messageStatus === '1';
                }).length);
                (room as any)['lastByUser'] = messages.list[messages.list.length - 1].senderId === room.roomOwnerId;
                if(!(room as any)['lastByUser'] && this.hideDone === "yes") continue;
                this.rooms.push(room);
            }
            this.busy = false;
        }


    }
</script>

<style scoped>
</style>
