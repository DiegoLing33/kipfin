<template>
    <b-alert variant="warning" :show="true">
        <h4>Внимание!</h4>
        <p>Для того, чтобы подать заявление в Колледж информатики и программирования,
            Вам необходимо загрузить следующие данные:</p>
        <ol>
            <li>
                <b>Паспорт</b>. Главная страница (полный разговор) и страница с регистрацией (полный разворот)
            </li>
            <li>
                <b>Аттестат</b>. Должно быть <b>3 страницы</b>:
                <ol>
                    <li>Главная страница (полный разговор)</li>
                    <li>Лицевая страница приложения (полный разворот)</li>
                    <li>Обратная страница приложения (полный разворот)</li>
                </ol>
            </li>
            <li>
                <b>Фотография</b>. Фотография должна быть <b>на белом фоне</b>, лицо должно занимать 70% фото.
                Формат 3:4.
            </li>
        </ol>
        <hr/>
        <b>Все файлы должны быть в формате JPG/JPEG!</b>
    </b-alert>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class GuideAdmissionDocuments extends Vue {

}
</script>

<style scoped>

</style>