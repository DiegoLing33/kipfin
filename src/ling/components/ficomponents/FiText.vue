<template>
    <b-input-group>
        <b-form-input
                v-model="model"
                :value="defaultValue"
                :readonly="disableField"
                :placeholder="placeholder"
                :formatter="formatter"
                trim
        />
        <b-input-group-append>
            <b-button @click="(()=>apply(model))" :variant="buttonVariant">
                <b-icon :icon="iconName" :animation="iconAnimation"/>
                {{buttonText}}
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import FastInputComponent from "@/ling/components/mixin/FastInputComponent.vue";

    @Component
    export default class FiText extends mixins(FastInputComponent) {
        @Prop({default: (a: string) => a}) formatter!: (a: string) => string;
    }
</script>

<style scoped>

</style>