<template>
    <user-content :no-body="true" title="Роли пользователей"
                  description="Список доступных ролей пользователей">
        <div class="found-results">
            <div
                    v-for="(role) of userGroupsRaw"
                    :key="(`role_${role.groupId}`)"
                    class="found-item"
            >
                <div class="cell p-3">
                    {{role.groupId}}
                </div>
                <div class="cell">
                    {{role.groupTitle}}
                </div>
                <div class="cell">
                    <div
                            v-for="r of (role.groupAccess.split('|'))"
                            :key="`(r_${r})`"
                    >
                        <b-badge
                                pill
                                :variant="getVariant(r)"
                        >{{getAccessIndexName(r)}} [{{r}}]
                        </b-badge>
                    </div>
                </div>
            </div>
        </div>
    </user-content>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import UserContent from "@/components/theme/UserContent.vue";
    import {ServerUserGroupExtended} from "@/api/classes/ServerUsers";
    import Server from "@/api/Server";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";

    /**
     *  The AdminUsersGroupsList component.
     *  @author diego
     *  @created 13.07.2020 22:00
     */
    @Component({
        components: {UserContent}
    })
    export default class AdminUsersGroupsList extends Mixins(StoreLoadedComponent) {
        protected userGroupsRaw = Array<ServerUserGroupExtended>();

        protected getVariant(index: string) {
            const name = this.getAccessIndexName(index);
            if (name.startsWith("$")) return "danger";
            if (name.startsWith("[П]")) return "info";
            if (name.startsWith("[У]")) return "success";
            if (name.startsWith("[!]")) return "warning";
            return "secondary";
        }

        protected getAccessIndexName(index: string) {
            if (index === '1') return 'Использование портала';
            if (index === '7') return '[!] Администрирование портала';

            if (index === '11') return '[П] Данные пользователя';
            if (index === '12') return '[У] Данные пользователя';

            if (index === '13') return '[У] Роли пользователя';

            if (index === '100') return 'Управление пользователями';
            if (index === '10') return 'Управление абитуриентами';
            if (index === '900')
                return '$SUPER_USER_ROOT';
            return index;
        }

        protected async storeLoaded() {
            await this.update();
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