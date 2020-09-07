<template>
    <content-body :should-be-authorized="true">
        <user-content
                title="Законные представители"
                description="Вы можете добавить законных представителей. Когда в приемной комиссии возникают вопросы связанные с документами, в первую очередь мы будем звонить законному представителю"
                :overlay="busy">
            <b-table
                    bordered
                    show-empty="show-empty"
                    empty-text="Законные представители не добавлены"
                    :fields="tableFields"
                    :items="tableItems"
            >
                <template v-slot:cell(type)="row">
                    {{$app.parentName[row.item.type]}}
                </template>
                <template v-slot:cell(mail)="row">
                    <div style="word-break: break-all">
                        {{row.item.mail}}
                    </div>
                </template>
                <template v-slot:cell(utils)="row">
                    <b-button size="sm" variant="danger" @click="remove(row.item.parent_id)">Удалить</b-button>
                </template>
            </b-table>
            <profile-parents-add-view @update="update()"/>
        </user-content>
    </content-body>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/core/app/api/API";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import TextSmall from "@/modules/Interface/Components/text/TextSmall.vue";
    import SelectBox from "@/modules/ling/components/SelectBox/SelectBox.vue";
    import RowWithEditableField from "@/modules/Profile/Components/ProfileTabs/common/RowWithEditableField.vue";
    import BoxHint from "@/modules/Interface/Components/BoxHint.vue";
    import ProfileParentsAddView from "@/modules/Profile/Components/Parents/ProfileParentsAddView.vue";
    import ContentBody from "@/modules/Security/Components/ContentBody.vue";

    @Component({
        components: {
            ContentBody,
            ProfileParentsAddView,
            BoxHint, RowWithEditableField, SelectBox, TextSmall, UserContent
        }
    })
    export default class ProfileParents extends Vue {
        private tableFields = [
            {label: "ФИО", key: "name"},
            {label: "Представитель", key: "type"},
            {label: "Телефон", key: "phone"},
            {label: "Mail", key: "mail"},
            {label: "Место работы", key: "work"},
            {label: "", key: "utils"},
        ];
        private tableItems = [];

        async mounted() {
            await this.update();
        }

        private async update() {
            this.tableItems = (await API.request("parents.get")).list;
        }

        private async remove(parentId: any) {
            try {
                await API.request("parents.remove", {parentId});
                await this.update();
            } catch (e) {
                this.$bvToast.toast(e, {title: "Ошибка"});
            }
        }
    }
</script>

<style scoped>
</style>
