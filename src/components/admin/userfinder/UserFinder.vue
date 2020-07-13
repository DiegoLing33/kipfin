<template>
    <b-card title="Поиск пользователя">
        <b-select :options="userGroups"
                  v-model="selectedUserGroup"
                  class="mb-2"
        />
        <b-row>
            <b-col class="mb-2">
                <b-input debounce="500" v-model="inputLastName" placeholder="Фамилия"></b-input>
            </b-col>
            <b-col class="mb-2">
                <b-input debounce="500" v-model="inputName" placeholder="Имя"></b-input>
            </b-col>
            <b-col class="mb-2">
                <b-input debounce="500" v-model="inputSurName" placeholder="Отчество"></b-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="mb-2">
                <b-input debounce="500" v-model="inputMail" placeholder="Mail"></b-input>
            </b-col>
        </b-row>
        <slot></slot>
    </b-card>
</template>

<script lang="ts">
    import {Component, Mixins, Prop, Watch} from "vue-property-decorator";
    import SelectField from "@/components/fields/SelectField.vue";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {ServerUserGroupExtended} from "@/api/classes/ServerUsers";
    import Server from "@/api/Server";
    import {NameList, nameList, nullable, Nullable} from "@/ling/types/Common";

    /**
     *  The UserFinder component.
     *  @author diego
     *  @created 13.07.2020 20:32
     */
    @Component({
        components: {SelectField}
    })
    export default class UserFinder extends Mixins(StoreLoadedComponent) {
        @Prop({required: true}) callback!: (userGroup: Nullable<number>, args: NameList<unknown>) => void;

        protected selectedUserGroup = nullable<number>();
        protected inputLastName = "";
        protected inputName = "";
        protected inputSurName = "";
        protected inputMail = "";
        protected userGroupsRaw = Array<ServerUserGroupExtended>();

        protected get userGroups() {
            return [{text: '--- Роль пользователя ---', value: null}, ...this.userGroupsRaw.map(value => {
                return {value: value.groupId, text: value.groupTitle};
            })];
        }

        protected async storeLoaded() {
            await this.update();
        }

        public async update() {
            this.$transaction(this, async () => {
                this.userGroupsRaw = (await Server.loadAllPages(Server.users.getGroups)).items;
            });
        }

        @Watch("selectedUserGroup")
        @Watch("inputLastName")
        @Watch("inputName")
        @Watch("inputSurName")
        @Watch("inputMail")
        public onSearchChanged() {
            const args = nameList();
            args["~lastname"] = this.inputLastName;
            args["~name"] = this.inputName;
            args["~surname"] = this.inputSurName;
            args["~mail"] = this.inputMail;
            this.callback(this.selectedUserGroup, args);
        }
    }
</script>

<style scoped>

</style>