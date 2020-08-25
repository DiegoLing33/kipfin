<template>
    <li-modal name="fileInfo" size="xl" ref="modal" v-if="selectedFile !== null" :title="selectedFile.getFileName()">
        <template #header v-if="$store.getters.isAdmin">
            <select-box
                class="mr-3"
                style="max-width: 300px"
                :options="$app.fileTypes"
                         :default-value="selectedFile.storageName"
                        @change="v => typeChanged(selectedFile, v)"
            />
        </template>
        <b-embed v-if="selectedFile.fileName.endsWith('.pdf')" controls
                 :src="selectedFile.getFileURL()"
                 style="max-width: 100%;"/>
        <div v-else style="background-color: rgb(70, 70, 70); text-align: center">
            <crop-image-tool-component
                    v-if="cropMode"
                    :image="selectedFile.getFileURL()"
                    @ready="downloadCroppedImage"
                    ref="cropper"
                    :aspect="selectedFile.storageName === 'student-photo' ? 3/4 : null"
                    :resizable="selectedFile.storageName !== 'student-photo'"
                    height="400px"
            />
            <img
                    v-else
                    :style="`transform: rotate(${rotation}deg)`" alt="Документ"
                    :src="selectedFile.getFileURL()">

        </div>
        <template slot="footer">
            <div class="w-100 text-center" v-if="selectedFile.storageName !== 'ach' && $store.getters.isAdmin">
                <b-button-group class="m-2">
                    <b-button
                            v-b-tooltip.hover title="Повернуть"
                            @click="rotate">
                        <b-icon-arrow-clockwise/>
                    </b-button>
                    <b-button
                            v-b-tooltip.hover title="Обрезать изображение"
                            :variant="cropMode ? 'primary' : 'secondary'"
                            @click="crop">
                        <b-icon-crop/>
                    </b-button>
                    <b-button
                            v-b-tooltip.hover title="Скачать"
                            @click="download(selectedFile)">
                        <b-icon-download/>
                    </b-button>
                    <b-button v-b-tooltip.hover title="Печать" @click="print(selectedFile)">
                        <b-icon-calendar2-check/>
                    </b-button>
                    <b-button
                            v-b-tooltip.hover title="Удалить"
                            variant="danger" @click="setFileStatus(selectedFile, 0)">
                        <b-icon-trash/>
                    </b-button>
                </b-button-group>
                <b-button-group class="m-2">
                    <status-selector
                            :removable="true"
                            :selected="selectedFile.fileStatus"
                            @change="((e)=>setFileStatus(selectedFile, e))"
                    ></status-selector>
                </b-button-group>
                <b-button-group class="m-2">
<!--                    <status-selector-->
<!--                            :removable="true"-->
<!--                            :selected="selectedFile.storageName"-->
<!--                            @change="((e)=>setFileStorage(selectedFile, e))"-->
<!--                    ></status-selector>-->
                </b-button-group>
                <b-button-group class="m-2">
                    <b-button
                            v-b-tooltip.hover title="Установить как: Принято"
                            variant="success" @click="setFileStatus(selectedFile, 2)">
                        <b-icon-check2/>
                    </b-button>
                    <b-button
                            v-b-tooltip.hover title="Установить как: Не принято"
                            variant="danger" @click="setFileStatus(selectedFile, 3)">
                        <b-icon-x/>
                    </b-button>
                </b-button-group>
            </div>
            <div class="w-100 text-center" v-else>
                <b-button-group class="m-2">
                    <b-button
                            v-b-tooltip.hover title="Скачать"
                            @click="download(selectedFile)">
                        <b-icon-download/>
                    </b-button>
                </b-button-group>
            </div>
            <div class="small text-muted text-center">
                {{$app.userUtils.getFullName(selectedFile.author)}} - {{selectedFile.fileCreated}}
            </div>
        </template>
    </li-modal>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import KFDocument from "@/app/client/KFDocument";
    import StatusSelector from "@/components/admin/admintools/StatusSelector.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import VueCropper from "vue-cropperjs";
    import CropImageToolComponent from "@/components/toolbox/CropImageToolComponent.vue";
    import API from "@/app/api/API";
    import SelectBox from "@/ling/components/SelectBox/SelectBox.vue";
    import {SelectBoxValidOption} from "@/ling/components/SelectBox/SelectBoxCommon";

    /**
     *  The DocumentPreviewModal component.
     *  @author diego
     *  @created 09.07.2020 19:48
     *
     *  @todo When file can be cropped? Mb add new button for crop?
     */
    @Component({
        components: {SelectBox, CropImageToolComponent, LiModal, StatusSelector, VueCropper}
    })
    export default class DocumentModalView extends Vue {

        /**
         * Selected file
         */
        private selectedFile: KFDocument = KFDocument.zero();

        /**
         * The rotation angle
         */
        private rotation = 0;

        /**
         * The crop mode
         */
        private cropMode = false;

        /**
         * Rotates the file
         */
        rotate() {
            this.rotation = (this.rotation + 90) % 360;
            if (this.$refs['cropper'])
                (this.$refs['cropper'] as any).getCropper().rotate(90);
        }

        /**
         * Shows the file
         */
        show(file: KFDocument) {
            this.rotation = 0;
            this.cropMode = false;
            this.selectedFile = file;
            (this.$refs['modal'] as any).show();
        }

        crop() {
            this.cropMode = !this.cropMode;
        }

        download(file: KFDocument) {
            fetch(file.getFileURL())
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = file.getFileName();
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(() => alert('Что-то не так... Файл не найден'));
        }

        async print(file: KFDocument) {
            const url = 'http://kipfin.ru/new/files/' + file.fileName;
            const mywindow = window.open(url, 'PRINT',) as Window;
            mywindow.print();
            setTimeout(() => {
                mywindow.close();
            }, 5000);
        }

        /**
         * Sets the file status
         * @param file
         * @param status
         */
        async setFileStatus(file: KFDocument, status: number) {
            await this.$transaction(async () => {
                await file.setStatus(status);
                this.$emit("updated");
                this.$toast.success("Состояние файла изменено: " + (this.$app.infoStatus.text[status] || "неизвестно"));
                (this.$refs['modal'] as any).close();
            });
        }

        typeChanged(file: any, v: SelectBoxValidOption){
            this.setFileStorage(file, v.value);
        }

        /**
         * Sets the file status
         * @param file
         * @param storage
         */
        async setFileStorage(file: KFDocument, storage: string) {
            await this.$transaction(async () => {
                await file.setStorage(storage);
                this.$emit("updated");
                this.$toast.success("Тип файла изменен: " + (this.$app.fileTypes[storage] || "неизвестно"));
                (this.$refs['modal'] as any).close();
            });
        }

        /**
         * Downloads the cropped image
         * @param blob
         */
        private downloadCroppedImage(blob: Blob) {
            this.$transaction(async () => {
                await API.files.uploadX(blob, this.selectedFile.storageName,
                    this.selectedFile.fileUserId, "2");
                // @fixme - NO RELOAD!
                window.location.reload();
                this.$app.modalClose(this, "modal");
            });
        }

    }
</script>

<style>
    .tooltip {
        z-index: 9999151 !important;
    }
</style>