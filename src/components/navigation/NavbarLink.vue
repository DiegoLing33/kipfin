<template>
    <li class="nav-item">
        <router-link :to="to" class="nav-link">
            <slot></slot>
        </router-link>
    </li>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     * The navigation bar item
     */
    @Component
    export default class NavbarLink extends Vue {
        @Prop({required: true}) to!: string;
    }
</script>

<style scoped>
</style>