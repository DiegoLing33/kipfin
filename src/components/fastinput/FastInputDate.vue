<template>
    <div class="view-FastInputDate">
        <b-input-group>
            <b-form-datepicker
                    v-model="model"
                    :value="preValue"
                    :readonly="!editState"
                    :disabled="!editState"
                    placeholder="Выберите дату"
                />
            <b-input-group-append>
                <b-button @click="handleClick" :variant="variant">
                    <b-icon :icon="icon" :animation="animation"/>
                    <template v-if="icon==='check'"> Сохранить</template>
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class FastInputDate extends Vue {
        @Prop({required: true}) preValue!: any;
        @Prop({default: false}) disabled!: boolean;
        @Prop({default: (a: string) => a}) formatter!: (a: string) => string;
        @Prop({default: () => true}) callback!: (value: unknown) => Promise<boolean>;

        private editState = false;
        private variant = "info";
        private icon = "pencil";
        private model = "";
        private animation = "";
        private was = "";

        private mounted() {
            this.model = this.preValue;
            this.was = this.preValue;
            if (this.disabled) {
                this.variant = "secondary";
                this.icon = "dash-circle";
            }
        }

        private setEditable() {
            this.editState = true;
            this.icon = "check";
            this.variant = "success";
            this.animation = "";
        }

        private setNoEditable() {
            this.editState = false;
            this.icon = "pencil";
            this.variant = "info";
            this.animation = "";
        }

        private handleClick() {
            if (this.disabled) return;
            if (this.editState) {
                if (this.model !== this.was) {
                    this.editState = false;
                    this.variant = "secondary";
                    this.icon = "arrow-clockwise";
                    this.animation = "spin";

                    this.callback(this.model).then(value => {
                        if (value) {
                            this.was = this.model;
                        } else {
                            this.model = this.was;
                        }
                        this.setNoEditable();
                    }).catch(() => {
                        this.model = this.was;
                        this.setNoEditable();
                    });
                }else{
                    this.setNoEditable();
                }
            } else {
                this.setEditable();
            }
        }
    }
</script>

<style scoped>
</style>