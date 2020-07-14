<template>
    <div class="view-UserAdminSettings">
        <fi-select :callback="onRoleChanged" :default-value="user.group.groupId" :map="userGroups"></fi-select>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import Server from "@/app/api/Server";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {ServerUserGroupExtended} from "@/app/api/classes/ServerUsers";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    import {indexList} from "@/ling/types/Common";

    /**
     *  The UserAdminSettings component.
     *  @author diego
     *  @created 13.07.2020 21:50
     */
    @Component({
        components: {FiSelect}
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
                this.$transaction(this, async () => {
                    await Server.users.setGroup(roleId, this.user.userId);
                    resolve(true);
                    window.location.reload();
                });
            });
        }

        public async update() {
            this.$transaction(this, async () => {
                this.userGroupsRaw = (await Server.loadAllPages(Server.users.getGroups)).items;
            });
        }
    }
</script>

<style scoped>

</style>