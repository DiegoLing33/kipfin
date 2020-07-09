<template>
    <div class="view-MomentControl">
        <b-alert v-if="result[0] === 1" show="show" variant="success">{{result[1]}}</b-alert>
        <b-alert v-if="result[0] === -1" show="show" variant="danger">{{result[1]}}</b-alert>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class MomentControl extends Vue {
        @Prop({required: true}) result!: [number, string];
    }
</script>

<style scoped>
</style>