<template>
    <b-input-group>
        <b-form-file
                v-model="__model"
                @input="onFileSelected"
                :browse-text="selectButtonText"
                :accept="accept"
                :placeholder="placeholder"
        >
        </b-form-file>
        <b-input-group-append v-if="model">
            <b-button @click="(()=>apply(model))" :variant="buttonVariant">
                <b-icon :icon="iconName" :animation="iconAnimation"/>
                {{buttonText}}
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import FastInputComponent from "@/ling/components/mixin/FastInputComponent.vue";
    import {Nullable} from "@/ling/types/Common";

    interface A<T> {
        model: Nullable<T>;
        oldValue: Nullable<T>;
        iconName: string;
        iconAnimation: string;
        buttonText: string;
        buttonVariant: string;
        disableField: boolean;
        currentState: string;
    }

    @Component
    export default class FiFileUploader extends Mixins<A<Blob[]> & FastInputComponent>(FastInputComponent) {
        @Prop({default: '*'}) accept!: string;
        @Prop({default: 'Выбрать файлы'}) selectButtonText!: string;
        protected __model: Nullable<unknown> = null;

        setDefaultState() {
            this.iconName = "";
            this.buttonText = "";
            this.buttonVariant = "primary";
            this.iconAnimation = "";
            this.disableField = true;
            this.currentState = 'default';
            this.model= null;
            this.__model = null;
        }

        private onFileSelected(file: Nullable<Blob | Blob[]>) {
            if(file === null){
                this.setDefaultState();
            }else {
                this.model = (!(file instanceof Array) ? [file] : file) as any;
                this.iconName = "check";
                this.buttonText = " Отправить";
                this.buttonVariant = "info";
                this.iconAnimation = "";
                this.disableField = false;
                this.currentState = 'editing';
            }
        }
    }
</script>

<style scoped>

</style>