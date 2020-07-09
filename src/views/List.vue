<template>
    <b-container style="display: none">
        <b-card header="Рейтинг абитуриентов 2020">
            <h4>Специальность</h4>
            <b-form-group>
                <b-form-radio v-model="specbox" value="1">
                    09.02.07 Информационные системы и программирование
                </b-form-radio>
                <b-form-radio v-model="specbox" value="2">
                    09.02.03 Программирование в компьютерных системах
                </b-form-radio>
                <b-form-radio v-model="specbox" value="3">
                    10.02.05 Обеспечение информационной безопасности автоматизированных систем
                </b-form-radio>
            </b-form-group>

            <h4>Основа обучения</h4>
            <b-form-group>
                <b-form-radio v-model="base" value="1">
                    Бюджет
                </b-form-radio>
                <b-form-radio v-model="base" value="2">
                    Договор
                </b-form-radio>
            </b-form-group>

            <h4>Уведомление</h4>
            <b-form-group>
                <b-form-radio v-model="notify" value="1">Да</b-form-radio>
                <b-form-radio v-model="notify" value="2">Нет</b-form-radio>
                <b-form-radio v-model="notify" value="3">Не важно</b-form-radio>
            </b-form-group>

            <b-button variant="primary" @click="update()" class="my-3">Обновить</b-button>
            <b-table :items="items" :fields="fields" show-empty bordered striped empty-text="Студентов не найдено">
                <template v-slot:cell(notified)="row">
                    {{$app.yesNo[row.item.notified]}}
                </template>
            </b-table>
        </b-card>
    </b-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import User from "@/app/User";
    import API from "@/api/API";

    @Component
    export default class List extends Vue {
        private fields =  [
            {label: "Позиция", key: "index"},
            {label: "Абитуриент", key: "name"},
            {label: "Средний Балл", key: "schoolValue"},
            {label: "Специальность", key: "faculty"},
            {label: "Основа", key: "base"},
            {label: "Уведомление", key: "notified"},
            {label: "Дата", key: "created"}
        ];
        private items = [];

        private specbox = "1";
        private base = "1";
        private notify = "3";

        mounted(){
            // this.update();
            window.location.href = 'http://lists4priemka.fa.ru/listabits.aspx?fl=12&tl=спо&le=СПО';
        }

        private update(){
            API.request("admission.rating", {
                facultyId: this.specbox,
                base: this.base,
                notify: this.notify,
            }).then(res => {
               this.items = res.list.map((v: any)=>{
                   v.faculty = User.specializations[v.facultyId];
                   v.base = User.base[v.studyBase];
                   return v;
               });
            });
        }

        @Watch("specbox")
        @Watch("base")
        @Watch("notify")
        specboxChanged(){
            this.update();
        }

        getStudents(){
            return
        }
    }
</script>

<style scoped>
</style>
