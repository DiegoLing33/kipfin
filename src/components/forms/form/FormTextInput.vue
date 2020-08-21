<template>
    <b-form-group
            v-if="!own"
            class="mt-3"
            :id="(name + '-input-group')"
            :label-for="(name + '-input')"
            :description="description"
    >
        <b-form-input
                v-if="area === false"
                :id="(name + '-input')"
                :type="inputType"
                required
                v-model="content"
                :placeholder="placeholder"
                @input="handleInput"
        ></b-form-input>
        <b-textarea
                v-if="area === true"
                :id="(name + '-input')"
                :type="inputType"
                required
                v-model="content"
                :placeholder="placeholder"
                @input="handleInput"
        ></b-textarea>
    </b-form-group>
    <div v-else>
        <b-input-group>
            <b-form-input
                    v-if="area === false"
                    :id="(name + '-input')"
                    :type="inputType"
                    required
                    v-model="content"
                    :placeholder="placeholder"
                    @input="handleInput"
            ></b-form-input>
            <b-input-group-append>
                <b-button @click="sender(name, content)" variant="primary">Отправить</b-button>
            </b-input-group-append>
        </b-input-group>
        <small>{{description}}</small>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {BvComponent} from "bootstrap-vue";

    @Component
    export default class FormTextInput extends Vue {
        @Prop({required: true}) readonly name!: string;
        @Prop({required: false, default: ""}) readonly pre!: string;
        @Prop({required: true}) readonly description!: string;
        @Prop({required: true}) readonly placeholder!: string;
        @Prop({required: false, default: "text"}) readonly inputType!: string;
        @Prop({required: false, default: undefined}) readonly inputRef!: (a: BvComponent) => void;
        @Prop({required: false, default: false}) readonly area!: boolean;
        @Prop({required: false, default: false}) readonly own!: boolean;
        @Prop({
            required: false,
            default: () => Promise.resolve()
        }) readonly sender!: (name: string, value: any) => Promise<boolean>;

        private content = this.pre;

        setContent(text: string) {
            this.content = text;
            this.$emit("input", this.content)
        }

        mounted() {
            if (this.inputRef) this.inputRef(this);
        }

        handleInput() {
            this.$emit("input", this.content)
        }
    }
</script>

<style scoped>
</style>