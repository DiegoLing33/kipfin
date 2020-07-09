<template>
    <div class="box text-center">
        <div class="content"  @click="onFileClick">
            <div class="inner">
                <div
                        v-if="document.storageName === 'ach'"
                        v-b-tooltip:hover title="Достижение успешно загружено"
                        class="state text-success"
                >
                    <b-icon-check-circle/>
                </div>
                <div
                        v-else-if="document.fileStatus === 3"
                        v-b-tooltip:hover title="Файл не принят. Вам необходимо его заменить!"
                        class="state text-danger"
                >
                    <b-icon-x-circle/>
                </div>
                <div
                        v-else-if="document.fileStatus === 2"
                        v-b-tooltip:hover title="Файл успешно прошел проверку приёмной комиссией"
                        class="state text-success"
                >
                    <b-icon-check-circle/>
                </div>
                <div
                        v-else-if="document.fileStatus === 1"
                        v-b-tooltip:hover title="Файл находится в обработке"
                        class="state text-primary"
                >
                    <b-icon-clock/>
                </div>
                <div
                        v-else-if="document.fileStatus === 1000"
                        v-b-tooltip:hover title="Файл отправлен администрацией, его необходимо скачать"
                        class="state text-info"
                >
                    <b-icon-cloud-download/>
                </div>
                <img :src="imageUrl" alt="Document"/>
                <div class="text">{{documentName}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFDocument from "@/client/KFDocument";

    /**
     * The component.
     *
     * @todo File statuses and images have to be recoded
     */
    @Component
    export default class DocumentView extends Vue {
        @Prop({required: true}) document!: KFDocument;


        /**
         * Crops the file name
         */
        private get documentName() {
            const fileName = this.document.getFileName(true);
            if (fileName.length > 16)
                return fileName.substr(0, 13) + "...";
            return fileName;
        }

        /**
         * Returns the file thumb
         */
        private get imageUrl() {
            if (this.document.storageName === 'passport') return '/img/doctypes/passport.svg';
            if (this.document.storageName === 'agree') return '/img/doctypes/contract.svg';
            if (this.document.storageName === 'notify') return '/img/doctypes/sign.svg';
            if (this.document.storageName === 'attestat') return '/img/doctypes/diploma.svg';

            if (this.document.fileExtension.includes('pdf')) return '/img/doctypes/pdf.svg';
            if (this.document.fileExtension.includes('image/')) return '/img/doctypes/image.svg';
            if (this.document.fileExtension.includes('spreadsheetml') ||
                this.document.fileExtension.includes('csv')) return '/img/doctypes/spreadsheet.svg';
            return '/img/doctypes/image.svg';
        }

        /**
         * File click callback
         */
        private onFileClick(){
            console.log(3);
            this.$emit('selected', this.document);
        }
    }
</script>

<style scoped lang="scss">

    .box {
        position: relative;
        width: 24%;
        /* desired width */
        /*margin: 5px;*/
        margin: 0.5%;

    }

    .box:before {
        content: "";
        display: block;
        padding-top: 100%;
        /* initial ratio of 1:1*/
    }

    .box .text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 1.5vw;
        padding: 15px;
        transition: all 0.2s;
    }

    .box .state {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        cursor: pointer;
        transition: all 0.2s;
    }

    .box .state:hover {
        opacity: 0.5;
    }

    .box img {
        max-width: 60%;
        display: block;
        margin: 10px auto;
    }

    .box .content {
        cursor: pointer;
        border: 1px solid #d2d2d2;
        border-radius: 10px;
        padding: 15px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        line-height: 100%;
        height: 100%;
        text-align: center;
        /*display: flex;*/
        align-items: center;
        justify-content: center;
        transition: all 0.2s;

        &:hover, &:focus {
            .text {
                background-color: #d5e7ed;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                font-weight: bold;
            }
        }

        &:active {
            .text {
                background-color: #c4dae2;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                font-weight: bold;
            }
        }
    }
</style>