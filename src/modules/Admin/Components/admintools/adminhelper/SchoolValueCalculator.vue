<template>
    <div class="view-SchoolValueCalculator">
        <b-card-body>
            <b-input style="z-index: 999999999" v-model="inputed" @input="onInputValue"
                     placeholder="Вводите оценки без пробелов..."/>
        </b-card-body>
        <b-table-simple class="mt-3" striped bordered>
            <b-tbody>
                <b-tr>
                    <b-td style="width: 40%">Средний балл:</b-td>
                    <b-td>
                        <b>{{(Math.round(middleValue * 100) / 100)}}</b>
                        <div><small class="text-muted">({{middleValue}})</small></div>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оценок 5:</b-td>
                    <b-td><b>{{counts[5]}}</b></b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оценок 4:</b-td>
                    <b-td><b>{{counts[4]}}</b></b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оценок 3:</b-td>
                    <b-td><b>{{counts[3]}}</b></b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оценок 2:</b-td>
                    <b-td><b>{{counts[2]}}</b></b-td>
                </b-tr>
                <b-tr>
                    <b-td>Всего оценок:</b-td>
                    <b-td><b>{{count}}</b></b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {IntDict} from "@/core/app/types";

    @Component
    export default class SchoolValueCalculator extends Vue {
        private inputed = "";
        private middleValue = 0;
        private count = 0;
        private counts: IntDict<number> = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

        /**
         * Clear on mount
         */
        mounted(){
            this.inputed = "";
        }

        /**
         * On input value handler
         * @param text
         */
        private onInputValue(text: string) {
            this.counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
            this.middleValue = 0;
            for (let i = 0; i < text.length; i++) {
                const mark = parseInt(text[i]);
                this.middleValue += mark;
                this.counts[mark]++;
            }
            this.count = text.length;
            this.middleValue /= text.length;
        }
    }
</script>

<style scoped>

</style>