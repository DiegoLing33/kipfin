<template>
    <div class="view-ProfileBoardTab">
        <b-alert variant="warning" :show="true" class="mb-3">
            <h4>Предзачисление!</h4>
            <p>
                Доступен список предзачисления абитуриентов на бюджетную основу, он формируется только среди
                подавших
                заявление и уведомление.
                Если Вы подписали заявление и уведомление, но не увидели себя в данном списке, необходимо
                незамедлительно
                связаться с приемной комиссией.
                Желаем всем удачи!
            </p>
            <p>
                <b-button
                        variant="success"
                        target="_blank"
                        href="http://lists4priemka.fa.ru/enrollment.aspx?fl=12&tl=спо&le=СПО">Перейти к списку
                </b-button>
            </p>
        </b-alert>
        <b-alert variant="warning" :show="true" class="mb-3">
            <h4>Уважаемые абитуриенты!</h4>
            <p>
                Для зачисления в Колледж информатики и программирования на бюджетную основу обучения Вам
                необходимо <b>загрузить
                уведомление в личный кабинет абитуриента</b> (к ранее поданному заявлению) не позднее 17:00 25
                августа!
            </p>
        </b-alert>
        <b-alert variant="danger" :show="true">
            <h4>Внимание!</h4>
            <p>
                Места на обучение <b>по договору</b> (включая бюджет/договор) закончились! Уведомления,
                отправленные после
                21.07.2020 23:59, не будут приняты! Для получение подробностей звоните в приемную комиссию.
            </p>
            <hr/>
            <p>
                Прием документов <b>на бюджетную основу</b> продолжается!
            </p>
        </b-alert>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    /**
     *  The ProfileBoardTab component.
     *  @author diego
     *  @created 21.08.2020 00:08
     */
    @Component
    export default class ProfileBoardTab extends Vue {

    }
</script>

<style scoped>

</style>