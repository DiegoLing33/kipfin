<template>
    <b-card class="mt-3">
        <b-card-title v-if="!visible" class="header-c-card m-0 p-0" @click="toggle">
            <b-icon-plus-circle/>
            {{title}}
            <span style="padding-top: 2px; font-size: 14px" class="float-right text-muted">[ Открыть {{itemName}} ]</span>
        </b-card-title>
        <b-card-title v-else class="header-c-card m-0 p-0" @click="toggle">
            <b-icon-dash-circle />
            {{title}}
            <span style="padding-top: 2px; font-size: 14px" class="float-right text-muted">[ Скрыть {{itemName}} ]</span>
        </b-card-title>
        <b-collapse :visible="visible" class="mt-3" id="specs-filter">
            <slot></slot>
        </b-collapse>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The CollapseCard component.
     *  @author diego
     *  @created 13.07.2020 23:16
     */
    @Component
    export default class CollapseCard extends Vue {
        @Prop({required: true}) title!: string;
        @Prop({required: false, default: ""}) itemName!: string;
        private visible = false;

        toggle() {
            this.visible = !this.visible;
            this.$emit("visible", this.visible);
        }
    }
</script>

<style scoped>
    .header-c-card{
        cursor: pointer;
    }
</style>