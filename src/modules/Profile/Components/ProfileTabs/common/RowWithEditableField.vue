<template>
    <b-row class="rwef align-items-center">
        <b-col class="p-3" md="6" sm="12">
            <b>{{title}}</b>
            <div v-if="showHint">
                <text-small-muted>
                    <slot name="hint">
                        {{hint}}
                    </slot>
                </text-small-muted>
            </div>
        </b-col>
        <b-col class="p-3" md="6" sm="12">
            <slot></slot>
        </b-col>
    </b-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import TextSmallMuted from "@/modules/Interface/Components/text/TextSmallMuted.vue";

    /**
     *  The RowWithEditableField component.
     *  @author diego
     *  @created 30.08.2020 15:16
     */
    @Component({
        components: {TextSmallMuted}
    })
    export default class RowWithEditableField extends Vue {
        @Prop() title!: string;
        @Prop({default: ''}) hint!: string;
        @Prop({default: false}) showHint!: boolean;

    }
</script>

<style>
    .rwef:not(:last-child){
        border-bottom: 1px solid #efefef
    }
</style>