<template>
    <b-table
            bordered
            show-empty="show-empty"
            empty-text="Законные представители не добавлены"
            :fields="tableFields"
            :items="parents"
    >
        <template v-slot:cell(phone)="row">
            {{$lp.reformers.phone(row.item.phone)}}
        </template>
        <template v-slot:cell(type)="row">
            {{$app.parentName[row.item.type]}}
        </template>
        <template v-slot:cell(utils)="row">
            <b-button size="sm" variant="danger" @click="remove(row.item.parent_id)">Удалить</b-button>
        </template>
    </b-table>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class UserParents extends Vue {
        @Prop({default: []}) parents!: [];
        private tableFields = [
            {label: "ФИО", key: "name"},
            {label: "Тип", key: "type"},
            {label: "Телефон", key: "phone"},
            {label: "Mail", key: "mail"},
            {label: "Место работы", key: "work"},
            {label: "", key: "utils"},
        ];

    }
</script>

<style scoped>
</style>