<template>
    <EditableInputView
            :displayable-value="displayableValue"
            :is-able-to-edit="canEdit"
            :is-edit-state="isEditState"
            :is-empty="isEmpty"
            :is-handling="isHandling"
            :placeholder="placeholder"
            :reset="reset"
            :toggle-state="toggleState"
    >
        <template #edit>
            <b-datepicker
                    :disabled="disabled"
                    :state="!isError ? null : false"
                    :value="currentValue"
                    @input="onInput"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            />
        </template>
    </EditableInputView>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import EditableInputMixin from "@/modules/InputControllers/Components/EditableInputMixin.vue";
    import {Nullable} from "@/core/Common/Common";
    import TextSmallMuted from "@/modules/Interface/Components/text/TextSmallMuted.vue";
    import EditableInputView from "@/modules/InputControllers/Components/EditableInputView.vue";

    /**
     *  The EditableTextInput component.
     *  @author diego
     *  @created 29.08.2020 22:48
     */
    @Component({
        components: {EditableInputView, TextSmallMuted}
    })
    export default class EditableDateInput extends Mixins<{ value: Nullable<string> }>(EditableInputMixin) {
        protected currentValue: Nullable<string> = this.value;

        protected onInput(e: Nullable<string>) {
            this.currentValue = e;
        }
    }
</script>

<style scoped>

</style>