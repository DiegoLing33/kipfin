<template>
    <user-container
            title="Статистика приема"
            description="Данные по базе"
    >
        <radio-field
                :props="sourceSelectionProps" @change="onChange">
        </radio-field>

        <hr/>
        <h3>Специальности</h3>
        <div v-for="(spec, key) in $app.specialization" :key="key">
            <template v-if="key !== '0'">
                <b-table-simple bordered :caption-top="true">
                    <caption>{{spec}}</caption>
                    <b-thead>
                        <tr>
                            <td>
                                Основа
                            </td>
                            <td>
                                Кол-во анкет
                            </td>
                        </tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr>
                            <b-td style="width: 30%">
                                Бюджет
                            </b-td>
                            <b-td>
                                {{specs[key].free.length}}
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td>
                                Договор
                            </b-td>
                            <b-td>
                                {{specs[key].pay.length}}
                            </b-td>
                        </b-tr>
                        <b-tr>
                            <b-td>
                                Бюджет / Договор
                            </b-td>
                            <b-td>
                                {{specs[key].mind.length}}
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </template>
        </div>
    </user-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserContainer from "@/views/UserContainer.vue";
    import RadioField from "@/components/fields/RadioField.vue";
    import {SelectFieldProps} from "@/components/fields/SelectFieldI";
    import APIUsers, {APIUserResults} from "@/api/APIUsers";
    import {Dict} from "@/app/types";
    import API from "@/api/API";

    interface OneSpec {
        pay: APIUserResults[];
        free: APIUserResults[];
        mind: APIUserResults[];
    }

    @Component({
        components: {RadioField, UserContainer}
    })
    export default class AdminStat extends Vue {
        private sourceSelectionProps: SelectFieldProps = {
            placeholder: '...',
            name: "sourceSelection",
            description: "Выберите источник данных",
            options: [
                {value: "all", text: "Учитывать все данные, которые получены приемной комиссией"},
                {value: "moderated", text: "Учитывать только данные, которые уже обработаны"},
                {value: "clear", text: "Учитывать только данные, которые в 1С"},
            ]
        };

        private adm(source: any){
            return {
                specId: source["spec_id"],
                paid: parseInt(source["paid_count"]),
                free: parseInt(source["free_count"]),
            }
        }

        private sourceData: APIUserResults[] = [];
        private specs: Dict<OneSpec> = {
            "1": {pay: [], free: [], mind: []},
            "2": {pay: [], free: [], mind: []},
            "3": {pay: [], free: [], mind: []},
        };

        private mids = {
            "1": {pay: 0, free: 0, mind: 0},
            "2": {pay: 0, free: 0, mind: 0},
            "3": {pay: 0, free: 0, mind: 0},
        };

        private accessUser(user: APIUserResults) {
            return user;
        }

        onChange(v: string) {
            this.specs = {
                "1": {pay: [], free: [], mind: []},
                "2": {pay: [], free: [], mind: []},
                "3": {pay: [], free: [], mind: []},
            };
            this.mids = {
                "1": {pay: 0, free: 0, mind: 0},
                "2": {pay: 0, free: 0, mind: 0},
                "3": {pay: 0, free: 0, mind: 0},
            };
            API.request("admission.plan").then(value => {

                const rrr: Dict<unknown> = {};
                value.list.map(this.adm).forEach((v: any) => {
                   rrr[v.specId] = v;
                });

                API.users.list().then(users => {
                    for (const user of users.list) {
                        if (user.group.group_id !== '1' || user.facultyId === '0') continue;
                        let flag = 'free';
                        if (user.studyBase === '2') flag = 'pay';
                        if (user.studyBase === '3') flag = 'mind';
                        (this.specs[user.facultyId] as any)[flag].push(this.accessUser(user));
                    }


                    Object.keys(this.specs).forEach(key => {
                        this.specs[key].free = this.specs[key].free.sort((a: APIUserResults, b: APIUserResults) => {
                            return parseFloat(a.school.schoolValue!.toString()) - parseFloat(b.school.schoolValue!.toString());
                        });
                        this.specs[key].pay = this.specs[key].pay.sort((a: APIUserResults, b: APIUserResults) => {
                            return parseFloat(a.school.schoolValue!.toString()) - parseFloat(b.school.schoolValue!.toString());
                        });
                        this.specs[key].mind = this.specs[key].mind.sort((a: APIUserResults, b: APIUserResults) => {
                            return parseFloat(a.school.schoolValue!.toString()) - parseFloat(b.school.schoolValue!.toString());
                        });
                    });
                });

            });
        }

    }
</script>

<style scoped>

</style>