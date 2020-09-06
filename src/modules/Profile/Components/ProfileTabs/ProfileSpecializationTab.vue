<template>
    <div>
        <b-card>
            <template #header>Специальность</template>
            <row-with-editable-field
                    title="Специальность:"
            >
                <editable-select-input
                        :can-edit="editable"
                        :value="specializationId"
                        :callback="(v, n) => callback('facultyId', v, n)"
                        placeholder="Нужно заполнить!"
                        :options="$app.specializationsClear"
                />
            </row-with-editable-field>
            <row-with-editable-field
                    title="Основа обучения:"
            >
                <editable-select-input
                        :can-edit="editable"
                        :value="baseId"
                        :callback="(v, n) => callback('studyBase', v, n)"
                        placeholder="Нужно заполнить!"
                        :options="$app.basesClear"
                />
            </row-with-editable-field>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {EditableInputHandlerNext} from "@/modules/InputControllers/Common/EditableInput";
    import RowWithEditableField from "@/modules/Profile/Components/ProfileTabs/common/RowWithEditableField.vue";
    import EditableTextInput from "@/modules/InputControllers/Components/EditableTextInput.vue";
    import EditableSelectInput from "@/modules/InputControllers/Components/EditableSelectInput.vue";

    /**
     *  The ProfileSpecializationTab component.
     *  @author diego
     *  @created 30.08.2020 15:38
     */
    @Component({
        components: {EditableSelectInput, EditableTextInput, RowWithEditableField}
    })
    export default class ProfileSpecializationTab extends Vue {
        @Prop({default: false}) editable!: boolean;
        @Prop({default: false}) editablePrivate!: boolean;
        @Prop({default: () => true}) callback!: (name: string, value: unknown, result: EditableInputHandlerNext) => void;

        @Prop({required: true}) specializationId!: string;
        @Prop({required: true}) baseId!: string;

    }
</script>

<style scoped>

</style>