<template>
    <b-card title="Готовность профиля">
        <div v-if="current < max && $store.getters.isAdmin">
            <b-progress :max="max" :variant="variant" :value="current"></b-progress>
            <small class="text-muted">
                Прогресс запонения Вашей анкеты
            </small>
        </div>
        <div v-else>
            <div v-if="user.raw.studentStatus === '0'">
                <h3>Почти всё.</h3>
                <p>
                    Отлично! Вы всё заполнили, теперь нажмите на зеленую кнопку ниже (Отправить анкету на обработку).
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '1'">
                <h3>Ожидание обработки.</h3>
                <p>
                    Самое сложное позади - Вы уже ввели все необходимые данные.
                    Мы рассмотрим их в ближайшее время и обновим Ваш статус, а пока Вы можете заполнить
                    законных представителей.
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '80'">
                <h3>Конкурс.</h3>
                <p>
                    Наступил самый сложный период поступления для каждого абитуриента - конкурс аттестатов. Следите за своим местом в рейтинге абитуриентов, мы желаем Вам удачи!
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '11'">
                <h3>Все готово</h3>
                <p>
                    Анкета успешно заполнена, и мы работаем над ее переносом в базы данных Финансового университета.
                    Через какое-то время, мы отправим Вам заявление и сообщим об этом чуть ниже (блок: Состояние
                    абитуриента).
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '14'">
                <h3>Ожидание оплаты</h3>
                <p>
                    Прикрепите скан копию об оплате в личном кабинете. Раздел "Документы", тип файла - "Чек об оплате".
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '50'">
                <h3>Мы почти закончили.</h3>
                <p>
                    Ваши данные перенесены в базы Финансового университетат. Ожидайте загрузки заявления и уведомления в личный кабинет.
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '60'">
                <h3>Ваше заявление загружено!</h3>
                <p>
                    Заявление загружено. Перейдите в раздел "Документы" и загрузите файлы с зеленой иконкой (заявление, уведомление). Подпишите. Загрузите скан-копию в формате JPG/JPEG на портал.
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '200'">
                <h3>Ой, что-то не так...</h3>
                <p>
                    Во время обработки Вашей анкеты мы обнаружили ошибку. Мы указали её в блоке снизу (состояние абитуриента). Исправьте недочет и нажмите на кнопку "Отправить анкету на обработку" еще раз!.
                </p>
            </div>
            <div v-if="user.raw.studentStatus === '100'">
                <h3>Зачисленение.</h3>
                <p>
                    На этом всё. Спасибо за участие в приемной комиссии!
                </p>
            </div>
        </div>
        <template v-slot:footer v-if="reason !== ''">
            <b-alert variant="danger" :show="true" class="mt-3">
                Надо заполнить: <b>{{reason}}</b>
            </b-alert>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/modules/Users/Common/KFUser";
    import API from "@/core/app/api/API";

    @Component
    export default class ProfileProgressView extends Vue {
        @Prop() user!: KFUser;
        private max = 1;
        private current = 0;
        private variant = "primary";
        private reason = "";

        async infoTest() {
            return this.user.name !== "" &&
                this.user.lastname !== "" &&
                this.user.surname !== "" &&
                this.user.mail !== "" &&
                this.user.phone !== ""
        }

        async documentsTest() {
            return this.$store.getters.requiredDocuments.length === 0;
        }

        async passportTest() {
            return (await API.request("psp.my")).list.length > 0;
        }

        async schoolTest() {
            const raw = this.user.raw;
            const school = raw.school;
            return [
                school.schoolName,
                school.schoolValue,
                school.schoolDegreeCode,
                school.schoolAddress
            ].every(v => v !== null && v !== "");
        }

        async specializationTest() {
            const raw = this.user.raw;
            return raw.facultyId !== "" && raw.facultyId !== "0" &&
                raw.studyBase !== "" && raw.studyBase !== "0";
        }

        private tests: [() => Promise<boolean>, string][] = [
            [this.infoTest, "Общая информация"],
            [this.schoolTest, "Образование"],
            [this.specializationTest, "Специальность"],
            [this.documentsTest, "Документы"],
            [this.passportTest, "Паспортные данные"]
        ];

        mounted() {
            this.update();
            setInterval(() => {
                this.update();
            }, 1000 * 10);
        }

        async update() {
            let reason = "";
            let current = 0;
            this.variant = "primary";

            for (const test of this.tests) {
                const result = await test[0]();
                if (!result && reason === "") reason = test[1];
                if (result) current++;
            }
            if (this.current === this.max) this.variant = "success";
            this.max = this.tests.length;
            this.current = current;
            this.reason = reason;
        }


    }
</script>

<style scoped>
</style>