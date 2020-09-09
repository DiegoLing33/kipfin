<template>
    <user-content title="Группы студентов" :no-body="true">
        <content-placeholders v-if="isLoading">
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
            <content-placeholders-heading :img="false"/>
        </content-placeholders>
        <b-container v-else>
            <b-modal
                    @ok="onOk"
                    id="groupBuildModel" ok-title="Печать" cancel-title="Отмена" :visible="selectedGroup !== null">
                <template #modal-header>
                    Группа {{ selectedGroup.studentGroupTitle }}
                </template>
                <div class="p-3">
                    <b-form-checkbox-group
                            v-model="printColumns"
                            :options="options"
                            class="mb-3"
                            stacked
                            value-field="item"
                            text-field="name"
                    ></b-form-checkbox-group>
                </div>
            </b-modal>
            <b-row class="rw align-items-center">
                <b-col sm="1" class="p-3 text-center">
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
                <b-col sm="1" class="p-3 text-center">
                    {{ group.studentGroupId }}
                </b-col>
                <b-col class="p-3">
                    {{ group.studentGroupTitle }}
                </b-col>
                <b-col class="p-3">
                    {{ group.studentGroupTeacherName }}
                </b-col>
                <b-col class="p-3">
                    <b-button
                            v-b-tooltip.hover title="Просмотреть группу"
                            @click="$router.push('/admin/groups/i/' + group.studentGroupId)">
                        <b-icon-eye/>
                    </b-button>
                    <b-button
                            @click="setGroup(group)"
                            variant="primary"
                            class="ml-3"
                            v-b-tooltip.hover title="Построить макет на печать">
                        <b-icon-printer/>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import API from "@/core/app/api/API";
    import FileIO from "@/core/Utils/FileIO";
    @Component({
        components: {UserContent}
    })
    export default class AdminStudentGroups extends Vue {
        protected isLoading = true;
        protected groupsList: any[] = [];
        protected selectedGroup = null;
        protected printColumns = ["sid", "si", "spec", "base"];
        protected options = [
            {item: 'sid', name: 'ID студента'},
            {item: 'si', name: 'Номер студенческого'},
            {item: 'att', name: 'Номер аттестата'},
            {item: 'spec', name: 'Специальность'},
            {item: 'base', name: 'Основа обучения'},
            {item: 'state', name: 'Статус кабинета'},
            {item: 'mail', name: 'E-mail студента'},
            {item: 'phone', name: 'Телефон студента'},
            {item: 'parents', name: 'Представители'},
            {item: 'reg', name: 'Регистрация'},
            {item: 'addr_reg', name: 'Адрес регистрации'},
            {item: 'addr_live', name: 'Адрес проживания'},
        ];
        mounted() {
            this.update();
        }
        setGroup(group: never) {
            this.selectedGroup = group;
            this.$bvModal.show("groupBuildModel");
        }
        onOk() {
            const request = this.printColumns.map(value => `${value}=1`);
            FileIO.requestPrinting(
                `http://kipfin.ru/new/index.php?class=res&method=groupPR&p=1&groupId=` +
                `${(this.selectedGroup as any).studentGroupId}` +
                `&token=${this.$store.getters.accountAuthToken}&${request.join('&')}`,
                false
            );
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