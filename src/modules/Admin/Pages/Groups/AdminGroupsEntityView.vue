<template>
    <user-content title="Группа ...." v-if="isLoading">
        <content-placeholders>
            <content-placeholders-heading :img="false"/>
        </content-placeholders>
    </user-content>
    <user-content :no-body="true" v-else :title="'Группа ' + groupTitle">
        <template #header>
            <row-with-editable-field title="ID:">
                {{ groupId }}
            </row-with-editable-field>
            <row-with-editable-field title="Название:">
                <editable-text-input
                    :callback="(v, n) => onGroupChange('studentGroupTitle', v, n)"
                    :can-edit="$store.getters.user.group.hasAccess(17)"
                    :value="groupTitle"/>
            </row-with-editable-field>
            <row-with-editable-field title="Руководитель:">
                <editable-text-input
                    :callback="(v, n) => onGroupChange('studentGroupTeacherName', v, n)"
                    :can-edit="$store.getters.user.group.hasAccess(17)"
                    :value="groupTeacherName"/>
            </row-with-editable-field>
            <row-with-editable-field title="Студентов">
                {{ students.length }}
            </row-with-editable-field>
        </template>
        <div class="found-results">
            <div
                v-for="(user) of studentsList"
                :key="(`user_${user.userId}`)"
                class="found-item"
                @click="$router.push('/user/' + user.userId)"
            >
                <div class="f-cell">
                    <user-avatar-box :user="user" :sub-text="getSubText(user)"/>
                </div>
            </div>
        </div>
    </user-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserContent from "@/modules/Interface/Components/UserContent.vue";
import RowWithEditableField from "@/modules/Profile/Components/ProfileTabs/common/RowWithEditableField.vue";
import {APIUserResults} from "@/core/app/api/APIUsers";
import API from "@/core/app/api/API";
import UserAvatarBox from "@/modules/Users/Components/UserBox/UserAvatarBox.vue";
import EditableTextInput from "@/modules/InputControllers/Components/EditableTextInput.vue";
import KIPD from "@/core/app/KIPD";
import UserUtils from "@/modules/Users/Utils/UserUtils";

@Component({
    components: {EditableTextInput, UserAvatarBox, RowWithEditableField, UserContent}
})
export default class AdminGroupsEntityView extends Vue {
    protected groupId = "0";
    protected groupTitle = "";
    protected groupTeacherName = "";
    protected students: APIUserResults[] = [];
    protected isLoading = true;

    async mounted() {
        const id = this.$route.params["id"];
        const result = await API.users.studentGroupById(id);
        this.students = result.students;
        this.groupTitle = result.studentGroupTitle;
        this.groupTeacherName = result.studentGroupTeacherName;
        this.groupId = result.studentGroupId.toString();
        this.isLoading = false;
    }

    get studentsList(){
        return this.students.sort((a, b) => {
            return UserUtils.getFullName(a).localeCompare(UserUtils.getFullName(b));
        });
    }

    getSubText(user: APIUserResults) {
        return `${KIPD.specializationsClear[user.facultyId]} (${KIPD.basesClear[user.studyBase]})`
    }

    async onGroupChange(field: string, value: any, next: any) {
        try {
            await API.request("studentGroups.set", {field, value, id: this.groupId});
            this.$toast.success("Изменения сохранены!");
            next(true);
        } catch (e) {
            this.$toast.error(e);
            next(false);
        }
    }
}
</script>

<style scoped>

</style>