<template>
    <div>
        <b-overlay :show="busy">
            <b-form-group
                    class="mt-3"
                    :id="(item.name)+'_calendar_group'"
                    :label-for="(item.name)+'_calendar'"
                    :description="item.description"
            >
                <b-form-file
                        :browse-text="item.multiply ? 'Выбрать файлы' : 'Выбрать файл'"
                        :multiple="!!item.multiply"
                        :placeholder="item.placeholder"
                        :drop-placeholder="item.placeholder"
                        :accept="item.accept || '*'"
                        @input="handleInput"
                        v-model="value"
                ></b-form-file>
            </b-form-group>
            <b-button
                    v-if="item.own"
                    :disabled="!item.tester(value)"
                    @click="submit" variant="primary">Отправить файл
            </b-button>
        </b-overlay>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FormElement} from "@/core/app/FormElements";

    @Component
    export default class FormFileInput extends Vue {
        @Prop({required: true}) item!: FormElement;

        private value: Blob | Blob[] | null = null;
        private busy = false;

        private handleInput(value: Blob) {
            this.$emit("input", value);
        }

        private submit() {
            if (this.item.send) {
                this.busy = true;
                this.item.send(this.item.name, this.value).then(() => {
                    this.value = null;
                    this.busy = false;
                }).catch(() => {
                    this.value = null;
                    this.busy = false;
                });
            }
        }
    }
</script>

<style scoped>
</style>
