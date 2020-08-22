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
    import StoreLoader from "@/app/client/StoreLoader";
    import SelectField from "@/components/forms/fields/SelectField.vue";
    import FormFileInput from "@/components/forms/form/FormFileInput.vue";
    import FileUploaderView from "@/components/forms/FileUploaderView.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import DocumentsGridView from "@/components/documents/DocumentsGridView.vue";
    import KFDocument from "@/app/client/KFDocument";
    import CountedString from "@/ling/support/CountedString";
    import GuideAdmissionDocuments from "@/components/guides/GuideAdmissionDocuments.vue";

    @Component({
        components: {
            GuideAdmissionDocuments,
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