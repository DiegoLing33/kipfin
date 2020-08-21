<template>
    <v-select
        :labelTitle="labelTitle"
        @input="onChange"
        v-model="model"
        labelSearchPlaceholder="Поиск..."
        labelNotFound="Ничего не найдено"

        :disabled="disabled"
        :searchable="search"
        :options="optionsList"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {ObjectIO} from "@/ling/utils/LingIO";
import {SelectBoxOptions, SelectBoxValidOption} from "@/ling/components/SelectBox/SelectBoxCommon";
    import {Nullable} from "@/ling/types/Common";

const VSelect = require('@alfsnd/vue-bootstrap-select/dist/vue-bootstrap-select.esm').default as any;

@Component({components: {VSelect}})
export default class SelectBox extends Vue {

    @Prop({default: true}) search!: boolean;
    @Prop({default: false}) disabled!: boolean;
    @Prop({required: true}) options!: SelectBoxOptions;
    @Prop({default: null, required: false}) defaultValue!: any;
    @Prop({default: "Ничего не выбрано", required: false}) labelTitle!: string;
    @Prop({default: null, required: false}) value!: SelectBoxValidOption|null;

    private model: unknown = this.optionDefault || null;
    private lastSelected = this.optionDefault || null;

    get optionsList() {
        if (this.options instanceof Array) return this.options;
        return ObjectIO.toValueTextArray(this.options);
    }

    get optionDefault(): SelectBoxValidOption | undefined {
        return this.optionsList.find(value => value.value === this.defaultValue);
    }

    @Watch("value")
    protected onValueChange(value: Nullable<SelectBoxValidOption>){
        this.model = value;
    }

    protected onChange(value: SelectBoxValidOption | null) {
        if (value?.value === this.optionDefault?.value
            || this.lastSelected?.value === value?.value
        ) return;
        this.lastSelected = value;
        this.model = value;
        this.$emit("change", value);
        this.$emit("input", value);
    }

    public clear() {
        this.model = null;
    }

    @Watch("defaultValue")
    onDefaultValueChange(){
        this.model = this.optionDefault;
    }

    public setValue(value: unknown){
        this.model = value;
    }
}
</script>

<style>
.v-select {
    position: relative;
    width: 100%;
    height: 38px !important;
    cursor: pointer;
}

.v-select-toggle {
    display: flex;
    justify-content: space-between;
    user-select: none;
    padding: 0.375rem 0.75rem;
    color: #212529;
    background-color: #f8f9fa;
    width: 100%;
    text-align: right;
    white-space: nowrap;
    border: 1px solid rgba(0, 0, 0, 0.125) !important;
    font-size: inherit !important;
    font-family: inherit, sans-serif;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: background-color, border-color, box-shadow, 0.15s ease-in-out;
    cursor: pointer;
}
</style>