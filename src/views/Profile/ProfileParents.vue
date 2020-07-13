<template>
    <user-content
            title="Законные представители"
            description="Вы можете добавить законных представителей. Когда в приемной комиссии возникают вопросы связанные с документами, в первую очередь мы будем звонить законному представителю"
            :overlay="busy">
        <b-table
                bordered
                show-empty="show-empty"
                empty-text="Законные представители не добавлены"
                :fields="tableFields"
                :items="tableItems"
        >
            <template v-slot:cell(type)="row">
                {{$app.parentName[row.item.type]}}
            </template>
            <template v-slot:cell(mail)="row">
                <div style="word-break: break-all">
                    {{row.item.mail}}
                </div>
            </template>
            <template v-slot:cell(utils)="row">
                <b-button size="sm" variant="danger" @click="remove(row.item.parent_id)">Удалить</b-button>
            </template>
        </b-table>
        <b-button v-b-toggle.add-parent variant="primary">Добавить законного представителя</b-button>
        <b-collapse id="add-parent">
            <hr class="my-3"/>
            <form-elements-controller
                    :items="formItems"
                    title="Форма добавления законного представителя"
                    button="Отправить данные"
                    @done="send"
            >
            </form-elements-controller>
        </b-collapse>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import FormElementsController from "@/components/form/FormElementsController.vue";
    import {FormElementTye} from "@/app/FormElements";
    import FormTester from "@/app/FormTester";
    import API from "@/api/API";
    import StoreLoader from "@/client/StoreLoader";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent, FormElementsController}
    })
    export default class ProfileParents extends Vue {
        private tableFields = [
            {label: "ФИО", key: "name"},
            {label: "Представитель", key: "type"},
            {label: "Телефон", key: "phone"},
            {label: "Mail", key: "mail"},
            {label: "Место работы", key: "work"},
            {label: "", key: "utils"},
        ];
        private tableItems = [];
        private busy = false;

        private options = [
            {text: "Мать", value: 0},
            {text: "Отец", value: 1},
            {text: "Бабушка", value: 2},
            {text: "Дедушка", value: 3},
            {text: "Другое", value: 4},
        ];

        private formItems = [
            {
                name: "name",
                description: "Введите полное имя законного представителя",
                type: FormElementTye.TEXT,
                placeholder: "Имя законного представителя",
                tester: FormTester.testLength(4),
            },
            {
                name: "phone",
                description: "Введите номер телефона законного представителя",
                type: FormElementTye.TEXT,
                placeholder: "Номер телефона законного представителя",
                tester: FormTester.testPhone,
            },
            {
                name: "type",
                description: "Кем для Вас приходится законный представитель",
                type: FormElementTye.SELECTION,
                tester: FormTester.testNotNull,
                options: this.options,
            },
            {
                name: "mail",
                description: "Введите электронную почту законного представителя",
                type: FormElementTye.TEXT,
                placeholder: "Email законного представителя",
                tester: FormTester.testMail,
            },
            {
                name: "work",
                description: "Введите место работы законного представителя или \"-\"",
                type: FormElementTye.TEXTAREA,
                placeholder: "Место работы законного представителя",
                tester: FormTester.testLength(1),
            }
        ];


        private async send(result: { done: boolean; values: any }) {
            this.busy = true;
            try {

                await API.request("parents.add", {
                    name: result.values.name,
                    phone: result.values.phone,
                    mail: result.values.mail,
                    work: result.values.work,
                    type: result.values.type,
                });
                await this.update();
                window.location.reload();
            } catch (e) {
                this.$bvToast.toast(e, {title: "Ошибка"});
            }
            this.busy = false;
        }

        async mounted() {
            this.busy = true;
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        private async update() {
            this.busy = true;
            this.tableItems = (await API.request("parents.get")).list;
            this.busy = false;
        }

        private async remove(parentId: any) {
            this.busy = true;
            try {
                await API.request("parents.remove", {parentId});
                await this.update();
            } catch (e) {
                this.$bvToast.toast(e, {title: "Ошибка"});
            }
            this.busy = false;
        }
    }
</script>

<style scoped>
</style>
