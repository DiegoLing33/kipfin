<template>
    <b-input-group>
        <b-form-datepicker
                v-model="model"
                :value="defaultValue"
                :readonly="currentState !== 'editing'"
                :disabled="currentState !== 'editing'"
                placeholder="Выберите дату"
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
    import {Component} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import FastInputComponent from "@/ling/components/mixin/FastInputComponent.vue";

    @Component
    export default class FiDatePicker extends mixins(FastInputComponent) {

    }
</script>

<style scoped>

</style>