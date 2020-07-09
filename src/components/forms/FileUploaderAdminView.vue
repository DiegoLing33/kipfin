<template>
    <div>
        <b-modal size="lg" :busy="busy" cancel-title="Отмена" @ok="send" ok-title="Загрузить выбранные файлы"
                 :ok-disabled="!ready" title="Загрузка файлов" id="file-load"
        >
            <file-field @change="onFilesChanged" class="mt-2" :props="fileField"></file-field>
            <file-field @change="onFilesChanged2" class="mt-2" :props="fileField2"></file-field>
        </b-modal>
        <b-button v-b-modal:file-load squared variant="info" block>
            <b-icon-plus-circle class="float-left"/>
            Добавить файлы
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import SelectField from "@/components/fields/SelectField.vue";
    import {SelectFieldProps} from "@/components/fields/SelectFieldI";
    import {FieldType} from "@/components/fields/Field";
    import FileField from "@/components/fields/FileField.vue";
    import {FileFieldProps} from "@/components/fields/FileFieldI";
    import API from "@/api/API";
    import KFUser from "@/client/KFUser";

    @Component({
        components: {FileField, SelectField}
    })
    export default class FileUploaderAdminView extends Vue {
        @Prop() user!: KFUser;
        private busy = false;
        private ready = false;

        private selectionField: SelectFieldProps = {
            type: FieldType.SELECT,
            name: "type",
            placeholder: "Тип файлов",
            title: "Выберите тип файлов, который Вы будете загружать:",
            options: [
                {value: "", text: "-- Выберите тип файла --"},
                {value: "passport", text: "Пасспорт"},
                {value: "attestat", text: "Аттестат"},
                {value: "student-photo", text: "Фото абитуриента"},
                {value: "ach", text: "Достижения"},
                {value: "mothercapital", text: "Материнский капитал"},
                {value: "agree", text: "Заявление"},
                {value: "notify", text: "Уведомление"},
                {value: "other", text: "Другое"},
            ]
        };
        private fileField: FileFieldProps = {
            type: FieldType.FILE,
            name: "files",
            placeholder: "ЗАЯВЛЕНИЕ",
            title: "Выберите файлы заявления",
            multiply: true,
            accept: this.$store.getters.isAdmin ? "*" : "image/jpeg"
        };
        private fileField2: FileFieldProps = {
            type: FieldType.FILE,
            name: "files",
            placeholder: "УВЕДОМЛЕНИЕ",
            title: "Выберите файлы уведомления",
            multiply: true,
            accept: this.$store.getters.isAdmin ? "*" : "image/jpeg"
        };
        private selectedFiles: Blob[] = [];
        private selectedFiles2: Blob[] = [];


        private onFilesChanged(files: Blob[]) {
            this.selectedFiles = files;
            this.testLoader();
        }

        private onFilesChanged2(files: Blob[]) {
            this.selectedFiles2 = files;
            this.testLoader();
        }

        private testLoader() {
            this.ready = this.selectedFiles !== null &&
                this.selectedFiles.length > 0 && this.selectedFiles2 !== null &&
                this.selectedFiles2.length > 0;
        }

        private async send() {
            if (this.ready) {
                this.busy = true;
                await this.$transaction(this, async () => {
                    await API.files.uploadX(this.selectedFiles, "agree", this.user.userId);
                    await API.files.uploadX(this.selectedFiles2, "notify", this.user.userId);
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