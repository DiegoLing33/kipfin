<template>
    <div>
        <li-modal ref="modal" :visible="modal" title="Загрузка файлов">
            <select-field :no-state="true" @change="onTypeChanged" :props="selectionField"></select-field>
            <file-field :disabled="disableUploading" :no-state="true" @change="onFilesChanged" class="mt-2" :props="fileField"></file-field>
            <template v-slot:footer>
                <b-button block :disabled="!ready" variant="primary" @click="send">Загрузить выбранные файлы</b-button>
            </template>
        </li-modal>
        <b-button @click="$refs['modal'].show()" variant="primary">
            <b-icon-plus-circle/>
            Добавить файлы
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import SelectField from "@/components/fields/SelectField.vue";
    import {SelectFieldProps} from "@/components/fields/SelectFieldI";
    import {FieldType} from "@/components/fields/Field";
    import FileField from "@/components/fields/FileField.vue";
    import {FileFieldProps} from "@/components/fields/FileFieldI";
    import API from "@/api/API";
    import LiModal from "@/ling/components/LiModal.vue";

    @Component({
        components: {LiModal, FileField, SelectField}
    })
    export default class FileUploaderView extends Vue {
        private busy = false;
        private ready = false;
        private disableUploading = true;
        private modal = false;

        private selectionField: SelectFieldProps = {
            type: FieldType.SELECT,
            name: "type",
            placeholder: "Тип файлов",
            options: [
                {value: "", text: "-- Выберите тип файла --"},
                {value: "passport", text: "Пасспорт"},
                {value: "attestat", text: "Аттестат"},
                {value: "student-photo", text: "Фото абитуриента"},
                {value: "ach", text: "Достижения"},
                {value: "mothercapital", text: "Материнский капитал"},
                {value: "agree", text: "Заявление"},
                {value: "notify", text: "Уведомление"},
                {value: "check", text: "Чек об оплате"},
                {value: "other", text: "Другое"},
            ]
        };
        private fileField: FileFieldProps = {
            type: FieldType.FILE,
            name: "files",
            placeholder: "Выберите файлы...",
            multiply: true,
            accept: this.$store.getters.isAdmin ? "*" : "image/jpeg"
        };
        private selectedFiles: Blob[] = [];
        private selectedType = "";

        private onTypeChanged(type: string) {
            this.selectedType = type;
            this.disableUploading = type === '';
            this.testLoader();
        }

        private onFilesChanged(files: Blob[]) {
            this.selectedFiles = files;
            this.testLoader();
        }

        private testLoader() {
            this.ready = this.selectedFiles !== null &&
                this.selectedFiles.length > 0 && this.selectedType !== "";
        }

        private async send() {
            if (this.ready) {
                this.busy = true;
                await this.$transaction(this, async () => {
                    await API.files.upload(this.selectedFiles, this.selectedType, this.selectedType === "passport");
                    window.location.reload();
                });
                this.busy = false;
            } else {
                this.$bvToast.toast("Файлы для загрузки не выбраны!", {title: "Что-то не так"});
            }
        }
    }
</script>

<style scoped>
</style>