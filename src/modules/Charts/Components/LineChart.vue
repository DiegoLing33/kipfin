

<script lang="ts">
    import {  Line, mixins } from 'vue-chartjs-typescript'
    import Vue from 'vue'
    import { Component, Prop } from 'vue-property-decorator'
    const { reactiveProp } = mixins

    @Component({
        extends: Line,
        mixins: [reactiveProp],
    })
    export default class LineChart extends Vue {
        @Prop() chartData: any;
        @Prop({default: function () { return {} }}) options!: object

        public renderChart!: (chartData: any, options: any) => void;
        mounted() {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>

<style scoped>

</style>