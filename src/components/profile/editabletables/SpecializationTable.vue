<template>
    <info-table-view
            :fields="fields"
            :source="user.raw"
            :callback="callback"
    ></info-table-view>
</template>
w
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/client/KFUser";
    import {FieldFormatter} from "@/components/fields/Field";
    import InfoTableView from "@/components/profile/editabletables/InfoTableView.vue";
    import KIPD from "@/app/KIPD";
    @Component({
        components: {InfoTableView}
    })
    export default class SpecializationTable extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;

        private fields = {
            facultyId: ["|Специальность", FieldFormatter.empty, !this.user.flags.isCanFacultyEdit(),
                "Вы можете выбрать только одну специальность", KIPD.specializations],
            studyBase: ["|Основа обучения", FieldFormatter.empty, !this.user.flags.isCanFacultyEdit(),
                "Выберите основу обучения. Выбор \"Бюджет/Договор\" говорит о том, что Вы будете учавствовать в конкурсе аттестатов, " +
                "а в случае проигрыша Вам будет подготовлено место на договор", KIPD.bases],
        };
    }
</script>

<style scoped>
</style>