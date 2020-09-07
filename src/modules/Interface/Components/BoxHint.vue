<template>
    <div :class="className">
        <text-small-muted>
            <slot>{{text}}</slot>
        </text-small-muted>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import TextSmallMuted from "@/modules/Interface/Components/text/TextSmallMuted.vue";
@Component({
    components: {TextSmallMuted}
})
export default class BoxHint extends Vue {
    @Prop({default: false}) block!: boolean;
    @Prop({default: ""}) text!: string;

    get className(){
        const src = 'box-hint text-center';
        if(this.block) return src + ' w-100';
        return src;
    }
}
</script>

<style scoped>
    .box-hint{
        padding: 7px;
        border: 1px #aaaaaa dashed;
        display: inline-block;
    }
</style>