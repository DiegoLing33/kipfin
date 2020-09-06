<template>
    <div role="group">
        <b-overlay :show="busy">
            <label v-if="props.title" :for="(`input-${props.name}`)">{{props.title}}</label>
            <b-input-group
                    :prepend="props.prepend">
                <b-form-file
                        :disabled="disabled"
                        :browse-text="props.multiply ? 'Выбрать файлы' : 'Выбрать файл'"
                        :id="(`input-${props.name}`)"
                        v-model="fieldValue"
                        :state="noState ? null : (fieldState === null ? null : fieldState === true)"
                        :aria-describedby="(`input-${props.name}-help input-${props.name}-feedback`)"
                        :placeholder="props.placeholder"
                        :accept="props.accept"
                        :multiple="props.multiply"
                        @input="onChangeValue"
                ></b-form-file>
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
    import {FileFieldProps} from "@/core/Components/forms/fields/FileFieldI";

    /**
     * The text field input component
     */
    @Component
    export default class FileField extends Vue {
        @Prop({required: true}) props!: FileFieldProps;
        @Prop({required: false, default: false}) noState!: boolean;
        @Prop({required: false, default: false}) disabled!: boolean;

        private fieldValue: Blob[] | null = null;
        private busy = false;

        /**
         * LS.F.1 - All Fields Must have fieldState get method
         */
        get fieldState(): boolean | string | null {
            if (this.fieldValue === null)
                return this.props.own ? null : "Поле обязательно к заполнению";
            return this.fieldValue !== null;
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
        private onChangeValue(value: Blob[] | Blob | null) {
            if (value !== null) {
                if (!(value instanceof Array)) value = [value];
                this.$emit("change", value);
            } else {
                this.$emit("change", null);
            }
        }

        private handleSave() {
            if (this.fieldValue !== null) {
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
