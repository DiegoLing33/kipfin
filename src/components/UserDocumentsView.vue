<template>
    <div>
        <div v-if="showTips">
            <div class="mb-3">
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
                            <b>Фотография</b>. Фотография должна быть <b>на белом фоне</b>, лицо должно занимать 70% фото. Формат 3:4.
                        </li>
                    </ol>
                    <hr />
                    <b>Все файлы должны быть в формате JPG/JPEG!</b>
                </b-alert>
            </div>
            <b-alert v-if="$store.getters.requiredDocuments.length > 0" show="show" variant="danger">
                <b>Необходимо загрузить следующие документы:</b>
                <ul>
                    <li v-for="item of $store.getters.requiredDocumentsNames" :key="(item+'_unsent')">
                        {{item}}
                    </li>
                </ul>
            </b-alert>
            <b-alert show="show" v-if="$store.getters.documentsStatus[0] === 'В обработке'" variant="info">
                Все необходимые документы загружены и находятся в обработке
            </b-alert>
        </div>
        <div
                v-for="(files, cat) of source"
                :key="cat"
                style="border-left: 5px solid #256569; padding-left: 20px"
                class="my-4"
        >
            <h5 class="my-3 text-uppercase font-weight-bold">{{$app.fileTypes[cat] || cat}}</h5>
            <b-row>
                <div class="col-md-3"
                     v-for="(file) of files"
                     :key="file.file_id">
                    <file-view @file="onFileClicked" :cat="cat" :file="file"></file-view>
                </div>
            </b-row>
        </div>
        <template v-if="selectedFile !== null">
            <b-modal
                    no-enforce-focus
                    @shown="rotation = 0" @hidden="(selectedFile = null)" hide-footer size="xl"
                    :title="createFileName(selectedFile)"
                    :visible="selectedFile !== null">
                <div v-if="$store.getters.isAdmin && selectedFile !== null">
                    <b-card class="helper">
                        <template v-slot:header>
                            {{createFileName(selectedFile)}}
                        </template>
                        <b-button-group v-if="selectedFile.file_type !== 'ach'">
                            <b-button @click="rotate">
                                <b-icon-arrow-clockwise/>
                            </b-button>
                            <status-selector
                                    :removable="true"
                                    :selected="selectedFile.file_status"
                                    @change="((e)=>setFileStatus(selectedFile.file_id, e))"
                            ></status-selector>
                        </b-button-group>
                    </b-card>
                </div>
                <b-embed v-if="imagePath.includes('__pd')" controls :src="imageUrl" style="max-width: 100%"/>
                <img v-else :style="`max-width: 100%;  transform: rotate(${rotation}deg)`" alt="Документ"
                     :src="imageUrl">
            </b-modal>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import FileView from "@/components/files/FileView.vue";
    import {Dict} from "@/app/types";
    import {APIFileResult} from "@/api/APIFiles";
    import StatusSelector from "@/components/StatusSelector.vue";
    import API from "@/api/API";

    @Component({
        components: {StatusSelector, FileView}
    })
    export default class UserDocumentsView extends Vue {
        @Prop({default: true}) showTips!: boolean;
        @Prop({default: false}) goUserByClick!: boolean;
        @Prop({default: {}}) source!: Dict<APIFileResult[]>;
        private rotation = 0;
        private selectedFile: APIFileResult | null = null;

        private imagePath = "";
        private imageUrl = "";


        rotate() {
            this.rotation = (this.rotation + 90) % 360;
        }

        async setFileStatus(fileId: string, status: number) {
            await API.files.setStatus(parseInt(fileId), status);
            this.$emit("updated");
        }

        private createFileName(file: APIFileResult) {
            return (this.$app.fileTypes[file.file_type] || file.file_type)
                + "-" + file.file_name.substr(0, 4) + "." + file.file_name.split('.').pop();
        }

        private onFileClicked(file: APIFileResult) {
            if(this.goUserByClick){
                this.$router.push('/user/' + file.user_id);
            }else {
                this.selectedFile = file;
                this.imagePath = file['file_id'] +
                    (file.file_type === 'passport' ? '&encrypted=true' : '') +
                    (file.file_ext.includes('pdf') ||
                    file.file_ext.includes('docx') ? '&__pd' : '');
                this.imageUrl = 'http://kipfin.ru/new/index.php?class=files&method=file&fileId=' + this.imagePath + "&token=" + API.TOKEN;
            }
        }
    }
</script>

<style scoped>
    .helper {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1000;
        opacity: 0.2;
        transition: all 0.4s;
    }

    .helper:hover {
        opacity: 1;
    }
</style>