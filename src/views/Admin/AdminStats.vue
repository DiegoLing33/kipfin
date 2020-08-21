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
        <b-table-simple bordered class="mt-3 text-center stat-table">
            <b-tbody>
                <tr>
                    <td class="text-left" style="width: 33%">#</td>
                    <td colspan="2">ИСИП</td>
                    <td colspan="2">ОИБАС</td>
                </tr>
                <tr style="border-bottom: 2px solid #666666">
                    <td class="text-left">
                        Всего мест
                        <div class="text-muted small">
                            Количество мест, доступных для договора
                        </div>
                    </td>
                    <td colspan="2" style="vertical-align: middle">110</td>
                    <td colspan="2" style="vertical-align: middle">95</td>
                </tr>
                <tr>
                    <td class="text-left">
                        Оплачено
                        <div class="text-muted small">
                            Количество полностью готовых <b>оплаченных</b> договоров
                        </div>
                    </td>
                    <td colspan="2">{{ pos.done[1].length }}</td>
                    <td colspan="2">{{ pos.done[3].length }}</td>
                </tr>
                <tr>
                    <td class="text-left">
                        Ожидаем оплаты
                        <div class="text-muted small">
                            Количество абитуриентов, которые заключили договор и должны оплатить его
                        </div>
                    </td>
                    <td colspan="2">{{ pos.paywait[1].length }}</td>
                    <td colspan="2">{{ pos.paywait[3].length }}</td>
                </tr>

                <tr>
                    <td class="text-left">
                        Резерв
                        <div class="text-muted small">
                            Количество людей, которые отметили, что готовые оплатить договор,
                            если не пройдут на бюджет
                        </div>
                    </td>
                    <td style="vertical-align: middle" colspan="2">
                        {{ pos.reserved[1] }}
                    </td>
                    <td style="vertical-align: middle" colspan="2">
                        <!-- S -->
                        {{ pos.reserved[3] }}
                    </td>
                </tr>
                <tr style="border-top: 2px solid #666666">
                    <td class="text-left">
                        Всего
                        <div class="text-muted small">
                            Количество занятых позиций по специальности
                        </div>
                    </td>
                    <td style="vertical-align: middle" colspan="2">{{ allGroupsISIP }}</td>
                    <td style="vertical-align: middle" colspan="2">{{ allGroupsOIBAS }}</td>
                </tr>
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
    private pos = {
        notifies: 0, paywait: {1: [], 3: []},
        reserved: {1: [], 3: []},
        done: {1: [], 2: [], 3: []}, res: {1: [], 2: [], 3: []}
    };

    get allGroupsISIP() {
        return this.pos.res[1].length + this.pos.res[2].length + this.pos.done[1].length;
    }

    get allGroupsOIBAS() {
        return this.pos.res[3].length + this.pos.done[3].length;
    }

    protected async storeLoaded() {
        const res = await API.request("mission.stats");
        this.pos = await API.request("mission.positions");
        this.stats = res.new;
        this.agrees = res.agrees;
        this.notifies = res.notifies;

        (this.pos.reserved[3] as any) -= 3;
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
.stat-table * {
    vertical-align: middle;
}
</style>