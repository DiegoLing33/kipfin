<template>
    <div class="text-center">
        <b-icon :icon="icon" font-scale="5"/>
        <h2 class="mt-3">{{title}}</h2>
        <slot>{{text}}</slot>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class IconHeaderText extends Vue {
    @Prop({required: true}) icon!: string;
    @Prop({required: true}) title!: string;
    @Prop({default: ''}) text!: string;
}
</script>

<style scoped>

</style>