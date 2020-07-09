<template>
    <b-input-group>
        <b-form-select
                v-model="model"
                :value="defaultValue"
                :options="options"
                :disabled="currentState !== 'editing'"
        >
        </b-form-select>
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
    import {NameList} from "@/ling/types/Common";
    import {OptionValue} from "@/app/types";

    @Component
    export default class FiSelect extends mixins(FastInputComponent) {
        @Prop({default: {}}) map!: NameList<string>;

        /**
         * Returns the options from the map
         */
        private get options(){
            const arr: OptionValue[] = [];
            Object.keys(this.map).forEach(k=>{
                arr.push({value: k, text: this.map[k]});
            });
            return arr;
        }
    }
</script>

<style scoped>

</style>