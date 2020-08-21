<template>
    <info-table-view
            :fields="fields"
            :source="user.getRaw().school"
            :callback="callback"
    ></info-table-view>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import InfoTableView from "@/components/profile/editabletables/InfoTableView.vue";
    import {FieldFormatter} from "@/components/forms/fields/Field";

    @Component({
        components: {InfoTableView}
    })
    export default class SchoolTable extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => boolean;
        private fields = {
            schoolName: ["Название школы", FieldFormatter.empty, !this.user.flags.isCanSchoolEdit(),
                "Введите полное название школы без сокращений! Например: Государственная общеобразовательная школа №12"],
            schoolAddress: ["Адрес школы", FieldFormatter.empty, !this.user.flags.isCanSchoolEdit(),
            "Введите адрес школы полность (включая регион). Например: Россия, Москва, ул. Барышиха, д. 33, кв. 1"],
            schoolDegreeCode: ["Номер аттестата", FieldFormatter.empty, !this.user.flags.isCanSchoolEdit(),
                "Введите номер аттестата"],
            schoolDate: ["Дата выдачи аттестата", FieldFormatter.empty, !this.user.flags.isCanSchoolEdit(),
                "Введите дату выдачи аттестата", new Date()],
            schoolValue: ["Средний балл", FieldFormatter.empty, !this.user.flags.isCanSchoolEdit(),
            "Введите средний балл Вашего аттестата. Чтобы посчитать его, сложите все оценки и поделите их на количество, " +
            "после чего округлите до двух знаков после запятой, по правилам математики. Например: (4 + 5 + 4 + 4 + 4) / 5 = 4.20"],
        };
    }
</script>

<style scoped>
</style>