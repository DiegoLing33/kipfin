<template>
    <b-dropdown :variant="$app.infoStatus.variant[selectedValue]" split right block
                :text="$app.infoStatus.text[selectedValue]">
        <b-dropdown-item @click="() => handle('1')">{{$app.infoStatus.text["1"]}}</b-dropdown-item>
        <b-dropdown-item @click="() => handle('2')">{{$app.infoStatus.text["2"]}}</b-dropdown-item>
        <b-dropdown-item @click="() => handle('3')">{{$app.infoStatus.text["3"]}}</b-dropdown-item>
        <template v-if="removable">
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="() => handle('0')">Удалить</b-dropdown-item>
        </template>
    </b-dropdown>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class StatusSelector extends Vue {
        @Prop({required: true}) readonly selected!: string;
        @Prop({required: false, default: false}) readonly removable!: boolean;

        private selectedValue = this.selected;

        private handle(value: string) {
            this.selectedValue = value;
            this.$emit("change", value);
        }

    }
</script>

<style scoped>
</style>