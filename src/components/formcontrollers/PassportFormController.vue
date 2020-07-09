<template>
    <div class="view-PassportFormController">
        <b-card class="my-3" header="Гражданство">
            <b-form-checkbox
                    id="from-rf"
                    v-model="statusRF"
                    name="checkbox-1"
                    value="yes"
                    unchecked-value="no"
            >
                Гражданство РФ
            </b-form-checkbox>
            <b-form-checkbox
                    class="mt-3"
                    v-if="statusRF === 'no'"
                    id="from-noprf"
                    v-model="noPassport"
                    name="checkbox-5"
                    value="yes"
                    unchecked-value="no"
            >
                У меня еще нет паспорта
            </b-form-checkbox>
        </b-card>
        <form-elements-controller
                key="rf"
                v-if="statusRF === 'yes'"
                @changed="handleDoneB"
                title="Паспортные данные"
                :items="itemsRF"
        >
            <b-alert show="show">
                <b>Заполните паспортные данные очень внимательно!</b><br />
                В целях безопасности Вы сможете изменить их только с помощью технического секретаря
            </b-alert>

        </form-elements-controller>
        <form-elements-controller
                key="noprf"
                v-else-if="noPassport === 'yes'"
                @changed="handleDoneC"
                title="Сведетельство о рождении"
                :items="itemsNoRFNoPassport"
        >
            <slot></slot>

        </form-elements-controller>
        <form-elements-controller
                v-else
                key="nrf"
                @changed="handleDoneA"
                title="Паспортные данные"
                :items="itemsNoRF"
        >
            <b-alert show="show">
                <b>Заполните паспортные данные очень внимательно!</b><br />
                В целях безопасности Вы сможете изменить их только с помощью технического секретаря
            </b-alert>

        </form-elements-controller>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import FormElementsController from "@/components/FormElementsController.vue";
    import {FormElement, FormElementTye} from "@/app/FormElements";
    import FormTester from "@/app/FormTester";

    @Component({
        components: {FormElementsController}
    })
    export default class PassportFormController extends Vue {
        private statusRF   = "yes";
        private noPassport = "no";

        private itemsNoRF: FormElement[] = [
            {
                name:        "passportRegion",
                type:        FormElementTye.TEXT,
                placeholder: "Введите Ваше гражданство",
                tester:      FormTester.testLength(3),
                description: "Введите данные о Вашем гражданстве",
            },
            {
                name:        "passportWho",
                type:        FormElementTye.TEXTAREA,
                placeholder: "Введите данные паспорта",
                tester:      FormTester.testLength(15),
                description: "Введите серию паспорта, номер, кем выдан и др. необходимую информацию, согласно Вашему региону",
            }, {
                name:        "passportBorn",
                type:        FormElementTye.TEXT,
                placeholder: "Место рождения",
                tester:      FormTester.testNotNull,
                description: "Введите место рождения как указано в паспорте",
            },
        ];

        private itemsNoRFNoPassport: FormElement[] = [
            {
                name:        "passportRegion",
                type:        FormElementTye.TEXT,
                placeholder: "Введите Ваше гражданство",
                tester:      FormTester.testLength(3),
                description: "Введите данные о Вашем гражданстве",
            },
            {
                name:        "passportWho",
                type:        FormElementTye.TEXTAREA,
                placeholder: "Введите данные сведетельства о рождении",
                tester:      FormTester.testLength(15),
                description: "Введите серию и номер сведетельства о рождении и другие необходимые в Вашем регионе данные",
            }, {
                name:        "passportBorn",
                type:        FormElementTye.TEXT,
                placeholder: "Место рождения",
                tester:      FormTester.testNotNull,
                description: "Введите место рождения как указано в сведетельстве о рождении",
            },
        ];

        private itemsRF: FormElement[] = [
            {
                name:        "passport",
                type:        FormElementTye.TEXT,
                placeholder: "Введите серию и номер паспорта",
                tester:      FormTester.testPassport,
                description: "Введите серию и номер паспорта. Например: 44 55 123344",
            },
            {
                name:        "passportWho",
                type:        FormElementTye.TEXT,
                placeholder: "Кем выдан",
                tester:      FormTester.testLength(10),
                description: "Введите кем выдан пасспорт. Например: ГУ МВД РОССИИ Г. МОСКВЫ ПО РАЙОНУ ...",
            },
            {
                name:        "passportCode",
                type:        FormElementTye.TEXT,
                placeholder: "Код подразделения",
                tester:      FormTester.testLength(6),
                description: "Введите код подразделения. Например: 770-017",
            },
            {
                name:        "passportDate",
                type:        FormElementTye.DATE,
                placeholder: "Дата выдачи паспорта",
                tester:      FormTester.testNotNull,
                description: "Введите дату выдачи паспорта",
            },
            {
                name:        "passportBorn",
                type:        FormElementTye.TEXT,
                placeholder: "Место рождения",
                tester:      FormTester.testNotNull,
                description: "Введите место рождения как в паспорте. Например: ГОР. МОСКВА",
            },
            {
                name:        "passportRegistration",
                type:        FormElementTye.TEXT,
                placeholder: "Регистрация",
                tester:      FormTester.testLength(7),
                description: "Введите полный адрес регистрации, например: Россия, г. Москва, ул. Барышиха, д. 16, к. 3 кв. 0",
            },
        ];

        private handleDoneA(result: { done: boolean; values: any }) {
            this.$emit("changed", result);
        }

        private handleDoneB(result: { done: boolean; values: any }) {
            this.$emit("changed", result);
        }

        private handleDoneC(result: { done: boolean; values: any }) {
            result.values.passportWho = "!" + result.values.passportWho;
            this.$emit("changed", result);
        }
    }
</script>

<style scoped>
</style>
