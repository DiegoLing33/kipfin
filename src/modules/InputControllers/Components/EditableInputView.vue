<template>
    <div class="view-EditableTextInput" v-if="isAbleToEdit">
        <b-row class="align-items-center">
            <b-col md="9" sm="9" :id="_uid + '_item'">
                <template v-if="isEditState">
                    <slot name="edit"></slot>
                    <!-- Input section here -->
                </template>
                <template v-else>
                    <span v-if="isEmpty && placeholder" class="text-muted">{{placeholder}}</span>
                    <span @dblclick="toggleState" v-else>{{displayableValue}}</span>
                </template>
            </b-col>
            <b-col md="3" sm="3">
                <b-button :variant="!isEditState ? 'outline-primary' : 'info'" pill block @click="toggleState">
                    <b-icon-arrow-repeat animation="spin" v-if="isHandling"/>
                    <b-icon-check v-else-if="isEditState"/>
                    <b-icon-pencil v-else/>
                </b-button>
            </b-col>
        </b-row>
        <b-popover placement="left" triggers="" :show="isEditState" :target="_uid + '_item'">
            Нажмите <strong>
            <b-icon-check/>
        </strong> для сохранения изменений. <a href="#" @click="reset">Отменить</a>
        </b-popover>
    </div>
    <div v-else>
        <span v-if="isEmpty && placeholder" class="text-muted">{{placeholder}}</span>
        <span v-else>{{displayableValue}}</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Nullable} from "@/core/Common/Common";

    /**
     *  The EditableInputView component.
     *  @author diego
     *  @created 30.08.2020 15:00
     */
    @Component
    export default class EditableInputView extends Vue {
        @Prop({default: false}) isEditState!: boolean;
        @Prop({default: false}) isHandling!: boolean;
        @Prop({default: false}) isAbleToEdit!: boolean;
        @Prop({default: true}) isEmpty!: boolean;

        @Prop({default: null}) displayableValue!: never;
        @Prop({default: null}) placeholder!: Nullable<string>;

        @Prop({default: null}) toggleState!: Function;
        @Prop({default: null}) reset!: Function;

    }
</script>

<style scoped>

</style>