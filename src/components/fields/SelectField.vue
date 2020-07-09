<template>
    <div role="group">
        <b-overlay :show="busy">
            <label v-if="props.title" :for="(`input-${props.name}`)">{{props.title}}</label>
            <b-input-group
                    :prepend="props.prepend">
                <b-form-select
                        :id="(`input-${props.name}`)"
                        v-model="fieldValue"
                        :options="props.options"
                        :type="props.inputType || 'text'"
                        :state="noState ? null : (fieldState === null ? null : fieldState === true)"
                        :aria-describedby="(`input-${props.name}-help input-${props.name}-feedback`)"
                        :placeholder="props.placeholder"
                        :formatter="props.formatter || ((a) => a)"
                        @input="onChangeValue"
                        trim
                >
                </b-form-select>
                <b-input-group-append v-if="props.own">
                    <b-button @click="handleSave" variant="primary">Сохранить</b-button>
                </b-input-group-append>
            </b-input-group>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <div class="text-danger" v-if="fieldState !== true && !noState" :id="(`input-${props.name}-feedback`)">
                <small>{{this.fieldState}}</small>
            </div>

            <!-- This is a form text block (formerly known as help block) -->
            <b-form-text v-if="props.description" :id="(`input-${props.name}-help`)">
                {{props.description}}
            </b-form-text>
        </b-overlay>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {SelectFieldProps} from "@/components/fields/SelectFieldI";

    /**
     * The text field input component
     */
    @Component
    export default class SelectField extends Vue {
        @Prop({required: true}) props!: SelectFieldProps;
        @Prop({required: false, default: false}) noState!: boolean;

        private fieldValue = "";
        private busy       = false;

        /**
         * LS.F.1 - All Fields Must have fieldState get method
         */
        get fieldState(): boolean | string | null {
            if (this.fieldValue === "")
                return this.props.own ? null : "Поле обязательно к заполнению";
            return this.runTester(this.fieldValue);
        }

        /**
         * Runs the tester
         */
        private runTester(value: string): boolean | string | null {
            return this.props.tester ? this.props.tester(value) : true;
        }

        /**
         * LS.F.2 - All Fields Must have mounted method to pre init the data
         */
        private mounted() {
            if (this.props.pre)
                this.fieldValue = this.props.pre;
        }

        /**
         * LS.F.3 - All Fields Must have mounted method onChange value to emit v-model
         */
        private onChangeValue(value: string) {
            if (this.runTester(value) === true) {
                this.$emit("change", this.fieldValue);
            }else{
                this.$emit("change", null);
            }
        }

        private handleSave() {
            if (this.runTester(this.fieldValue) === true) {
                this.busy = true;
                if (this.props.save) {
                    this.props.save(this.fieldValue, this.props.name)?.finally(
                        () => this.busy = false
                    );
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
