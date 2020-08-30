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
            <b-input :disabled="disabled" :state="!isError ? null : false" :value="currentValue"
                     @input="onInput"/>
        </template>
    </EditableInputView>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import EditableInputMixin from "@/ling/components/input/EditableInputMixin.vue";
    import {Nullable} from "@/ling/types/Common";
    import TextSmallMuted from "@/components/theme/text/TextSmallMuted.vue";
    import EditableInputView from "@/ling/components/input/EditableInputView.vue";

    /**
     *  The EditableTextInput component.
     *  @author diego
     *  @created 29.08.2020 22:48
     */
    @Component({
        components: {EditableInputView, TextSmallMuted}
    })
    export default class EditableTextInput extends Mixins<{ value: Nullable<string> }>(EditableInputMixin) {
        protected currentValue: Nullable<string> = this.value;

        protected onInput(e: Nullable<string>) {
            this.currentValue = e;
        }
    }
</script>

<style scoped>

</style>