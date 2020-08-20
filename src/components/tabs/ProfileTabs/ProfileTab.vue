<template>
    <b-tab :lazy="lazy" :active="active">
        <template v-slot:title>
            <slot name="icon"></slot>
            <div>{{title}}</div>
        </template>
        <slot></slot>
    </b-tab>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The ProfileTab component.
     *  @author diego
     *  @created 20.08.2020 23:58
     */
    @Component
    export default class ProfileTab extends Vue {
        @Prop({required: true}) title!: string;

        @Prop({required: false, default: false}) lazy!: boolean;
        @Prop({required: false, default: false}) active!: boolean;
    }
</script>

<style scoped>

</style>