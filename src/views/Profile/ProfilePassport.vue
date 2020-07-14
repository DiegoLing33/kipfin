<template>
    <user-content
            title="Документы: Паспортные данные"
            description="Здесь находится информация о Ваших паспортных данных"
            :overlay="busy"
    >
        <passport-view @remove="remove" v-for="psp of myPSPs" :key="psp['PSP_ID']" :psp="psp"></passport-view>

        <b-alert variant="info" show>
            <b>Что делать если макет не подходит под мое гражданство или у меня нет паспорта?</b>
            <p>
                1. Если для Вашего гражданства не подходит макет в форме добавления, заполните его в свободной форме.
                Обязательные поля, которых нет в Вашем регионе, заполните символом "-" (тире). В разделе
                <b>Документы</b>, далее, Вам будет
                необходимо прикрепить скан-копию паспорта.
            </p>
            <p>
                2. Если Ваше гражданство "Украина" или другое, в котором паспорт Выдают в 16 лет, не заполняйте данную
                страницу. Прикрепите копию
                свидетельства о рождении в разделе <b>Документы</b> и обазятельно сообщите нам об этом, используя чат с
                приемной комиссией или
                номер горячей линии!
            </p>
        </b-alert>
        <fields-controller class="mt-3" :fields="fields" @send="send">
            <template v-slot:header>
                <h4 class="mt-3">Форма добавления паспорта</h4>
                <select-field v-model="PSP_G" @change="onSetG" class="mb-3" :props="selectBoxField"></select-field>
                <radio-field v-model="PSP_TYPE" @change="onSetT" :props="radioProps"></radio-field>
            </template>
        </fields-controller>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/app/api/API";
    import FieldsController from "@/components/fields/FieldsController.vue";
    import {Field, FieldTester, FieldType} from "@/components/fields/Field";
    import SelectField from "@/components/fields/SelectField.vue";
    import {CitizenshipOptions} from "@/app/data/Citizenship";
    import RadioField from "@/components/fields/RadioField.vue";
    import {SelectFieldProps} from "@/components/fields/SelectFieldI";
    import {Dict} from "@/app/types";
    import PassportView from "@/components/profile/PassportView.vue";
    import StoreLoader from "@/app/client/StoreLoader";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent, PassportView, RadioField, SelectField, FieldsController}
    })
    export default class ProfilePassport extends Vue {

        private myPSPs = [];
        private busy = false;

        private radioProps: SelectFieldProps = {
            pre: "ABITURIENT",
            name: "PSP_TYPE",
            placeholder: '',
            title: 'Тип паспорта',
            options: [{text: 'Паспорт абитуриента', value: 'ABITURIENT'}, {
                text: 'Паспорт платильщика',
                value: 'PAYER'
            }],
            description: "Выберите тип заполняемого документа"
        };

        private selectBoxField: Field = {
            name: 'citizenship',
            placeholder: 'Выберите гражданство:',
            options: CitizenshipOptions,
            title: "Выберите гражданство",
            pre: "643|Россия",
            description: "Выберите гражданство"
        };

        private fields: Field[] = [
            {
                name: 'PSP_A',
                placeholder: 'Введите серию и номер паспорта',
                title: 'Серия и номер паспорта:',
                tester: FieldTester.length(2),
                description: "Введите серию и номер паспорта, например: 45 12 882222",
            },
            {
                design: 'col-md-6',
                name: 'PSP_B',
                placeholder: 'Введите кем выдан паспорт',
                title: 'Кем выдан паспорт:',
                tester: FieldTester.length(6),
                description: "Введите кем выдан паспорт, например: ГУ МВД РОССИИ Г. МОСКВЫ",
            },
            {
                design: 'col-md-6',
                name: 'PSP_C',
                placeholder: 'Введите код подразделения',
                title: 'Код подразделения:',
                tester: FieldTester.length(2),
                description: "Введите код подразделения, например: 771-111",
            },
            {
                name: 'PSP_E',
                type: FieldType.DATE,
                placeholder: 'Выберите дату выдачи паспорта',
                title: 'Дата выдачи паспорта:',
                tester: FieldTester.notNull,
                description: "Выберите дату выдачи паспорта",
            },
            {
                name: 'PSP_D',
                placeholder: 'Введите место рождения (как в паспорте)',
                title: 'Место рождения:',
                tester: FieldTester.length(5),
                description: "Введите место рождения (как в паспорте), например: ГОР. МОСКВА",
                design: 'col-md-6',
            },
            {
                name: 'PSP_H',
                type: FieldType.DATE,
                placeholder: 'Введите дату рождения',
                title: 'Дата рождения:',
                max: new Date(new Date().getFullYear() - 13, 1, 1),
                tester: FieldTester.notNull,
                description: "Выберите дату рождения",
                design: 'col-md-6',
            },
            {
                design: 'col-md-6',
                name: 'PSP_F',
                placeholder: 'Введите данные регистрации',
                title: 'Регистрация:',
                tester: FieldTester.length(5),
                description: "Введите данные о регистрации (как в паспорте), например: Россия, г. Москва, ул. Барышиха, д. 16, к. 3 кв. 2",
            },
            {
                design: 'col-md-6',
                name: 'PSP_ADDR',
                placeholder: 'Введите данные о фактическом проживании',
                title: 'Место фактического проживания:',
                tester: FieldTester.length(5),
                description: "Введите данные о месте файтического проживания, например: Россия, г. Москва, ул. Барышиха, д. 16, к. 3 кв. 2",
            }
        ];

        private PSP_TYPE = "ABITURIENT";
        private PSP_G = "643|Россия";


        onSetG(val: any) {
            this.PSP_G = val;
        }

        onSetT(val: any) {
            this.PSP_TYPE = val;
        }

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        /**
         * Updates the data
         */
        private async update() {
            this.busy = true;
            await this.$transaction(this, async () => {
                const result = await API.request("psp.my");
                this.myPSPs = result.list;
                // this.$store.commit("setCurrentUser", false);
            });
            this.busy = false;
        }

        private async send(values: Dict<unknown>) {
            this.busy = true;
            values["PSP_TYPE"] = this.PSP_TYPE;
            values["PSP_G"] = this.PSP_G;
            await this.$transaction(this, async () => {
                await API.request("psp.add", values);
                await this.update();
            });
            this.busy = false;
        }

        private async remove(pspId: unknown) {
            this.busy = true;
            await this.$transaction(this, async () => {
                await API.request("psp.remove", {pspId});
                await this.update();
            });
            this.busy = false;
        }
    }
</script>

<style scoped lang="scss">

</style>
