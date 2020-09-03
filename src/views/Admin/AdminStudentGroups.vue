<template>
    <user-content title="Группы студентов" :no-body="true">
        <content-placeholders v-if="isLoading">
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
        </content-placeholders>
        <b-container v-else>
            <b-row class="rw align-items-center">
                <b-col class="p-3 text-center">
                    <b>ID</b>
                </b-col>
                <b-col class="p-3">
                    <b>Группа</b>
                </b-col>
                <b-col class="p-3">
                    <b>Руководитель</b>
                </b-col>
                <b-col class="p-3">

                </b-col>
            </b-row>
            <b-row class="rw align-items-center" v-for="group of groupsList" :key="group.studentGroupId">
                <b-col class="p-3 text-center">
                    {{ group.studentGroupId }}
                </b-col>
                <b-col class="p-3">
                    {{ group.studentGroupTitle }}
                </b-col>
                <b-col class="p-3">
                    {{ group.studentGroupTeacherName }}
                </b-col>
                <b-col class="p-3">
                    <b-button block @click="$router.push('/admin/groups/i/' + group.studentGroupId)">
                        <b-icon-eye/>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </user-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserContent from "@/components/theme/UserContent.vue";
import API from "@/app/api/API";

@Component({
    components: {UserContent}
})
export default class AdminStudentGroups extends Vue {
    protected isLoading = true;
    protected groupsList: any[] = [];

    mounted() {
        this.update();
    }

    async update() {
        const resp = await API.users.studentGroupsList();
        const {list} = resp;
        this.groupsList = list;
        this.isLoading = false;
    }
}
</script>

<style scoped>
.rw:not(:last-child) {
    border-bottom: 1px solid #efefef
}
</style>