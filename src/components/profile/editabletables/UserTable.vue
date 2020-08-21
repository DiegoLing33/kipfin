<template>
    <info-table-view
            :fields="fields"
            :source="user"
            :callback="callback"
    ></info-table-view>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import {FieldFormatter} from "@/components/forms/fields/Field";
    import InfoTableView from "@/components/profile/editabletables/InfoTableView.vue";

    @Component({
        components: {InfoTableView}
    })
    export default class UserTable extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;

        private fields = {
            userId: ["Идентификатор (ID)", FieldFormatter.trim, true, "Идентификатор необходим при обращении в приемную комиссию или службу поддержки. Приготовьтесь к тому, что во время разговора Вас могут его спросить!"],
            mail: ["Mail", FieldFormatter.trim, true],
            name: ["Имя", FieldFormatter.empty, !this.user.flags.isCanEdit()],
            lastname: ["Фамилия", FieldFormatter.empty, !this.user.flags.isCanEdit()],
            surname: ["Отчество", FieldFormatter.empty, !this.user.flags.isCanEdit()],
            phone: ["Телефон", FieldFormatter.formatPhone, !this.user.flags.isCanEdit()],
        };
    }
</script>

<style scoped>
    td{
        border: none !important;
    }
</style>