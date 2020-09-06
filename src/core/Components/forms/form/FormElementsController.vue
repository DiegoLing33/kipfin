<template>
    <div>
        <b-card :border-variant="(hasDone ? 'success' : (hasErrors ? 'danger' : 'default'))" :header="title">
            <slot></slot>
            <div v-for="item of items" :key="(item.name+'_field')">
                <template v-if="item.type === 'text'">
                    <form-text-input
                            :inputType="item.inputType || 'text'"
                            :placeholder="item.placeholder"
                            :name="item.name"
                            :description="item.description"
                            :key="(item.name)+'_key'"
                            :pre="item.pre || ''"
                            :id="(item.name)+'_id'"
                            @input="((e) => handleInput(item.name, e))"
                            :inputRef="item.ref"
                    >
                    </form-text-input>
                </template>
                <template v-if="item.type === 'textarea'">
                    <form-text-input
                            :area="true"
                            :pre="item.pre || ''"
                            :inputType="item.inputType || 'text'"
                            :placeholder="item.placeholder"
                            :name="item.name"
                            :description="item.description"
                            :key="(item.name)+'_key'"
                            @input="((e) => handleInput(item.name, e))"
                            :inputRef="item.ref"
                    >
                    </form-text-input>
                </template>
                <template v-if="item.type === 'date'">
                    <b-form-group
                            class="mt-3"
                            :id="(item.name)+'_calendar_group'"
                            :label-for="(item.name)+'_calendar'"
                            :description="item.description"
                    >
                        <b-form-datepicker
                                :max="item.max"
                                :id="(item.name)+'_calendar'"
                                :placeholder="item.placeholder"
                                @input="((e)=>handleInput(item.name, e))"
                        ></b-form-datepicker>
                    </b-form-group>

                </template>
                <template v-if="item.type === 'file'">
                    <form-file-input
                        :item="item"
                        @input="((e)=>handleInput(item.name, e))"
                    ></form-file-input>
                </template>
                <template v-if="item.type === 'gender'">
                    <b-card>
                        <template v-slot:header>
                            <small class="text-muted">{{item.description}}</small>
                        </template>
                    <b-form-radio-group
                            :name="item.name"
                            :options="[{text:'Мужской', value: '1'}, {text:'Женский', value: '2'}]"
                            @input="((e)=>handleInput(item.name, e))"
                    >
                    </b-form-radio-group>
                    </b-card>
                </template>
                <template v-if="item.type === 'selection'">
                <b-card>
                    <template v-slot:header>
                        <small class="text-muted">{{item.description}}</small>
                    </template>
                    <b-form-radio-group
                            :name="item.name"
                            :options="item.options"
                            @input="((e)=>handleInput(item.name, e))"
                    >
                    </b-form-radio-group>
                </b-card>
</template>
            </div>
            <template v-slot:footer>
                <FormMomentControl :result=" momentResult
                "></FormMomentControl>
            </template>
            <slot name="footer"></slot>
            <template v-if="button !== ''">
                <b-button variant="primary" @click="buttonHandler" :disabled="!hasDone">{{button}}</b-button>
            </template>
        </b-card>
        <div class="my-3">
            <b-progress
                    :max="max"
                    :variant="getDoneCount() === max ? 'success' : 'danger'"
                    :value="getDoneCount()"
                    show-value
            >
            </b-progress>
            <small>( <b>{{title}}</b>, заполнено {{(Math.round(getDoneCount() / (max || 1) * 100))}}% )</small>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import FormMomentControl from "@/core/Components/forms/form/FormMomentControl.vue";
    import {FormElement} from "@/core/app/FormElements";
    import FormTextInput from "@/core/Components/forms/form/FormTextInput.vue";
    import FormSelectionInput from "@/core/Components/forms/form/FormSelectionInput.vue";
    import FormFileInput from "@/core/Components/forms/form/FormFileInput.vue";

    @Component({
        components: {FormFileInput, FormSelectionInput, FormTextInput, FormMomentControl}
    })
    export default class FormElementsController extends Vue {
        @Prop({required: true}) readonly title!: string;
        @Prop({required: false}) readonly done!: number;
        @Prop({required: false, default: ""}) readonly button!: string;
        @Prop({
            default: () => {
                return []
            }
        }) readonly items!: FormElement[];

        private max: number = this.items.length;
        private doneFields: { [name: string]: boolean } = {};
        private values: { [name: string]: any | undefined } = {};

        private hasDone = false;
        private hasErrors = false;

        /**
         * The moment result
         */
        private momentResult: [number, string] = [0, ""];

        /**
         * Returns the done fields count
         */
        getDoneCount() {
            return Object.values(this.doneFields || {}).filter(value => value).length;
        }

        /**
         * Tests form inputted data
         */
        testForm() {
            this.hasErrors = false;
            for (const item of this.items) {
                this.doneFields[item.name] = item.tester(this.values[item.name]);
                if (!this.doneFields[item.name]) {
                    if (!this.hasErrors) {
                        this.momentResult = [-1, item.error || item.description];
                        this.hasErrors = true;
                    }
                }
            }
            if (this.getDoneCount() === this.max) {
                this.hasDone = true;
                this.hasErrors = false;
                this.$emit("changed", {done: true, values: this.values});
                this.momentResult = [1, "Все поля в графе " + this.title + " заполнены верно!"];
            }else{
                this.$emit("changed", {done: false, values: this.values});
            }
        }

        /**
         * Handles the input action
         * @param name
         * @param value
         */
        handleInput(name: string, value: any) {
            this.values[name] = value;
            this.testForm();
        }

        private buttonHandler(){
            this.$emit("done", {done: false, values: this.values});
        }
    }
</script>

<style scoped>
</style>
