<template>
    <div class="view-UserAdminSettings">
        <fi-select v-if="$store.getters.hasAccess(13)" :callback="onRoleChanged" :default-value="user.group.groupId" :map="userGroups"></fi-select>
        <admission-comment-form @update="$router.push('#board' + new Date().getTime())" :user="user"  />
        <admission-actions-user-view :user="user" v-if="$store.getters.isAdmin"/>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import KFUser from "@/modules/Users/Common/KFUser";
    import Server from "@/core/app/api/Server";
    import StoreLoadedComponent from "@/core/Components/mixins/StoreLoadedComponent.vue";
    import {ServerUserGroupExtended} from "@/core/app/api/classes/ServerUsers";
    import FiSelect from "@/modules/ling/components/ficomponents/FiSelect.vue";
    import {indexList} from "@/core/Common/Common";
    import AdmissionActionsUserView from "@/modules/Admin/Components/admintools/AdmissionActionsUserView.vue";
    import AdmissionCommentForm from "@/modules/Profile/Components/admin/AdmissionCommentForm.vue";


    /**
     *  The UserAdminSettings component.
     *  @author diego
     *  @created 13.07.2020 21:50
     */
    @Component({
        components: {AdmissionCommentForm, FiSelect, AdmissionActionsUserView}
    })
    export default class UserAdminSettings extends Mixins(StoreLoadedComponent) {
        @Prop({required: true}) user!: KFUser;
        private userGroupsRaw = Array<ServerUserGroupExtended>();

        protected get userGroups() {
            const roles = indexList();
            this.userGroupsRaw.forEach(value => {
                roles[value.groupId] = value.groupTitle;
            });
            return roles;
        }

        protected async storeLoaded() {
            await this.update();
        }

        protected onRoleChanged(roleId: number) {
            return new Promise(resolve => {
                this.$transaction(async () => {
                    await Server.users.setGroup(roleId, this.user.userId);
                    resolve(true);
                    window.location.reload();
                });
            });
        }

        public async update() {
            await this.$transaction(async () => {
                this.userGroupsRaw = (await Server.loadAllPages(Server.users.getGroups)).items;
            });
        }
    }
</script>

<style scoped>

</style>