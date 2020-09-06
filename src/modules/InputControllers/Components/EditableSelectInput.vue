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
            <select-box
                    :disabled="disabled"
                    :value="currentValue"
                    :default-value="currentValue"
                    :options="options"
                    @input="onInput"
            />
        </template>
    </EditableInputView>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import EditableInputMixin from "@/modules/InputControllers/Components/EditableInputMixin.vue";
    import {Nullable} from "@/core/Common/Common";
    import TextSmallMuted from "@/modules/Interface/Components/text/TextSmallMuted.vue";
    import EditableInputView from "@/modules/InputControllers/Components/EditableInputView.vue";
    import {Dictionary} from "vue-router/types/router";
    import SelectBox from "@/modules/ling/components/SelectBox/SelectBox.vue";

    /**
     *  The EditableTextInput component.
     *  @author diego
     *  @created 29.08.2020 22:48
     */
    @Component({
        components: {SelectBox, EditableInputView, TextSmallMuted}
    })
    export default class EditableSelectInput extends Mixins<{ value: Nullable<string> }>(EditableInputMixin) {
        protected currentValue: Nullable<string> = this.value;
        @Prop() options!: Dictionary<string>;

        get displayableValue() {
            if (this.currentValue)
                return this.options[this.currentValue];
            return null;
        }

        get isEmpty(){
            return this.currentValue === '' || this.currentValue === null
                || this.options[this.currentValue] == undefined;
        }

        protected onInput(e: Nullable<any>) {
            this.currentValue = e ? e.value : null;
        }
    }
</script>

<style scoped>

</style>