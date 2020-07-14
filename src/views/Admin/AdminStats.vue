<template>
    <user-content
            title="Статистика"
    >
        <template v-slot:header>
            <b-card title="Период">
                <b-form-radio-group
                        class="mr-1"
                        v-model="selectedMonth"
                        :options="([{text: 'Июнь', value: '06'},
                        {text: 'Июль', value: '07'},
                        {text: 'Август', value: '08'}, {text: 'Весь период', value: '*'}])"
                        buttons
                ></b-form-radio-group>
                <b-form-radio-group
                        v-model="selectedType"
                        :options="([{text: 'Линии', value: 'lines'}, {text: 'Столбцы', value: 'bars'}])"
                        buttons
                ></b-form-radio-group>
            </b-card>
        </template>
        <div style="height: 400px; position: relative">
            <line-chart
                    v-if="selectedType === 'lines'"
                    :options="({maintainAspectRatio: false})"
                    :chart-data="datacollection"></line-chart>
            <bar-chart
                    v-else
                    :options="({maintainAspectRatio: false})"
                    :chart-data="datacollection"></bar-chart>
        </div>
        <header-lined class="mt-4" title="Подсчеты данных"></header-lined>
        <b-table-simple bordered>
            <b-tbody>
                <b-tr>
                    <b-td colspan="2">
                        <b>Уведомления</b>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>Всего уведомлений</b-td>
                    <b-td>{{pos.notifies}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td colspan="2">
                        <b>Договор - оплата</b>
                        <div class="small text-muted">Абитуриенты, которые оплатили договор</div>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оплачено ИСИП</b-td>
                    <b-td>{{pos.done[1].length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>Оплачено ОИБАС</b-td>
                    <b-td>{{pos.done[3].length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td colspan="2">
                        <b>Договор - бюджет/договор</b>
                        <div class="small text-muted">Абитуриенты, которые
                            указали бюджет/договор или договор и при этом <b>сделали уведомление</b></div>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>ИСИП (Договор)</b-td>
                    <b-td>{{pos.res[1].length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>ПКС (Бюджет/Договор)</b-td>
                    <b-td>{{pos.res[2].length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>ОИБАС (Бюджет/Договор, Договор)</b-td>
                    <b-td>{{pos.res[3].length}}</b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </user-content>
</template>

<script lang="ts">
    import {Component, Mixins, Watch} from "vue-property-decorator";
    import UserContent from "@/components/theme/UserContent.vue";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import LineChart from "@/components/charts/LineChart.vue";
    import {nameList} from "@/ling/types/Common";
    import API from "@/app/api/API";
    import BarChart from "@/components/charts/BarChart.vue";
    import HeaderLined from "@/components/theme/heading/HeaderLined.vue";

    @Component({
        components: {HeaderLined, BarChart, LineChart, UserContent}
    })
    export default class AdminStats extends Mixins(StoreLoadedComponent) {
        private datacollection = nameList({});
        private stats = nameList<number>();
        private agrees = nameList<number>();
        private notifies = nameList<number>();
        private selectedMonth = String(new Date().getMonth() + 1).padStart(2, '0');
        private selectedType = "lines";
        private pos = {notifies: 0, done: {1: [], 2: [], 3: []}, res: {1: [], 2: [], 3: []}};


        protected async storeLoaded() {
            const res = await API.request("mission.stats");
            this.pos = await API.request("mission.positions");
            console.log(this.pos.res);
            this.stats = res.new;
            this.agrees = res.agrees;
            this.notifies = res.notifies;
            this.fillData();
        }

        protected dateFilter(s: string) {
            if (this.selectedMonth === '*') return true;
            return s.split('-')[1] === this.selectedMonth;
        }

        @Watch("selectedMonth")
        fillData() {
            let allKeys: string[] = [];
            const keys = Object.keys(this.stats).sort().filter(this.dateFilter);
            const agreesKeys = Object.keys(this.agrees).sort().filter(this.dateFilter);
            keys.forEach(k => !allKeys.includes(k) ? allKeys.push(k) : null);
            agreesKeys.forEach(k => !allKeys.includes(k) ? allKeys.push(k) : null);
            Object.keys(this.notifies).forEach(k => !allKeys.includes(k) ? allKeys.push(k) : null);
            allKeys = allKeys.sort().filter(this.dateFilter);

            this.datacollection = {
                labels: allKeys,
                datasets: [
                    {
                        // hidden: true,
                        label: "Новые анкеты",
                        backgroundColor: '#f87979',
                        data: allKeys.map(value => this.stats[value] || 0)
                    },
                    {
                        label: "Заявления",
                        backgroundColor: '#9ff879',
                        data: allKeys.map(value => (this.agrees[value] || 0) / 2)
                    },
                    {
                        label: "Уведомления",
                        backgroundColor: '#79e5f8',
                        data: allKeys.map(value => this.notifies[value] || 0)
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>