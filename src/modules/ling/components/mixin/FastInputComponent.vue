<template>
    <div class="view-FastInputComponent"></div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {AsyncCallback, Nullable} from "@/core/Common/Common";

    /**
     * Fast input component mixin
     */
    @Component
    export default class FastInputComponent<T = string> extends Vue {
        /**
         * The callback
         */
        @Prop({required: false, default: AsyncCallback.delayedBool})
        callback!: AsyncCallback<Nullable<T>>;

        /**
         * The default value
         */
        @Prop({required: false, default: null})
        defaultValue!: Nullable<T>;

        /**
         * The placeholder value
         */
        @Prop({required: false, default: ""})
        placeholder!: string;

        /**
         * The disabled state
         */
        @Prop({required: false, default: false})
        disabled!: boolean;

        protected model: Nullable<T> = null;
        protected oldValue: Nullable<T> = null;
        protected iconName = "pencil";
        protected iconAnimation = "";
        protected buttonText = "";
        protected buttonVariant = "primary";
        protected disableField = false;
        protected currentState = 'default';

        created() {
            this.oldValue = this.defaultValue;
            this.model = this.oldValue;
            if (this.disabled) this.setDisabledState();
            else this.setDefaultState();
        }

        protected setDefaultState() {
            this.iconName = "pencil";
            this.buttonText = "";
            this.buttonVariant = "primary";
            this.iconAnimation = "";
            this.disableField = true;
            this.currentState = 'default';
        }

        protected setEditableState() {
            this.iconName = "check";
            this.buttonText = " Сохранить";
            this.buttonVariant = "info";
            this.iconAnimation = "";
            this.disableField = false;
            this.currentState = 'editing';
        }

        /**
         * Sets the disabled state
         */
        protected setDisabledState() {
            this.buttonVariant = "secondary";
            this.iconName = "dash-circle";
            this.buttonText = "";
            this.iconAnimation = "";
            this.disableField = true;
            this.currentState = 'disabled';
        }

        /**
         * Sets the loading state
         */
        protected setLoadingState() {
            this.buttonVariant = "secondary";
            this.iconName = "arrow-clockwise";
            this.iconAnimation = "spin";
            this.disableField = true;
            this.buttonText = "";
            this.currentState = 'loading';
        }

        /**
         * Sets the error state
         */
        protected setErrorState() {
            this.setDefaultState();
            this.buttonVariant = "danger";
            this.iconName = "x-circle";
            this.currentState = 'result';
        }

        /**
         * Sets the success state
         */
        protected setSuccessState() {
            this.setDefaultState();
            this.buttonVariant = "success";
            this.iconName = "check2-circle";
            this.currentState = 'result';
        }

        /**
         * Applies the action
         * @param value
         */
        public apply(value: Nullable<T>) {
            if (this.disabled) {
                this.setDisabledState();
                return;
            }
            if (this.currentState === "editing") {
                if (value === this.oldValue) {
                    this.setDefaultState();
                } else {
                    this.setLoadingState();
                    this.callback(value).then(result => {
                        if (result) {
                            this.oldValue = this.model;
                            this.setSuccessState();
                        } else {
                            this.setErrorState();
                            this.model = this.oldValue;
                        }
                    })
                        .catch(() => {
                            this.model = this.oldValue
                            this.setErrorState();
                        }).finally(() => setTimeout(() => this.setDefaultState(), 1000));

                }
            } else if (this.currentState === 'default') {
                this.setEditableState();
            }
        }
    }
</script>

<style scoped>

</style>