<template>
    <user-content
            title="Документы"
            description="Хранилище документов"
    >
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
        <file-uploader-view @updated="update" class="mb-2"/>
        <documents-grid-view @updated="update" :documents="documents"/>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/app/client/StoreLoader";
    import SelectField from "@/components/fields/SelectField.vue";
    import FormFileInput from "@/components/form/FormFileInput.vue";
    import FileUploaderView from "@/components/forms/FileUploaderView.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import DocumentsGridView from "@/components/documents/DocumentsGridView.vue";
    import KFDocument from "@/app/client/KFDocument";
    import CountedString from "@/ling/support/CountedString";

    @Component({
        components: {
            DocumentsGridView,
            UserContent, FileUploaderView, FormFileInput, SelectField
        }
    })
    export default class DocumentsHome extends Vue {
        private documents: KFDocument[] = [];

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update(null, null);
            });
        }

        async update(count: number|null, storage: string|null) {

            if (count !== null && storage !== null) {
                const fileTypeString = this.$app.fileTypes[storage] || storage;
                const loaded = CountedString.get(count, "загружен", "загружено", "загружено")

                this.$toast.open("Успешно " + loaded + " " + count + " " +
                    CountedString.get(count, "файл", "файлов", "файла") + ` (${fileTypeString})`);
            }
            await this.$store.getters.user.updateFiles();
            this.documents = KFDocument.fromList(this.$store.getters.user.getFiles());
        }
    }
</script>

<style scoped>

</style>