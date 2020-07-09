<template>
    <b-card class="mb-3" no-body>
        <template slot="header">
            ID: {{psp['PSP_ID']}} ({{psp['PSP_HASH']}} - {{psp['PSP_TYPE']}})
        </template>
        <b-card-body>
            <b-card-title>Паспорт</b-card-title>
            {{psp['PSP_G'].split('|').pop()}}
        </b-card-body>
        <b-list-group flush>
            <b-list-group-item>Серия и номер паспорта: <b>{{psp['PSP_A']}}</b></b-list-group-item>
            <b-list-group-item>Выдан: <b>{{psp['PSP_B']}}</b></b-list-group-item>
            <b-list-group-item>Подразделение: <b>{{psp['PSP_C']}}</b></b-list-group-item>
            <b-list-group-item>Дата выдачи: <b>{{psp['PSP_E']}}</b></b-list-group-item>
            <b-list-group-item>Место рождения: <b>{{psp['PSP_D']}}</b></b-list-group-item>
            <b-list-group-item>Дата рождения: <b>{{psp['PSP_H']}}</b></b-list-group-item>
            <b-list-group-item>Регистрация: <b>{{psp['PSP_F']}}</b></b-list-group-item>
            <b-list-group-item>Место фактического проживания: <b>{{psp['PSP_ADDR']}}</b></b-list-group-item>
        </b-list-group>
        <template v-slot:footer>
            <b-button variant="danger" @click="(()=>$emit('remove', psp['PSP_ID']))">Удалить</b-button>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class PassportView extends Vue {
        @Prop({required: true}) psp!: unknown;
    }
</script>

<style scoped>
</style>