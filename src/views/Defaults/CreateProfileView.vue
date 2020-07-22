<template>
        <b-overlay :show="busy">
            <b-card header="Регистрация">
                <header-lined
                        title="Имя абитуриента"
                        description="Давайте знакомиться!"
                        class="mb-3"
                />
                <b-row>
                    <b-col md="6" sm="12" class="mb-3">
                        <b-form-input
                                v-model="values.name"
                                :state="states.name"
                                placeholder="Имя"
                                @input="test"
                                trim
                        />
                    </b-col>
                    <b-col md="6" sm="12" class="mb-3">
                        <b-form-input
                                v-model="values.lastname"
                                :state="states.lastname"
                                placeholder="Фамилия"
                                @input="test"
                                trim
                        />
                    </b-col>
                    <b-col md="12" class="mb-3">
                        <b-form-input
                                v-model="values.surname"
                                :state="states.surname"
                                placeholder="Отчество"
                                @input="test"
                                trim
                        />
                        <small class="text-muted">Оставьте это поле пустым, если у Вас нет отчества</small>
                    </b-col>
                    <b-col md="12" class="mb-3">
                        <b-form-datepicker
                                v-model="values.birthday"
                                :state="states.birthday"
                                placeholder="Дата рождения абитуриента"
                                :max="new Date(2006, 2, 10)"
                                @input="test"
                        />
                    </b-col>
                    <b-col md="12" class="mb-3">
                        <b class="text-muted d-block mb-2">Пол абитуриента</b>
                        <b-form-radio-group
                                v-model="values.gender"
                                :state="states.gender"
                                @input="test"
                                :options="([{text: 'Мужской', value: 1}, {text: 'Женский', value: 2}])"
                        ></b-form-radio-group>
                    </b-col>
                </b-row>
                <header-lined
                        title="Данные для входа"
                        description="Контактные данные абитуриента и данные для входа"
                        class="mb-3"
                />
                <b-row>
                    <b-col md="6" sm="12" class="mb-3">
                        <b-form-input
                                v-model="values.mail"
                                :state="states.mail"
                                placeholder="E-mail абитуриента"
                                @input="test"
                                trim
                        />
                        <small>Укажите корректный адрес электронной почты</small>
                    </b-col>
                    <b-col md="6" sm="12" class="mb-3">
                        <b-form-input
                                v-model="values.phone"
                                :state="states.phone"
                                placeholder="Номер телефона абитуриента"
                                :formatter="$app.textFormatter.formatPhone"
                                @input="test"
                                trim
                        />
                        <small class="text-muted">Начните номер с кода города, например: +7 999 812-33-22</small>
                    </b-col>
                    <b-col md="12" class="mb-3">
                        <b-form-input
                                v-model="values.password"
                                :state="states.password"
                                type="password"
                                placeholder="Придумайте пароль"
                                @input="test"
                                trim
                        />
                        <small class="text-muted">
                            Пароль должен быть не короче 6 символов
                        </small>
                    </b-col>
                </b-row>
                <div class="mb-3 text-muted">
                    Нажимая кнопку <b>Создать личный кабинет</b>, Вы даете
                    <a href="/private.pdf" target="_blank">согласие на обработку своих персональных данных</a>
                </div>
                <b-button variant="success" @click="onSubmit">Создать личный кабинет</b-button>
                <li-modal name="errorCreateModal" :close-button="true" title="Ошибка" ref="errorModal">
                    <div class="text-danger text-center p-2">{{error}}</div>
                </li-modal>
            </b-card>
        </b-overlay>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HeaderLined from "@/components/theme/heading/HeaderLined.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import TextValidation from "@/ling/support/TextValidation";
    import {NameList, Nullable} from "@/ling/types/Common";
    import API from "@/app/api/API";

    /**
     *  The CreateProfileView component.
     *  @author diego
     *  @created 08.07.2020 20:36
     */
    @Component({
        components: {LiModal, HeaderLined}
    })
    export default class CreateProfileView extends Vue {
        private busy = false;
        private error = "";
        private values: NameList<Nullable<string>> = {
            name: null,
            lastname: null,
            surname: null,
            birthday: null,
            mail: null,
            phone: null,
            gender: null,
            password: null,
        }

        private states: NameList<Nullable<boolean>> = {
            name: null,
            lastname: null,
            surname: null,
            birthday: null,
            mail: null,
            phone: null,
            gender: null,
            password: null,
        }

        private validators: NameList<(v: string) => Nullable<boolean>> = {
            name: TextValidation.validationLength(2),
            lastname: TextValidation.validationLength(2),
            surname: TextValidation.validationLength(0),
            birthday: TextValidation.validateNull,
            mail: TextValidation.validateEmail,
            phone: TextValidation.validatePhone,
            gender: TextValidation.validateNull,
            password: TextValidation.validationLength(6),
        };

        private test() {
            for (const fieldName of Object.keys(this.values)) {
                if (this.values[fieldName] !== null && this.values[fieldName] !== "")
                    this.states[fieldName] =
                        this.validators[fieldName](this.values[fieldName] || "");
            }
        }

        /**
         * Shows the error modal
         */
        private showErrorModal(text: string) {
            this.error = text;
            this.busy = false;
            (this.$refs.errorModal as any).show();
            return false;
        }


        private async onSubmit() {
            this.busy = true;
            this.error = "";
            this.test();
            if (!TextValidation.validationLength(2)(this.values.name || ""))
                return this.showErrorModal("Имя не должно быть короче 2-х символов");
            if (!TextValidation.validationLength(2)(this.values.lastname || ""))
                return this.showErrorModal("Фамилия не должна быть короче 2-х символов");
            if (!TextValidation.validateNull(this.values.birthday))
                return this.showErrorModal("Укажите дату рождения");
            if (!TextValidation.validateNull(this.values.gender))
                return this.showErrorModal("Укажите пол");
            if (!TextValidation.validateEmail(this.values.mail || ""))
                return this.showErrorModal("Введите корректный адрес электронной почты");
            if (!TextValidation.validatePhone(this.values.phone || ""))
                return this.showErrorModal("Номер телефона должен начинаться с кода города, например: +7 999 849-22-11");
            if (!TextValidation.validationLength(6)(this.values.password || ""))
                return this.showErrorModal("Пароль должен быть не короче 6-и символов");
            await this.$transaction(async () => {
                await API.request("admission.createProfile", this.values);
                window.location.href = "/login";
            });
            this.busy = false;
        }
    }
</script>

<style scoped>

</style>