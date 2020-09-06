<template>
    <user-content
            min-access="7"
            :no-body="true" v-if="$store.getters.isAdmin">
        <template v-slot:header>
            <user-finder :callback="onSearchChanged">
                <div class="mt-3 text-muted">
                    Найдено результатов: {{count}}
                </div>
            </user-finder>
        </template>
        <div v-if="isLoading" style="padding: 15px">
            <content-placeholders >
                <content-placeholders-heading :img="true" />
                <content-placeholders-heading :img="true" />
                <content-placeholders-heading :img="true" />
                <content-placeholders-heading :img="true" />
            </content-placeholders>
        </div>
        <div v-else class="found-results">
            <div
                    v-for="(user) of items"
                    :key="(`user_${user.userId}`)"
                    class="found-item"
                    @click="$router.push('/user/' + user.userId)"
            >
                <div class="f-cell">
                    <user-avatar-box :user="user"/>
                </div>
            </div>
        </div>
        <b-button
                @click="searchMore"
                v-if="items.length > 0 && count - items.length > 0" squared variant="primary" block>
            Загрузить еще ({{count - items.length}})
        </b-button>
    </user-content>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import UserFinder from "@/modules/Admin/Components/userfinder/UserFinder.vue";
    import {NameList, nameList, Nullable} from "@/core/Common/Common";
    import {ServerUsersRoot} from "@/core/app/api/classes/ServerUsers";
    import Server from "@/core/app/api/Server";
    import UserAvatarBox from "@/modules/Users/Components/UserBox/UserAvatarBox.vue";
    import StoreLoadedComponent from "@/core/Components/mixins/StoreLoadedComponent.vue";

    /**
     *  The AdminUsersList component.
     *  @author diego
     *  @created 13.07.2020 20:24
     */
    @Component({
        components: {UserAvatarBox, UserFinder, UserContent}
    })
    export default class AdminUsersList extends Mixins(StoreLoadedComponent) {
        protected pageNumber = 0;
        protected count = 0;
        protected lastArgs = nameList();
        protected items = Array<ServerUsersRoot>();
        private isLoading = true;

        protected storeLoaded() {
            this.search({}, 0);
        }

        protected onSearchChanged(userGroup: Nullable<number>, etc: NameList<unknown>) {
            const args = nameList<unknown>(etc);
            if (userGroup) args["-groupId"] = userGroup;
            this.pageNumber = 0;
            this.lastArgs = args;
            this.search(args, this.pageNumber);
        }

        /**
         * Does search
         * @param args
         * @param page
         */
        protected async search(args: NameList<unknown>, page: number) {
            const results = await Server.users.getList(page, args);
            this.count = results.count;
            if (page === 0) this.items = [];
            this.items.push(...results.items as ServerUsersRoot[]);
            this.isLoading = false;
        }

        /**
         * Loads more result
         */
        protected async searchMore() {
            this.pageNumber++;
            await this.search(this.lastArgs, this.pageNumber);
        }
    }
</script>

<style scoped lang="scss">
    .users-results {
        display: table;
        width: 100%;

        .user-item {
            display: table-row;
            vertical-align: middle;
            cursor: pointer;
            transition: all 0.4s;

            .cell {
                display: table-cell;
                vertical-align: middle;
                border-bottom: 1px solid #dbdbdb;
                margin-bottom: 5px;
                padding: 5px 10px;
            }

            &:hover {
                background-color: #ececec;
            }

            &:active {
                background-color: #d6d6d6;
            }
        }
    }
</style>