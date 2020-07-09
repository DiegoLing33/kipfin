<template>
    <li-modal size="x" ref="modal" v-if="selectedFile !== null" :title="selectedFile.getFileName()">
        <b-embed v-if="selectedFile.fileName.endsWith('.pdf')" controls
                 :src="selectedFile.getFileURL()"
                 style="max-width: 100%;"/>
        <div v-else>
            <crop-image-tool-component
                    v-if="selectedFile.storageName === 'student-photo' && $store.getters.isAdmin"
                    :image="selectedFile.getFileURL()"
                    @ready="downloadCroppedImage"
                    :aspect="3/4"
            />
            <img
                    v-else
                    :style="`max-width: 100%;  transform: rotate(${rotation}deg)`" alt="Документ"
                    :src="selectedFile.getFileURL()">

        </div>
        <template slot="footer">
            <div class="w-100 text-center" v-if="selectedFile.storageName !== 'ach' && $store.getters.isAdmin">
                <b-button-group class="m-2">
                    <b-button @click="rotate">
                        <b-icon-arrow-clockwise/>
                    </b-button>
                    <b-button variant="danger" @click="setFileStatus(selectedFile, 0)">
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
                    <b-button variant="success" @click="setFileStatus(selectedFile, 2)">
                        <b-icon-check2/>
                    </b-button>
                    <b-button variant="danger" @click="setFileStatus(selectedFile, 3)">
                        <b-icon-x/>
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
    import KFDocument from "@/client/KFDocument";
    import StatusSelector from "@/components/admintools/StatusSelector.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import VueCropper from "vue-cropperjs";
    import CropImageToolComponent from "@/components/toolbox/CropImageToolComponent.vue";
    import FileIO from "@/ling/utils/FileIO";
    import UserUtils from "@/utils/UserUtils";

    /**
     *  The DocumentPreviewModal component.
     *  @author diego
     *  @created 09.07.2020 19:48
     *
     *  @todo When file can be cropped? Mb add new button for crop?
     */
    @Component({
        components: {CropImageToolComponent, LiModal, StatusSelector, VueCropper}
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
         * Rotates the file
         */
        rotate() {
            this.rotation = (this.rotation + 90) % 360;
        }

        /**
         * Shows the file
         */
        show(file: KFDocument) {
            this.selectedFile = file;
            (this.$refs['modal'] as any).show();
        }

        /**
         * Sets the file status
         * @param file
         * @param status
         */
        async setFileStatus(file: KFDocument, status: number) {
            this.$transaction(this, async () => {
                await file.setStatus(status);
                this.$emit("updated");
                (this.$refs['modal'] as any).close();
            });
        }

        /**
         * Downloads the cropped image
         * @param blob
         */
        private downloadCroppedImage(blob: Blob) {
            const fileName = UserUtils.getFullName(this.selectedFile.author) + " Фото.jpg";
            FileIO.requestDownloadingFile(fileName, URL.createObjectURL(blob));
        }

    }
</script>

<style scoped>

</style>