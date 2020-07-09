<template>
    <div class="view-HeaderLined">
        <div class="title">
            {{title}}
            <slot></slot>
        </div>
        <div class="description text-muted">
            {{description}}
            <slot name="description"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class HeaderLined extends Vue {
        @Prop({required: false, default: ''}) title!: string;
        @Prop({required: false, default: ''}) description!: string;
    }
</script>

<style scoped>
    .view-HeaderLined {
        margin-bottom: 7px;
        padding-bottom: 7px;
        border-bottom: 1px dashed gray;
    }

    .view-HeaderLined .title {
        font-size: 2em;
    }

    .view-HeaderLined .description {
        font-size: 1em;
    }
</style>