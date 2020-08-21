<template>
    <b-card>
        <template v-slot:header>
            <slot name="header"></slot>
        </template>
        <b-row>
            <div :class="field.design || 'col-md-12'" v-for="(field, i) of fields" :key="'field_' + i">
                <template v-if="field.type === 'text' || field.type === undefined">
                    <text-field class="mt-3" @change="(v) => fieldChanged(field.name, v)" :props="field"/>
                </template>
                <template v-if="field.type === 'date'">
                    <date-field class="mt-3" @change="(v) => fieldChanged(field.name, v)" :props="field"/>
                </template>
                <template v-if="field.type === 'radio'">
                    <radio-field class="mt-3" @change="(v) => fieldChanged(field.name, v)" :props="field"/>
                </template>
                <template v-if="field.type === 'select'">
                    <select-field class="mt-3" @change="(v) => fieldChanged(field.name, v)" :props="field"/>
                </template>
                <template v-if="field.type === 'file'">
                    <file-field class="mt-3" @change="(v) => fieldChanged(field.name, v)" :props="field"/>
                </template>
            </div>
        </b-row>
        <template v-slot:footer>
            <b-form-checkbox
                    v-if="needAccept"
                    class="my-3"
                    id="checkbox-1"
                    name="checkbox-1"
                    v-model="acceptedRules"
                    :disabled="!ready"
                    value="accepted"
                    unchecked-value="not_accepted"
            >
                Нажимая на кнопку, вы даете <a href="/private.pdf" target="_blank">согласие на обработку своих
                персональных данных</a>
            </b-form-checkbox>
            <b-button @click="clickHandle"
                      variant="primary"
                      :disabled="!isButtonEnabled"
                      block>{{sendButtonText}}
            </b-button>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Field} from "@/components/forms/fields/Field";
    import TextField from "@/components/forms/fields/TextField.vue";
    import {Dict} from "@/app/types";
    import DateField from "@/components/forms/fields/DateField.vue";
    import RadioField from "@/components/forms/fields/RadioField.vue";
    import SelectField from "@/components/forms/fields/SelectField.vue";
    import FileField from "@/components/forms/fields/FileField.vue";

    @Component({
        components: {FileField, SelectField, RadioField, DateField, TextField}
    })
    export default class FieldsController extends Vue {
        /**
         * The fields prop
         */
        @Prop({required: true}) fields!: Field[];

        /**
         * The accept flag prop
         */
        @Prop({required: false, default: false}) needAccept!: boolean;

        /**
         * The send button text prop
         */
        @Prop({required: false, default: 'Отправить'}) sendButtonText!: string;

        /**
         * The values
         */
        private values: Dict<unknown> = {};

        /**
         * The ready flag
         */
        private ready = false;

        /**
         * Accept value
         */
        private acceptedRules = "not_accepted";

        /**
         * Returns true, if the accept checkbox checked
         */
        get isAccepted(){
            return this.needAccept ? this.acceptedRules === "accepted" : true;
        }

        /**
         * Returns true, if button enabled
         */
        get isButtonEnabled() {
            return this.needAccept ? (this.ready && this.isAccepted) : this.ready;
        }

        /**
         * Calls every time when field changes
         * @param name
         * @param value
         */
        private fieldChanged(name: string, value: unknown) {
            this.values[name] = value;
            this.ready = this.fields.every(value => ((value.tester &&
                value.tester(this.values[value.name]) || true) === true));
        }

        /**
         * Calls when send button clicked
         */
        private clickHandle() {
            if (!this.ready) this.$bvToast.toast("Не все поля формы заполнены!", {title: "Ошибка"});
            else this.$emit("send", this.values);
        }

    }
</script>

<style scoped lang="scss">

</style>
