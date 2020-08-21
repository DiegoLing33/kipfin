<template>
    <b-form-checkbox
            unchecked-value="no"
            value="yes"
            switch
            @change="onChange"
            v-model="currentValue"
    >
        {{title}}
    </b-form-checkbox>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    /**
     *  The LiFlag component.
     *  @author diego
     *  @created 22.08.2020 00:30
     */
    @Component
    export default class LiFlag extends Vue {
        @Prop({required: false, default: false}) value!: boolean;
        @Prop({required: false, default: ""}) title!: string;
        private currentValue = this.value ? 'yes' : 'no';

        @Watch("value")
        onValueChange(value: boolean){
            this.currentValue = value ? 'yes' : 'no';
        }

        onChange(e: string) {
            this.currentValue = e;
            this.$emit('input', e === 'yes');
        }
    }
</script>

<style scoped>

</style>