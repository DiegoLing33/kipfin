<template>
    <b-card  class="mb-3 text-md-left text-center">
        <b-row  class="d-flex align-items-center">
        <b-col md="2" style="text-align: center">
            <h1 class="text-primary font-weight-bold">
                {{num}}
            </h1>
        </b-col>
        <b-col md="4" style="text-align: center">
            <b-icon :icon="icon" font-scale="8"></b-icon>
        </b-col>
        <b-col md="6">
            <h2 class="text-primary font-weight-bold">
                {{title}}
            </h2>
            <p>
                {{text}}
            </p>
            <slot></slot>
        </b-col>
        </b-row>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class HomeHowToItem extends Vue {
        @Prop({required: true}) title!: string;
        @Prop({required: true}) num!: number;
        @Prop({required: true}) text!: number;
        @Prop({required: true}) icon!: number;
    }
</script>

<style scoped>
</style>