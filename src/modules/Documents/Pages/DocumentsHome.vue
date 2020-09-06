<template>
    <user-content
            title="Документы"
            description="Хранилище документов"
    >
        <guide-admission-documents/>
        <file-uploader-view @updated="update" class="mb-2"/>
        <documents-grid-view @updated="update" :documents="documents"/>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/core/app/client/StoreLoader";
    import SelectField from "@/core/Components/forms/fields/SelectField.vue";
    import FileUploaderView from "@/modules/Documents/Components/FileUploaderView.vue";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import DocumentsGridView from "@/modules/Documents/Components/DocumentsGridView.vue";
    import KFDocument from "@/modules/Documents/Common/KFDocument";
    import CountedString from "@/core/Common/CountedString";
    import GuideAdmissionDocuments from "@/modules/Admission/Components/guides/GuideAdmissionDocuments.vue";

    @Component({
        components: {
            GuideAdmissionDocuments,
            DocumentsGridView,
            UserContent, FileUploaderView, SelectField
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