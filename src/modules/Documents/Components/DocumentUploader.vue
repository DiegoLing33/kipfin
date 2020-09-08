<template>
    <div class="documents-uploader text-center">
        <div v-if="files.length === 0" @click="onClick" class="holder p-2 ">
            <img
                    style="display: block; margin: 0 auto; max-height: 300px;"
                    src="../Images/home.jpg" alt="Documents cloud icon"/>
            <div class="du-title">
                Загрузка файлов
            </div>
            <div class="du-holder pb-3">
                Нажмите сюда, чтобы добавить новый файл
            </div>
        </div>
        <div class="border border-primary" style="border-radius: 5px" v-else>
            <b-row class="mb-3 mx-0 pb-3 pt-3 rwef"
                   style="vertical-align: middle; align-items: center; background-color: whitesmoke; border-top-left-radius: 5px; border-top-right-radius: 5px">
                <b-col sm="1">
                    <b>#</b>
                </b-col>
                <b-col sm="3">
                    <b>Файл</b>
                </b-col>
                <b-col sm="4">
                    <b>Тип файла</b>
                </b-col>
                <b-col>
                    <b>Состояние</b>
                </b-col>
                <b-col sm="1">
                </b-col>
            </b-row>
            <b-row style="vertical-align: middle; align-items: center"
                   v-for="(file, i) of files" :key="i + '_' + new Date().getTime()"
                   class="pb-3 mb-3 mx-0 rwef">
                <b-col sm="1">
                    {{(i + 1)}}
                </b-col>
                <b-col sm="3" style="vertical-align: middle; align-items: center">
                    <b-icon-file-text/>
                    {{file.name}}
                </b-col>
                <b-col sm="4">
                    <b-form-select
                            :value="storages[file.name + file.size]"
                            @change="(e) => $set(storages, file.name + file.size, e || null)"
                            :options="options" />
                </b-col>
                <b-col class="text-muted small">
                    {{getFileState(file)}}
                </b-col>
                <b-col sm="1" class="text-muted small">
                    <b-button variant="link" @click="removeFile(file)">
                        <b-icon-x/>
                    </b-button>
                </b-col>
            </b-row>
            <div class="">
                <b-button variant="link" @click="onClick">
                    Добавить еще файлы
                </b-button>
                <b-button
                        style="border-bottom-left-radius: 5px; border-bottom-right-radius: 5px"
                        squared
                        :disabled="busy"
                        @click="onSend"
                        variant="primary" block>
                    Отправить
                </b-button>
            </div>
        </div>
        <input :disabled="busy" ref="inp" style="display: none" id="fileUploader" @input="onInput" type="file" multiple/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import SelectBox from "@/modules/ling/components/SelectBox/SelectBox.vue";
    import {Dict, dict} from "@/core/Common/Common";
    import API from "@/core/app/api/API";

    /**
     *  The DocumentUploader component.
     *  @author diego
     *  @created 06.09.2020 20:50
     */
    @Component({
        components: {SelectBox}
    })
    export default class DocumentUploader extends Vue {
        protected files = Array<File>();
        protected storages = dict();
        protected loaded = dict<boolean>();
        protected busy = false;
        protected selectedType = null;

        getFileStorageIndex(file: File) {
            return file.name + file.size;
        }

        getFileState(file: File) {
            if (!this.storages[this.getFileStorageIndex(file)]) return 'Выбор типа файла';
            if (!this.loaded[this.storages[file.name + file.size]]) return 'Ожидание загрузки';
            else return 'Файл отправлен';
        }

        removeFile(file: File) {
            const sts = {...this.storages};
            delete sts[this.getFileStorageIndex(file)];
            this.storages = sts;

            this.files = this.files.filter(value => value !== file);
        }

        protected options = Object.keys(this.$app.fileTypes).map(value => {
            return {text: this.$app.fileTypes[value], value: value};
        })

        onSend() {
            this.send();
        }

        onInput(e: any) {
            console.log(e);
            if ((this.$refs['inp'] as HTMLInputElement).files) {
                for (const file of ((this.$refs['inp'] as HTMLInputElement).files || [])) {
                    this.files.push(file);
                }
            }
        }

        onClick() {
            (this.$refs['inp'] as HTMLElement).click();
        }


        private async send() {
            try {
                let k = 0;
                this.busy = true;
                const packs = dict<File[]>();
                for (const file of this.files) {
                    const storage = this.storages[file.name + file.size];
                    if (!storage) {
                        this.$toast.error("Выберите тип для файла " + file.name + " !");
                        this.busy = false;
                        return;
                    }
                    if (!packs[storage]) packs[storage] = [];
                    packs[storage].push(file);
                }

                for (const key of Dict.keys(packs)) {
                    await this.$transaction(async () => {
                        await API.files.upload(packs[key], key, key === "passport");
                        this.$set(this.loaded, key, true);
                    });
                    k += packs[key].length;
                    packs[key].forEach(f => this.removeFile(f));
                }
                this.$emit("updated", k);
                (this.$refs['inp'] as HTMLInputElement).files = null;
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.busy = false;
            }


            // this.busy = true;

            // this.busy = false;
        }
    }
</script>


<style scoped lang="scss">
    .documents-uploader {

        .holder {
            cursor: pointer;
            border: 2px dashed #cfcfcf;
            transition: all 0.7s;
            user-select: none;
        }

        img {
            opacity: 0.6;
            transition: all 0.7s;
        }

        .du-title {
            font-size: 1.4em;
            font-weight: 600;
            opacity: 0.7;
            transition: all 0.5s;
        }

        .du-holder {
            font-size: 1em;
            opacity: 0.5;
            transition: all 0.5s;
        }

        &:hover {
            .holder{
                border: 2px dashed #00404d;
            }

            .du-title, .du-holder {
                color: #00404d;
            }

            .du-title {
                opacity: 1;
            }

            .du-holder {
                opacity: 0.8;
            }

            img {
                opacity: 1;
            }
        }

        .rwef:not(:last-child) {
            border-bottom: 1px solid #efefef
        }
    }

</style>