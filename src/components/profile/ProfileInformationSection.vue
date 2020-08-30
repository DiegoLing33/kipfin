<template>
    <div>
        <b-card class="mb-3">
            <b-row class="border-ez-divider align-items-center">
                <b-col class="p-3" md="6" sm="12">
                    <b>Идентификатор (ID):</b>
                    <text-small-muted>
                        {{userGroup}}
                    </text-small-muted>
                </b-col>
                <b-col class="p-3" md="6" sm="12">
                    {{userId}}
                </b-col>
            </b-row>
            <row-with-editable-field title="Фамилия:">
                <editable-text-input
                        :can-edit="editable"
                        :value="lastname"
                        :reformer="[$lp.reformers.trim, $lp.reformers.capitalize]"
                        :callback="(v, n) => callback('lastname', v, n)"
                        placeholder="Нужно заполнить!"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Имя:">
                <editable-text-input
                        :can-edit="editable"
                        :value="name"
                        :reformer="[$lp.reformers.trim, $lp.reformers.capitalize]"
                        :callback="(v, n) => callback('name', v, n)"
                        placeholder="Нужно заполнить!"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Отчество:">
                <editable-text-input
                        :can-edit="editable"
                        :value="surname"
                        :reformer="[$lp.reformers.trim, $lp.reformers.capitalize]"
                        :pre-test="[$lp.preTests.shouldNotNumbers]"
                        placeholder="Нужно заполнить!"
                        :callback="(v, n) => callback('surname', v, n)"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Группа:">
                <editable-text-input
                        :value="studentGroup"
                        placeholder="Не определено"
                        :reformer="[$lp.reformers.uppercase, $lp.reformers.removeAllSpaces]"
                        :callback="(v, n) => callback('studentGroup', v, n)"
                        :can-edit="editablePrivate"
                />
            </row-with-editable-field>
        </b-card>
        <b-card>
            <template #header>
                <b-icon-shield-lock/>
                Информация защищена
            </template>
            <row-with-editable-field title="Дата рождения:">
                <editable-date-input
                        :value="birthday"
                        placeholder="Не определено"
                        :post-reformer="$lp.io.date.fromUTCStringToStd"
                        :can-edit="editablePrivate"
                        :callback="(v, n) => callback('birthday', v, n)"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Телефон:">
                <editable-text-input
                        :value="phone"
                        placeholder="Не определено"
                        :pre-test="[$lp.preTests.shouldNotAlphabetic]"
                        :callback="(v, n) => callback('phone', v, n)"
                        :can-edit="editablePrivate"
                        :post-reformer="[$lp.reformers.phone]"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Mail:">
                <editable-text-input
                        :value="mail"
                        placeholder="Не определено"
                        :pre-test="[$lp.preTests.shouldBeMail]"
                        :callback="(v, n) => callback('mail', v, n)"
                        :can-edit="editablePrivate"
                />
            </row-with-editable-field>
            <row-with-editable-field title="Номер студенческого:">
                <editable-text-input
                        :value="studentIdentifier"
                        placeholder="Не определено"
                        :pre-test="[$lp.preTests.shouldNotAlphabetic]"
                        :callback="(v, n) => callback('studentIdentifier', v, n)"
                        :can-edit="editablePrivate"
                />
            </row-with-editable-field>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import UserTable from "@/components/profile/editabletables/UserTable.vue";
    import TextSmallMuted from "@/components/theme/text/TextSmallMuted.vue";
    import EditableTextInput from "@/ling/components/input/EditableTextInput.vue";
    import {EditableInputHandlerNext} from "@/ling/components/input/common/EditableInput";
    import RowWithEditableField from "@/components/profile/ProfileTabs/common/RowWithEditableField.vue";
    import EditableDateInput from "@/ling/components/input/EditableDateInput.vue";

    @Component({
        components: {EditableDateInput, RowWithEditableField, EditableTextInput, TextSmallMuted, UserTable}
    })
    export default class ProfileInformationSection extends Vue {
        @Prop({default: false}) editable!: boolean;
        @Prop({default: false}) editablePrivate!: boolean;
        @Prop({default: () => true}) callback!: (name: string, value: unknown, result: EditableInputHandlerNext) => void;

        @Prop({required: true}) userId!: never;
        @Prop({required: true}) userGroup!: string;

        @Prop({required: true}) lastname!: string;
        @Prop({required: true}) name!: string;
        @Prop({required: true}) surname!: string;
        @Prop({required: true}) phone!: string;
        @Prop({required: true}) mail!: string;
        @Prop({required: true}) birthday!: string;

        @Prop({required: true}) studentIdentifier!: never;
        @Prop({required: true}) studentGroup!: never;
    }
</script>

<style scoped>

</style>