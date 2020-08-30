<template>
    <div>
        <b-card class="mb-3">
            <template #header>
                Аттестат об основном общем образовании
            </template>
            <row-with-editable-field
                    title="Название школы:"
                    hint="Введите полное название школы без сокращений! Например: Государственная общеобразовательная школа №12"
                    :show-hint="showHint"
            >
                <editable-text-input
                        :can-edit="editable"
                        :value="schoolName"
                        :reformer="[$lp.reformers.trim]"
                        :callback="(v, n) => callback('schoolName', v, n)"
                        placeholder="Нужно заполнить!"
                />
            </row-with-editable-field>
            <row-with-editable-field
                    :show-hint="showHint"
                    hint="Введите адрес школы полность (включая регион). Например: Россия, Москва, ул. Барышиха, д. 33, кв. 1"
                    title="Адрес школы:">
                <editable-text-input
                        :can-edit="editable"
                        :value="schoolAddress"
                        :reformer="[$lp.reformers.trim]"
                        :callback="(v, n) => callback('schoolAddress', v, n)"
                        placeholder="Нужно заполнить!"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Номер аттестата:">
                <editable-text-input
                        :can-edit="editable"
                        :value="schoolDegreeCode"
                        :reformer="[$lp.reformers.trim]"
                        :callback="(v, n) => callback('schoolDegreeCode', v, n)"
                        placeholder="Нужно заполнить!"
                        :pre-test="[$lp.preTests.shouldNotAlphabetic]"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Дата выдачи:">
                <editable-date-input
                        :value="schoolDate"
                        placeholder="Не определено"
                        :post-reformer="$lp.io.date.fromUTCStringToStd"
                        :can-edit="editablePrivate"
                        :callback="(v, n) => callback('schoolDate', v, n)"
                />
            </row-with-editable-field>
            <row-with-editable-field
                    :show-hint="showHint"
                    hint="Введите средний балл Вашего аттестата. Чтобы посчитать его, сложите все
                    оценки и поделите их на количество, после чего округлите до двух знаков после
                    запятой, по правилам математики. Например: (4 + 5 + 4 + 4 + 4) / 5 = 4.20"
                    title="Средний балл аттестата:">
                <editable-text-input
                        :can-edit="editable"
                        :value="schoolValue"
                        :reformer="[$lp.reformers.trim]"
                        :callback="(v, n) => callback('schoolValue', v, n)"
                        placeholder="Нужно заполнить!"
                        :pre-test="[$lp.preTests.shouldNotAlphabetic]"
                />
            </row-with-editable-field>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import SchoolTable from "@/components/profile/editabletables/SchoolTable.vue";
    import RowWithEditableField from "@/components/profile/ProfileTabs/common/RowWithEditableField.vue";
    import {EditableInputHandlerNext} from "@/ling/components/input/common/EditableInput";
    import EditableTextInput from "@/ling/components/input/EditableTextInput.vue";
    import EditableDateInput from "@/ling/components/input/EditableDateInput.vue";

    @Component({
        components: {EditableDateInput, EditableTextInput, RowWithEditableField, SchoolTable}
    })
    export default class ProfileEducationSection extends Vue {
        @Prop({default: true}) showHint!: boolean;
        @Prop({default: false}) editable!: boolean;
        @Prop({default: false}) editablePrivate!: boolean;
        @Prop({default: () => true}) callback!: (name: string, value: unknown, result: EditableInputHandlerNext) => void;

        // ProfileEducation
        @Prop({required: true}) schoolName!: string;
        @Prop({required: true}) schoolAddress!: string;
        @Prop({required: true}) schoolDegreeCode!: string;
        @Prop({required: true}) schoolDate!: string;
        @Prop({required: true}) schoolValue!: string;
    }
</script>

<style scoped>

</style>