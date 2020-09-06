<template>
    <div>
        <b-modal size="lg" :busy="busy" cancel-title="Отмена" @ok="send" ok-title="Загрузить выбранные файлы"
                 title="Загрузка файлов" id="file-load"
        >
            <file-field @change="onFilesChanged" class="mt-2" :props="fileField"></file-field>
            <file-field @change="onFilesChanged2" class="mt-2" :props="fileField2"></file-field>
            <file-field @change="onFilesChanged3" class="mt-2" :props="fileField3"></file-field>
            <file-field @change="onFilesChanged4" class="mt-2" :props="fileField4"></file-field>
        </b-modal>
        <b-button v-b-modal:file-load squared variant="info" block>
            <b-icon-plus-circle class="float-left"/>
            Добавить файлы
        </b-button>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import SelectField from "@/core/Components/forms/fields/SelectField.vue";
import {SelectFieldProps} from "@/core/Components/forms/fields/SelectFieldI";
import {FieldType} from "@/core/Components/forms/fields/Field";
import FileField from "@/core/Components/forms/fields/FileField.vue";
import {FileFieldProps} from "@/core/Components/forms/fields/FileFieldI";
import API from "@/core/app/api/API";
import KFUser from "@/modules/Users/Common/KFUser";

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
    private fileField3: FileFieldProps = {
        type: FieldType.FILE,
        name: "files",
        placeholder: "ЗАЯВЛЕНИЕ ОБ ОТКАЗЕ",
        title: "Выберите файлы заявления",
        multiply: true,
        accept: this.$store.getters.isAdmin ? "*" : "image/jpeg"
    };
    private fileField4: FileFieldProps = {
        type: FieldType.FILE,
        name: "files",
        placeholder: "ДОГОВОР",
        title: "Выберите файлы договора",
        multiply: true,
        accept: this.$store.getters.isAdmin ? "*" : "image/jpeg"
    };
    private selectedFiles: Blob[] = [];
    private selectedFiles2: Blob[] = [];
    private selectedFiles3: Blob[] = [];
    private selectedFiles4: Blob[] = [];


    private onFilesChanged(files: Blob[]) {
        this.selectedFiles = files;
        this.testLoader();
    }

    private onFilesChanged2(files: Blob[]) {
        this.selectedFiles2 = files;
        this.testLoader();
    }

    private onFilesChanged3(files: Blob[]) {
        this.selectedFiles3 = files;
        this.testLoader();
    }

    private onFilesChanged4(files: Blob[]) {
        this.selectedFiles4 = files;
        this.testLoader();
    }

    private testLoader() {
        this.ready = this.selectedFiles !== null &&
            this.selectedFiles.length > 0 && this.selectedFiles2 !== null &&
            this.selectedFiles2.length > 0;
    }

    private async send() {
        await this.$transaction(async () => {
            if (this.selectedFiles && this.selectedFiles.length > 0)
                await API.files.uploadX(this.selectedFiles, "agree", this.user.userId);

            if (this.selectedFiles2 && this.selectedFiles2.length > 0)
                await API.files.uploadX(this.selectedFiles2, "notify", this.user.userId);

            if (this.selectedFiles3 && this.selectedFiles3.length > 0)
                await API.files.uploadX(this.selectedFiles3, "disagree", this.user.userId);

            if (this.selectedFiles4 && this.selectedFiles4.length > 0)
                await API.files.uploadX(this.selectedFiles4, "payment", this.user.userId);
            window.location.reload();
        });
    }
}
</script>

<style scoped>
</style>