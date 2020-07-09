<template>
    <user-content
            title="Панель управления"
            description="Панель управления приемной комиссией"
    >
        <b-card class="mb-3" title="Детализированный отчет">
            <b-row>
                <b-col md="6" class="mb-2">
                    <b-button block href="http://kipfin.ru/new/index.php?class=res&method=log&spec=2&base=1" variant="primary">ПКС (Бюджет)</b-button>
                </b-col>
                <b-col md="6" class="mb-2">
                    <b-button block href="http://kipfin.ru/new/index.php?class=res&method=log&spec=1&base=2" variant="info">ИСИП (Договор)</b-button>
                </b-col>
                <b-col md="6" class="mb-2">
                    <b-button block href="http://kipfin.ru/new/index.php?class=res&method=log&spec=3&base=1" variant="primary">ОИБАС (Бюджет)</b-button>
                </b-col>
                <b-col md="6" class="mb-2">
                    <b-button block href="http://kipfin.ru/new/index.php?class=res&method=log&spec=3&base=2" variant="info">ОИБАС (Договор)</b-button>
                </b-col>
            </b-row>
            <template v-slot:footer>
                <small class="text-muted">Данные списки могут быть напечатаны</small>
            </template>
        </b-card>
        <b-table-simple bordered>
            <b-tbody>
                <b-tr>
                    <b-td>Всего заполнено анкет:</b-td>
                    <b-td>{{items.length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td><b>Вчера</b> заполнено анкет:</b-td>
                    <b-td>{{yesterday.length}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td><b>Сегодня</b> заполнено анкет:</b-td>
                    <b-td>{{today.length}} ({{Math.round(today.length / yesterday.length * 10000) / 100 - 100}}%)</b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>

        <h4>Выполнение плана</h4>
        <b-table-simple bordered>
            <b-thead>
                <b-td>Специальность</b-td>
                <b-td>Бюджет</b-td>
                <b-td>Договор</b-td>
                <b-td>Бюджет / Договор</b-td>
            </b-thead>
            <b-tbody>
                <b-tr>
                    <b-td>{{$app.specialization['1']}}</b-td>
                    <b-td>{{specs['1'][0]}}</b-td>
                    <b-td>{{specs['1'][1]}}</b-td>
                    <b-td>{{specs['1'][2]}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>{{$app.specialization['2']}}</b-td>
                    <b-td>{{specs['2'][0]}}</b-td>
                    <b-td>{{specs['2'][1]}}</b-td>
                    <b-td>{{specs['2'][2]}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>{{$app.specialization['3']}}</b-td>
                    <b-td>{{specs['3'][0]}} ({{specs['3'][0]+specs['3'][2]}})</b-td>
                    <b-td>{{specs['3'][1]}}</b-td>
                    <b-td>{{specs['3'][2]}}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>Сводка</b-td>
                    <b-td>{{specs['1'][0]+specs['2'][0]+specs['3'][0]}} ({{specs['1'][0]+specs['2'][0]+specs['3'][0] + specs['1'][2]+specs['2'][2]+specs['3'][2]}})</b-td>
                    <b-td>{{specs['1'][1]+specs['2'][1]+specs['3'][1]}}</b-td>
                    <b-td>{{specs['1'][2]+specs['2'][2]+specs['3'][2]}}</b-td>
                </b-tr>

            </b-tbody>
        </b-table-simple>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/api/API";
    import {APIUserResults} from "@/api/APIUsers";
    import {Dict, sqlDate} from "@/app/types";
    import StoreLoader from "@/client/StoreLoader";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent}
    })
    export default class AdminIndex extends Vue {

        private items = Array<APIUserResults>();
        private specs: Dict<number[]> = {1: [0, 0, 0], 2: [0, 0, 0], 3: [0, 0, 0]};


        get today() {
            return this.items.filter(item => {
                const date = sqlDate(item.created);
                const now  = new Date();
                return date.getFullYear() === now.getFullYear() && date.getMonth()
                    === now.getMonth() && date.getDate() === now.getDate();
            });
        }

        get yesterday() {
            return this.items.filter(item => {
                const date = sqlDate(item.created);
                const now  = new Date();
                now.setDate(now.getDate() - 1);

                return date.getFullYear() === now.getFullYear() && date.getMonth()
                    === now.getMonth() && date.getDate() === now.getDate();
            });
        }

        mounted() {
            StoreLoader.wait(this.$store, ()=> this.update());
        }

        async update() {
            API.users.list().then(users => {
                this.items = users.list.filter(user => parseInt(user.group.group_id) === 1);
                this.specs = {0: [0, 0, 0], 1: [0, 0, 0], 2: [0, 0, 0], 3: [0, 0, 0]};
                this.items.forEach((item)=>{
                    this.specs[item.facultyId][parseInt(item.studyBase) -1]+=1;
                });
            }).catch(e => this.$bvToast.toast(e, {title: "Ошибка"}));
        }
    }
</script>

<style scoped>
</style>
