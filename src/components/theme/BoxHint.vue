<template>
    <div class="box-hint text-center">
        <text-small-muted>
            <slot>{{text}}</slot>
        </text-small-muted>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import TextSmallMuted from "@/components/theme/text/TextSmallMuted.vue";
@Component({
    components: {TextSmallMuted}
})
export default class BoxHint extends Vue {
    @Prop({default: false}) block!: boolean;
    @Prop({default: ""}) text!: string;
}
</script>

<style scoped>
    .box-hint{
        padding: 7px;
        border: 1px #aaaaaa dashed;
        display: inline-block;
    }
</style>